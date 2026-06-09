import axios from 'axios';
import SYSTEM_PROMPT from './gemin.md?raw';

const isDev = import.meta.env.DEV;

// ─── Endpoints ────────────────────────────────────────────────────────────────
// In DEV: Use Vite proxy. In PROD: Use Vercel serverless functions.
const NVIDIA_URL = isDev ? '/nvidia-proxy/v1/chat/completions' : '/api/nvidia';
const GEMINI_URL = isDev
  ? `/gemini-proxy/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`
  : '/api/gemini';

// ─── Model ────────────────────────────────────────────────────────────────────
// meta/llama-3.3-70b-instruct is confirmed working on the free NVIDIA NIM tier (2026).
// Fallback options if this stops working: "meta/llama-3.1-405b-instruct", "nvidia/llama-3.3-nemotron-super-49b-v1"
const NVIDIA_MODEL = 'meta/llama-3.3-70b-instruct';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

function buildSystemPrompt() {
  return (
    SYSTEM_PROMPT.trim() +
    `\n\n---\n` +
    `## Additional Behavior Rules\n` +
    `- Always reply in the same language the user writes in.\n` +
    `- Keep answers concise (2–5 sentences) unless the user asks for detail.\n` +
    `- Never reveal that you are powered by NVIDIA or Google AI models.\n` +
    `- If a question is outside Cryptware's scope, politely redirect to the team.\n` +
    `- Format lists with bullet points. Use bold text sparingly for emphasis.\n` +
    `- Do NOT fabricate prices, timelines, or team member names.\n`
  );
}

// ─── NVIDIA Provider ──────────────────────────────────────────────────────────
async function callNvidia(prompt, history = []) {
  const messages = [
    { role: 'system', content: buildSystemPrompt() },
    ...history.map(({ role, content }) => ({
      role: role === 'assistant' ? 'assistant' : 'user',
      content,
    })),
    { role: 'user', content: prompt },
  ];

  const res = await axios.post(
    NVIDIA_URL,
    {
      model: NVIDIA_MODEL,
      messages,
      max_tokens: 1024,
      temperature: 0.6,
      top_p: 0.95,
      stream: false,
    },
    {
      headers: {
        ...(isDev && import.meta.env.VITE_NVIDIA_API_KEY ? { Authorization: `Bearer ${import.meta.env.VITE_NVIDIA_API_KEY}` } : {}),
        'Content-Type': 'application/json',
      },
      timeout: 35000,
      validateStatus: () => true,
    }
  );

  const { status, data } = res;

  if (status === 401 || status === 403) throw new Error('NVIDIA key invalid or unauthorized.');
  if (status === 429) throw new Error('NVIDIA rate limit hit.');
  if (status === 503 || status === 502) throw new Error('NVIDIA service unavailable.');
  if (status !== 200) {
    const msg = data?.detail || data?.error?.message || `NVIDIA error ${status}`;
    throw new Error(msg);
  }

  const text = data?.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error('NVIDIA returned an empty response.');

  return { text };
}

// ─── Gemini Provider ──────────────────────────────────────────────────────────
async function callGemini(prompt, history = []) {
  if (isDev && !import.meta.env.VITE_GEMINI_API_KEY) throw new Error('Gemini API key not configured.');

  const contents = [
    { role: 'user', parts: [{ text: buildSystemPrompt() }] },
    { role: 'model', parts: [{ text: 'Understood. I am ready to assist as the Cryptware Infotech AI assistant.' }] },
    ...history.map(({ role, content }) => ({
      role: role === 'assistant' ? 'model' : 'user',
      parts: [{ text: content }],
    })),
    { role: 'user', parts: [{ text: prompt }] },
  ];

  const res = await axios.post(
    GEMINI_URL,
    { contents },
    {
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000,
      validateStatus: () => true,
    }
  );

  const { status, data } = res;

  if (status === 429) {
    // FIX: 429 is transient (per-minute quota), not fatal — mark it retryable
    throw new Error('Gemini rate limit hit.');
  }
  if (status === 401 || status === 403) throw new Error('Gemini key invalid or unauthorized.');
  if (status === 400) {
    const msg = data?.error?.message || 'Gemini bad request.';
    throw new Error(`Gemini bad request — ${msg}`);
  }
  if (status === 503) throw new Error('Gemini service unavailable.');
  if (status !== 200) {
    const msg = data?.error?.message || `Gemini error ${status}`;
    throw new Error(msg);
  }

  const finishReason = data?.candidates?.[0]?.finishReason;
  if (finishReason === 'SAFETY') throw new Error('Gemini blocked the response for safety reasons.');

  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const text = parts
    .filter((p) => typeof p.text === 'string')
    .map((p) => p.text)
    .join('')
    .trim();

  if (!text) throw new Error('Gemini returned an empty response.');

  return { text };
}

// ─── Public API ───────────────────────────────────────────────────────────────
export async function generateAIContent(prompt, history = []) {
  if (!prompt?.trim()) return { error: 'Please enter a message.' };

  const MAX_RETRIES = 2;

  const providers = [];
  // In dev, add providers only if keys exist. In prod, always add them (keys are server-side).
  if (!isDev || import.meta.env.VITE_NVIDIA_API_KEY) providers.push({ name: 'NVIDIA', fn: callNvidia });
  if (!isDev || import.meta.env.VITE_GEMINI_API_KEY) providers.push({ name: 'Gemini', fn: callGemini });

  if (providers.length === 0) {
    return { error: 'No AI API key is configured. Please add VITE_NVIDIA_API_KEY or VITE_GEMINI_API_KEY to your .env file.' };
  }

  let lastError = 'Unknown error.';

  for (const { name, fn } of providers) {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.info(`[AI] Trying ${name} (attempt ${attempt + 1}/${MAX_RETRIES + 1})`);
        const result = await fn(prompt, history);
        console.info(`[AI] ${name} responded successfully.`);
        return result;
      } catch (err) {
        const msg = err?.message || 'Unknown error';
        console.warn(`[AI] ${name} attempt ${attempt + 1} failed: ${msg}`);
        lastError = msg;

        // FIX: "rate limit hit." (from Gemini 429) is now correctly retryable
        const isTransient =
          msg.includes('unavailable') ||
          msg.includes('rate limit') ||
          msg.includes('empty response') ||
          (axios.isAxiosError(err) &&
            ['ECONNABORTED', 'ERR_NETWORK', 'ECONNRESET', 'ERR_FAILED'].includes(err.code));

        if (!isTransient || attempt === MAX_RETRIES) break;

        const backoff = 1500 * (attempt + 1); // slightly longer for quota resets
        console.info(`[AI] Retrying ${name} in ${backoff}ms…`);
        await sleep(backoff);
      }
    }

    console.warn(`[AI] ${name} exhausted — falling back to next provider.`);
  }

  if (lastError.includes('quota') || lastError.includes('rate limit')) {
    return { error: 'AI usage limit reached. Please try again in a moment or contact the Cryptware team directly.' };
  }
  if (lastError.includes('key') || lastError.includes('unauthorized')) {
    return { error: 'AI configuration issue. Please contact the website administrator.' };
  }
  if (lastError.includes('timed out') || lastError.includes('ECONNABORTED')) {
    return { error: 'The request timed out. Please check your connection and try again.' };
  }
  if (lastError.includes('network') || lastError.includes('ERR_NETWORK') || lastError.includes('ERR_FAILED')) {
    return { error: 'Network error. Please check your internet connection.' };
  }

  return { error: 'Our AI assistant is temporarily unavailable. Please try again shortly or reach out at +91 7490971996.' };
}