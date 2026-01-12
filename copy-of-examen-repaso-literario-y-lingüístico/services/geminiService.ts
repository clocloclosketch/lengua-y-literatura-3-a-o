
import { GoogleGenAI, Type } from "@google/genai";
import { Question, Topic } from "../types";
import { SYLLABUS_CONTEXT } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateExamQuestions = async (selectedTopics: Topic[]): Promise<Question[]> => {
  const prompt = `
    Eres un profesor de Didáctica de la Lengua y Literatura. 
    Basándote estrictamente en el siguiente temario:
    ---
    ${SYLLABUS_CONTEXT}
    ---
    Genera un examen de 10 preguntas de opción múltiple. 
    Las preguntas deben ser variadas y cubrir los temas seleccionados: ${selectedTopics.join(', ')}.
    Asegúrate de incluir preguntas difíciles que requieran conocer detalles específicos del temario (ej: quién es Rosa Navarro Durán, qué es la oposición binaria, diferencia entre honor y honra).
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            topic: { type: Type.STRING, enum: Object.values(Topic) },
            text: { type: Type.STRING },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Must have exactly 4 options."
            },
            correctAnswer: { type: Type.INTEGER, description: "Index of the correct option (0-3)." },
            explanation: { type: Type.STRING }
          },
          required: ["id", "topic", "text", "options", "correctAnswer", "explanation"]
        }
      }
    }
  });

  try {
    const text = response.text || '[]';
    return JSON.parse(text);
  } catch (e) {
    console.error("Error parsing Gemini response", e);
    return [];
  }
};
