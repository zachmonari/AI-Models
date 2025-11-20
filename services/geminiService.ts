import { GoogleGenAI } from "@google/genai";
import { AspectRatio, GeneratedImage } from "../types";

const API_KEY = process.env.API_KEY;

// Initialize the client only if the key is available.
// Note: We handle the missing key gracefully in the UI, but here we just setup the class.
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const generateImageFromPrompt = async (
  prompt: string,
  aspectRatio: AspectRatio
): Promise<GeneratedImage> => {
  if (!ai) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  try {
    // Using the high-quality Imagen 3 model
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
        // safetySettings can be added here if needed, using defaults for now
      },
    });

    const generatedImage = response.generatedImages?.[0];
    
    if (!generatedImage || !generatedImage.image || !generatedImage.image.imageBytes) {
      throw new Error("No image data returned from the API.");
    }

    const base64ImageBytes: string = generatedImage.image.imageBytes;
    const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;

    return {
      id: crypto.randomUUID(),
      url: imageUrl,
      prompt,
      aspectRatio,
      timestamp: Date.now(),
    };

  } catch (error: any) {
    console.error("Gemini Image Generation Error:", error);
    let errorMessage = "Failed to generate image.";
    if (error.message) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
};