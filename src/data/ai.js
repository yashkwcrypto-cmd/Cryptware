import axios from 'axios';
import SYSTEM_PROMPT from './gemin.md?raw';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_OPENROUTER_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export async function generateAIContent(prompt, history = []) {
    if (!API_KEY) {
        return { error: 'API key is missing. Set VITE_GEMINI_API_KEY in your .env file.' };
    }

    // Build conversation contents with history support
    const contents = [
        // Inject system context as first user/model turn (Gemini doesn't have system role)
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: 'Understood. I am ready to assist Cryptware Infotech employees.' }] },

        // Map previous history
        ...history.map(({ role, content }) => ({
            role: role === 'assistant' ? 'model' : 'user',
            parts: [{ text: content }],
        })),

        // Current prompt
        { role: 'user', parts: [{ text: prompt }] },
    ];

    const maxRetries = 2;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const res = await axios.post(
                GEMINI_URL,
                {
                    contents,
                    tools: [{ googleSearch: {} }]
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    timeout: 30000,
                    validateStatus: () => true, // handle all statuses manually
                }
            );

            const status = res.status;
            const isLast = attempt === maxRetries;

            // Handle error statuses
            if (status === 503) {
                if (!isLast) {
                    console.warn(`503 Busy. Retry ${attempt + 1}/${maxRetries}...`);
                    await sleep(1500 * (attempt + 1)); // exponential-ish backoff
                    continue;
                }
                return { error: 'AI service is currently busy. Please try again shortly.' };
            }

            if (status === 429) {
                return { error: 'Daily request quota exceeded. Please try again tomorrow.' };
            }

            if (status === 400) {
                return { error: 'Invalid request. Please rephrase your message.' };
            }

            if (status === 401 || status === 403) {
                return { error: 'API key is invalid or unauthorized. Please check your configuration.' };
            }

            if (status !== 200) {
                const errMsg = res.data?.error?.message || `Unexpected error (status ${status})`;
                return { error: errMsg };
            }

            // Parse response
            const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!text) {
                // Check for safety blocks
                const finishReason = res.data?.candidates?.[0]?.finishReason;
                if (finishReason === 'SAFETY') {
                    return { error: 'Response blocked due to safety filters. Please rephrase your message.' };
                }
                return { error: 'Empty response from AI. Please try again.' };
            }

            return { text };

        } catch (err) {
            if (attempt === maxRetries) {
                if (axios.isAxiosError(err)) {
                    if (err.code === 'ECONNABORTED') return { error: 'Request timed out. Please try again.' };
                    if (err.code === 'ERR_NETWORK') return { error: 'Network error. Please check your connection.' };
                }
                return { error: err?.message || 'Something went wrong. Please try again later.' };
            }
            await sleep(1000);
        }
    }

    return { error: 'Something went wrong. Please try again later.' };
}