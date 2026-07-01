import { sendError, sendSuccess } from "../service/response.js";
import { SUCCESS, ERROR } from "../service/status-code.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildSystemPrompt } from "../service/ai.system.js";

const loggingKey = "AI_CONTROLLER";

// NVIDIA AI API call
async function callNvidiaAI(prompt, history) {
  if (!process.env.NVIDIA_API_KEY) {
    throw new Error("NVIDIA API key is not configured");
  }

  const messages = [
    {
      role: "system",
      content: buildSystemPrompt()
    },
    ...history.map(({ role, content }) => ({
      role: role === 'assistant' ? 'assistant' : 'user',
      content
    })),
    {
      role: "user",
      content: prompt
    }
  ];

  const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}`,
    },
    body: JSON.stringify({
      model: "meta/llama-3.1-70b-instruct",
      messages,
      temperature: 0.7,
      max_tokens: 1024,
      stream: false
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`NVIDIA API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Gemini AI API call
async function callGeminiAI(prompt, history) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    systemInstruction: buildSystemPrompt()
  });

  // Format history for Gemini - ensure first message is from user
  let formattedHistory = history.map(({ role, content }) => ({
    role: role === 'assistant' ? 'model' : 'user',
    parts: [{ text: content }],
  }));

  // If history is empty or first message is from model, don't use history
  if (formattedHistory.length === 0 || formattedHistory[0].role === 'model') {
    formattedHistory = [];
  }

  const chat = model.startChat({
    history: formattedHistory,
  });

  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  return response.text();
}

export const getRecommendation = async (req, res) => {
  const localLoggingKey = `${loggingKey} - GET_RECOMMENDATION`;
  console.log(`${localLoggingKey} - START`);
  try {
    const { prompt, history = [] } = req.body;
    
    if (!prompt?.trim()) {
      return sendError(res, "Prompt is required", ERROR);
    }

    let reply = null;
    let provider = "";

    // Try NVIDIA first
    try {
      console.log(`${localLoggingKey} - Trying NVIDIA AI`);
      reply = await callNvidiaAI(prompt, history);
      provider = "NVIDIA";
      console.log(`${localLoggingKey} - NVIDIA AI success`);
    } catch (nvidiaError) {
      console.log(`${localLoggingKey} - NVIDIA AI failed:`, nvidiaError.message);
      
      // Fallback to Gemini
      try {
        console.log(`${localLoggingKey} - Falling back to Gemini AI`);
        reply = await callGeminiAI(prompt, history);
        provider = "Gemini";
        console.log(`${localLoggingKey} - Gemini AI success`);
      } catch (geminiError) {
        console.log(`${localLoggingKey} - Gemini AI failed:`, geminiError.message);
        throw new Error("Both NVIDIA and Gemini AI services failed. Please try again later.");
      }
    }

    console.log(`${localLoggingKey} - END`);
    return sendSuccess(res, `AI response generated successfully via ${provider}`, { reply, provider }, SUCCESS);
  } catch (error) {
    console.error(`${localLoggingKey} - ERROR`, error);
    return sendError(res, error.message || "Error generating AI response", ERROR);
  }
};
