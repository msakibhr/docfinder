import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeSymptoms = async (symptoms: string): Promise<string> => {
  try {
    const modelId = 'gemini-2.5-flash';
    const prompt = `
      You are a helpful medical receptionist AI.
      A patient is describing their symptoms: "${symptoms}".
      
      Based on this description, recommend the SINGLE most appropriate medical specialist category from the following list:
      - Physician
      - Orthopedics
      - Medicine
      - Cardiologist
      - Surgeon
      - Oncology
      - Others

      Return ONLY the category name as a string. Do not add any punctuation or extra text.
      If the symptoms are vague or general, return "Physician".
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    const text = response.text?.trim();
    return text || 'Physician';
  } catch (error) {
    console.error("Gemini API Error:", error);
    return 'Physician'; // Fallback
  }
};