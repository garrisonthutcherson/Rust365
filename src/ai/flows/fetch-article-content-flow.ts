'use server';
/**
 * @fileOverview A Genkit flow that fetches and structures the full content of a Rust news article.
 *
 * - fetchArticleContent - A function that fetches the HTML of an article and uses AI to extract content.
 * - FetchArticleContentInput - Input containing the URL of the article.
 * - FetchArticleContentOutput - Structured content including title, image, and body.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FetchArticleContentInputSchema = z.object({
  url: z.string().url().describe('The URL of the Facepunch news article to fetch.'),
});
export type FetchArticleContentInput = z.infer<typeof FetchArticleContentInputSchema>;

const FetchArticleContentOutputSchema = z.object({
  title: z.string(),
  date: z.string(),
  category: z.string(),
  mainImageUrl: z.string().url(),
  content: z.string().describe('The main content of the article, formatted as clean Markdown or HTML.'),
  author: z.string().optional(),
});
export type FetchArticleContentOutput = z.infer<typeof FetchArticleContentOutputSchema>;

/**
 * Fetches the full content of a Rust article from its URL and structures it using AI.
 */
export async function fetchArticleContent(input: FetchArticleContentInput): Promise<FetchArticleContentOutput> {
  return fetchArticleContentFlow(input);
}

const fetchArticleContentFlow = ai.defineFlow(
  {
    name: 'fetchArticleContentFlow',
    inputSchema: FetchArticleContentInputSchema,
    outputSchema: FetchArticleContentOutputSchema,
  },
  async (input) => {
    try {
      const response = await fetch(input.url);
      if (!response.ok) {
        throw new Error(`Failed to fetch article at ${input.url}`);
      }
      const html = await response.text();

      const { output } = await ai.generate({
        prompt: `Extract the full article content from this Rust Devblog HTML. 
        Focus on the main story content. Exclude headers, footers, sidebars, and navigation.
        Return the content formatted as high-quality Markdown.
        
        Also extract:
        - The primary title
        - The publication date
        - The category
        - The main hero image URL (look for the largest image or og:image)
        - The author name if present
        
        HTML Content:
        ${html.substring(0, 50000)} // Truncate to avoid token limits while keeping core content`,
        output: { schema: FetchArticleContentOutputSchema },
      });

      if (!output) {
        throw new Error('AI failed to parse article content');
      }

      return output;
    } catch (error) {
      console.error('Error in fetchArticleContentFlow:', error);
      throw error;
    }
  }
);
