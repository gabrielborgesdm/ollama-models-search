import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Represents an Ollama AI model with its metadata
 */
export interface OllamaModel {
  name: string;
  description: string;
  pulls: string;
  updated: string;
  versions: string[];
  url: string;
}

export type SearchOllamaModelsParams = {
  query?: string;
  categories?: Category[];
  order?: Order;
};

/**
 * Available model categories on Ollama
 */
export enum Category {
  Thinking = "thinking",
  Embedding = "embedding",
  Vision = "vision",
  Tools = "tools",
}

/**
 * Available sorting orders for search results
 */
export enum Order {
  Newest = "newest",
  Popular = "popular",
}

/**
 * Searches for Ollama AI models based on the provided criteria
 * @param query - Search query string
 * @param categories - Optional category filters
 * @param order - Optional sorting order for results
 * @returns Promise resolving to an array of OllamaModel objects
 * @throws Will throw an error if the request to Ollama's website fails
 */
export async function searchOllamaModels({
  query,
  categories,
  order,
}: SearchOllamaModelsParams = {}): Promise<OllamaModel[]> {
  // Construct the search URL with provided parameters
  const baseUrl = "https://www.ollama.com";

  const url = new URL(`${baseUrl}/search`);
  if (query) url.searchParams.set("q", query);
  if (categories)
    categories.forEach((category) => url.searchParams.append("c", category));
  if (order) url.searchParams.set("o", order);

  const { data: html } = await axios.get(url.toString());
  const $ = cheerio.load(html);

  const results: OllamaModel[] = [];

  // Iterate over each model card in the search results
  $("a.group").each((_, element) => {
    const name = $(element)
      .find("[x-test-search-response-title]")
      .text()
      .trim();
    const description = $(element).find("p.text-md").text().trim();

    const pulls = $(element).find("[x-test-pull-count]").text().trim();
    const updated = $(element).find("[x-test-updated]").text().trim();

    // Skip elements that don't have pull count
    // This is because some elements are not models
    if (!pulls) return;

    const versions: string[] = [];
    $(element)
      .find("[x-test-size]")
      .each((_, el) => {
        versions.push($(el).text().trim());
      });

    const modelUrl = new URL(`library/${name}`, baseUrl);

    // Add the parsed model data to results
    results.push({
      name,
      description,
      pulls,
      updated,
      versions,
      url: modelUrl.toString(),
    });
  });

  return results;
}
