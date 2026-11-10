import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const getOpenAIAPIResponse = async (message) => {
  const models = [
    "gemini-3.5-flash-lite",
    "gemini-3.8-flash",
    "gemini-3.6-flash"
  ];

  let lastError = null;

  for (const model of models) {
    try {
      console.log(`Querying Gemini with model: ${model}...`);

      // Official SDK method: ai.models.generateContent
      const response = await ai.models.generateContent({
        model: model,
        contents: message,
      });

      if (response && response.text) {
        console.log(`Success with ${model}`);
        return response.text;
      }
    } catch (err) {
      console.warn(`Model ${model} failed (${err.message}). Trying next model...`);
      lastError = err;
    }
  }

  throw lastError || new Error("All Gemini models failed to respond.");
};

export default getOpenAIAPIResponse;