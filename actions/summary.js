import { ins, prompt } from "@/lib/prompt";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "",
});

export async function summaryGemini(text) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `${prompt} ${text}`,
    config: {
      systemInstruction: ins,
      maxOutputTokens: 1500,
      temperature: 0.1,
    },
  });
  console.log(response.text);
  return response.text;
}
