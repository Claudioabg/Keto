
import { GoogleGenAI, Type } from "@google/genai";
import { Meal } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY for Gemini not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const findRecipeByIngredients = async (ingredients: string): Promise<Meal> => {
    if (!API_KEY) {
        throw new Error("API key is not configured.");
    }
    // FIX: Initialize GoogleGenAI inside the function to use the latest API key.
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Teniendo en cuenta los siguientes ingredientes: ${ingredients}, genera una única receta de comida keto con un toque paraguayo. Asegúrate de que sea sencilla de preparar. Proporciona los macros estimados (proteínas, grasas, carbohidratos netos).`,
            config: {
                systemInstruction: "Eres un chef creativo especializado en la cocina keto paraguaya. Tu respuesta debe ser únicamente un objeto JSON válido, sin ningún texto adicional, markdown o explicaciones. La estructura debe ser: { nombre: string, ingredientes: string[], pasos: string, macros: { p: number, f: number, c: number } }.",
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        nombre: { type: Type.STRING, description: "Nombre de la receta." },
                        ingredientes: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: "Lista de ingredientes necesarios."
                        },
                        pasos: { type: Type.STRING, description: "Instrucciones de preparación paso a paso, separadas por saltos de línea." },
                        macros: {
                            type: Type.OBJECT,
                            properties: {
                                p: { type: Type.NUMBER, description: "Gramos de proteína." },
                                f: { type: Type.NUMBER, description: "Gramos de grasa." },
                                c: { type: Type.NUMBER, description: "Gramos de carbohidratos netos." }
                            },
                            required: ["p", "f", "c"]
                        }
                    },
                    required: ["nombre", "ingredientes", "pasos", "macros"]
                }
            },
        });

        // FIX: Use response.text to get the generated text directly.
        const jsonText = response.text.trim();
        const generatedMeal = JSON.parse(jsonText) as Omit<Meal, 'performance'>;

        return { ...generatedMeal, performance: false };

    } catch (error) {
        console.error("Error generating recipe with Gemini:", error);
        throw new Error("No se pudo generar la receta. Inténtalo de nuevo.");
    }
};
