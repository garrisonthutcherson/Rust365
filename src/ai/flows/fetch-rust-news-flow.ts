'use server';
/**
 * @fileOverview A Genkit flow that fetches the latest Rust news from the official Facepunch RSS feed.
 *
 * - fetchRustNews - A function that fetches and parses the Rust news feed.
 * - FetchRustNewsInput - The input type (empty for this flow).
 * - FetchRustNewsOutput - The return type containing a list of news articles.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const NewsItemSchema = z.object({
  id: z.string().describe('A URL-safe slug for the article. Use ONLY the last part of the URL (e.g. "community-update-268"). NO slashes.'),
  title: z.string(),
  date: z.string(),
  category: z.string(),
  excerpt: z.string(),
  imageUrl: z.string().url(),
  link: z.string().url(),
});

const FetchRustNewsInputSchema = z.object({
  limit: z.number().optional().default(6),
});
export type FetchRustNewsInput = z.infer<typeof FetchRustNewsInputSchema>;

const FetchRustNewsOutputSchema = z.object({
  articles: z.array(NewsItemSchema),
});
export type FetchRustNewsOutput = z.infer<typeof FetchRustNewsOutputSchema>;

/**
 * Fetches the latest news from the Facepunch RSS feed and uses AI to structure it.
 */
export async function fetchRustNews(input: FetchRustNewsInput): Promise<FetchRustNewsOutput> {
  return fetchRustNewsFlow(input);
}

const fetchRustNewsFlow = ai.defineFlow(
  {
    name: 'fetchRustNewsFlow',
    inputSchema: FetchRustNewsInputSchema,
    outputSchema: FetchRustNewsOutputSchema,
  },
  async (input) => {
    try {
      // 1. Fetch the raw RSS feed
      const response = await fetch('https://rust.facepunch.com/rss/news');
      if (!response.ok) {
        throw new Error('Failed to fetch Rust RSS feed');
      }
      // Truncate XML to avoid massive token usage and potential timeouts
      const xmlData = (await response.text()).substring(0, 35000);

      // 2. Use Gemini to parse the XML into our structured schema
      const { output } = await ai.generate({
        prompt: `Extract the latest ${input.limit} news articles from this Rust Devblog RSS XML data. 
        
        CRITICAL ID INSTRUCTION: For the "id" field, use ONLY the final slug part of the article URL. 
        Example: If the link is "https://rust.facepunch.com/news/community-update-268", the id MUST be "community-update-268".
        DO NOT include the full URL.
        
        For each article, provide:
        - id
        - The title
        - The publication date (formatted nicely like "May 12, 2025")
        - A category (e.g., Update, Community, Devblog)
        - A short excerpt/summary
        - The main image URL
        - The full link to the article

        RSS Data:
        ${xmlData}`,
        output: { schema: FetchRustNewsOutputSchema },
      });

      if (!output) {
        throw new Error('AI failed to parse news articles');
      }

      return output;
    } catch (error) {
      console.error('Error in fetchRustNewsFlow:', error);
      // Return empty list on failure to prevent app crash
      return { articles: [] };
    }
  }
);
