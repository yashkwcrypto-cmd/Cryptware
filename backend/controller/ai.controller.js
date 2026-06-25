import { sendError, sendSuccess } from "../services/utility/response.js";
import { SUCCESS, ERROR } from "../services/utility/statusCode.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildSystemPrompt } from "../services/ai.system.js";

const logginKey = "AI - API";

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
  console.log(`${logginKey} - GET RECOMMENDATION`);
  try {
    const { prompt, history = [] } = req.body;
    
    if (!prompt?.trim()) {
      return sendError(res, "Prompt is required", ERROR);
    }

    let reply = null;
    let provider = "";

    // Try NVIDIA first
    try {
      console.log(`${logginKey} - Trying NVIDIA AI`);
      reply = await callNvidiaAI(prompt, history);
      provider = "NVIDIA";
      console.log(`${logginKey} - NVIDIA AI success`);
    } catch (nvidiaError) {
      console.log(`${logginKey} - NVIDIA AI failed:`, nvidiaError.message);
      
      // Fallback to Gemini
      try {
        console.log(`${logginKey} - Falling back to Gemini AI`);
        reply = await callGeminiAI(prompt, history);
        provider = "Gemini";
        console.log(`${logginKey} - Gemini AI success`);
      } catch (geminiError) {
        console.log(`${logginKey} - Gemini AI failed:`, geminiError.message);
        throw new Error("Both NVIDIA and Gemini AI services failed. Please try again later.");
      }
    }

    sendSuccess(res, `AI response generated successfully via ${provider}`, { reply, provider }, SUCCESS);
  } catch (error) {
    console.log(`${logginKey} - ERROR`, error);
    sendError(res, error.message || "Error generating AI response", ERROR);
  }
};
