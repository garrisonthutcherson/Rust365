'use server';
/**
 * @fileOverview A Genkit flow for generating brand assets (hero background image and logo) using AI.
 *
 * - adminAIGenerateBrandAssets - A function that handles the generation of brand assets.
 * - AdminAIGenerateBrandAssetsInput - The input type for the adminAIGenerateBrandAssets function.
 * - AdminAIGenerateBrandAssetsOutput - The return type for the adminAIGenerateBrandAssets function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input schema for generating brand assets
const AdminAIGenerateBrandAssetsInputSchema = z.object({
  heroBackgroundDescription: z.string().describe('A descriptive prompt for the hero background image.'),
  logoDescription: z.string().describe('A descriptive prompt for the brand logo image.'),
});
export type AdminAIGenerateBrandAssetsInput = z.infer<typeof AdminAIGenerateBrandAssetsInputSchema>;

// Output schema for the generated brand assets
const AdminAIGenerateBrandAssetsOutputSchema = z.object({
  heroBackgroundDataUri: z.string().describe('The data URI of the generated hero background image.'),
  logoDataUri: z.string().describe('The data URI of the generated brand logo image.'),
});
export type AdminAIGenerateBrandAssetsOutput = z.infer<typeof AdminAIGenerateBrandAssetsOutputSchema>;

/**
 * Generates a unique hero background image and brand logo using AI based on provided descriptions.
 * The output includes data URIs for both generated images.
 *
 * @param input - An object containing descriptive prompts for the hero background and logo.
 * @returns An object containing the data URIs of the generated hero background and logo.
 */
export async function adminAIGenerateBrandAssets(
  input: AdminAIGenerateBrandAssetsInput
): Promise<AdminAIGenerateBrandAssetsOutput> {
  return adminAIGenerateBrandAssetsFlow(input);
}

// Define the Genkit flow for generating brand assets
const adminAIGenerateBrandAssetsFlow = ai.defineFlow(
  {
    name: 'adminAIGenerateBrandAssetsFlow',
    inputSchema: AdminAIGenerateBrandAssetsInputSchema,
    outputSchema: AdminAIGenerateBrandAssetsOutputSchema,
  },
  async (input) => {
    // Generate hero background image
    const { media: heroBackgroundMedia } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: input.heroBackgroundDescription,
    });

    if (!heroBackgroundMedia || !heroBackgroundMedia.url) {
      throw new Error('Failed to generate hero background image.');
    }

    // Generate brand logo image
    const { media: logoMedia } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: input.logoDescription,
    });

    if (!logoMedia || !logoMedia.url) {
      throw new Error('Failed to generate brand logo image.');
    }

    return {
      heroBackgroundDataUri: heroBackgroundMedia.url,
      logoDataUri: logoMedia.url,
    };
  }
);
