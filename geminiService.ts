
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getDetectiveHint = async (context: string, currentTask: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Jesteś doświadczonym detektywem literackim. Uczeń klasy 8 rozwiązuje zagadkę dotyczącą lektury obowiązkowej.
      Kontekst: ${context}
      Zadanie: ${currentTask}
      Podaj krótką, tajemniczą podpowiedź w stylu detektywistycznym (max 2 zdania), która nie zdradza bezpośrednio odpowiedzi, ale nakieruje ucznia.`,
    });
    return response.text || "Spójrz jeszcze raz w akta, detektywie. Prawda tam jest...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Skup się na szczegółach. Odpowiedź kryje się w tekście lektury.";
  }
};
