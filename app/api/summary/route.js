import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { ins, prompt } from "@/lib/prompt";

export async function POST(request) {
  try {
    const { text, depthToggle, format } = await request.json();
    if (!text) {
      return NextResponse.json({ error: "Text is required." }, { status: 400 });
    }
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${prompt} ${text} ${depthToggle} ${format} `,
      config: {
        systemInstruction: ins,
        maxOutputTokens: 1500,
        temperature: 0.1,
      },
    });
    console.log("summary generated successfully",response.text.length,"characters");
    
    return NextResponse.json({ summary: response.text ?? response }, { status: 200 });
  } catch (error) {
    console.error("Error generating summary:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
