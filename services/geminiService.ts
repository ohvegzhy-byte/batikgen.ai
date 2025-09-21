import { GoogleGenAI } from "@google/genai";
import type { AspectRatio } from "../App";

// Assume process.env.API_KEY is available in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not defined. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Generates a batik-themed image using the Gemini API.
 * @param userPrompt - The user's description of the image to generate.
 * @param aspectRatio - The desired aspect ratio for the image.
 * @returns A promise that resolves to the base64 encoded image string.
 */
export const generateBatikImage = async (userPrompt: string, aspectRatio: AspectRatio): Promise<string> => {
  const fullPrompt = `A visually stunning, high-resolution image of ${userPrompt}, in the intricate and beautiful style of Indonesian batik. The image should feature traditional batik patterns, colors, and textures, with a modern artistic interpretation. Focus on elegant lines, rich details, and a harmonious color palette.`;

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: fullPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return base64ImageBytes;
    } else {
      throw new Error("Image generation failed, no images were returned.");
    }
  } catch (error) {
    console.error("Error generating image with Gemini API:", error);
    // Re-throw a more user-friendly error
    throw new Error("Failed to generate image. Please check your connection or try a different prompt.");
  }
};
