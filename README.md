# Ollama Models Search
[![npm version](https://img.shields.io/npm/v/ollama-models-search)](https://www.npmjs.com/package/ollama-models-search)

A TypeScript package that retrieves a list of Ollama models, including metadata such as name, description, pull count, last updated date, and available versions.

## How it works
The package scrapes the Ollama website’s search page by sending queries and parsing the HTML response to extract model information.

## Features

- Search for Ollama AI models by query
- Filter models by categories (Thinking, Embedding, Vision, Tools)
- Sort results by newest or most popular
- Get detailed model information including descriptions, pull counts, and versions
- TypeScript support with included type definitions

## Installation

```bash
npm install ollama-models-search
```

## Usage

### Basic Search

```typescript
import { searchOllamaModels } from 'ollama-models-search';

// Search for models
const models = await searchOllamaModels();
console.log(models);
```

### Advanced Search with Filters

```typescript
import { searchOllamaModels, Category, Order } from 'ollama-models-search';

// Search with filters and sorting
const filteredModels = await searchOllamaModels({
  query: 'llama',
  categories: [Category.Thinking, Category.Vision],
  order: Order.Newest
});

console.log(filteredModels);
```
## Response Example
```
[
    {
        "name": "deepseek-r1",
        "description": "DeepSeek-R1 is a family of open reasoning models with performance approaching that of leading models, such as O3 and Gemini 2.5 Pro.",
        "pulls": "47.1M",
        "updated": "3 days ago",
        "versions": [
            "1.5b",
            "7b",
            "8b",
            "14b",
            "32b",
            "70b",
            "671b"
        ],
        "url": "https://www.ollama.com/library/deepseek-r1"
    },
    {
        "name": "gemma3",
        "description": "The current, most capable model that runs on a single GPU.",
        "pulls": "5.5M",
        "updated": "1 month ago",
        "versions": [
            "1b",
            "4b",
            "12b",
            "27b"
        ],
        "url": "https://www.ollama.com/library/gemma3"
    }
]
```

## API Reference

### `searchOllamaModels(params?: SearchOllamaModelsParams): Promise<OllamaModel[]>`

Searches for Ollama AI models based on the provided criteria.

#### Parameters

- `params` (Optional): Search parameters object with the following properties:
  - `query` (string, optional): Search query string
  - `categories` (Category[], optional): Array of categories to filter by
  - `order` (Order, optional): Sorting order for results

#### Returns

A promise that resolves to an array of `OllamaModel` objects.

### Types

#### `OllamaModel`

```typescript
interface OllamaModel {
  name: string;          // Model name
  description: string;   // Model description
  pulls: string;         // Number of pulls (formatted as string)
  updated: string;      // Last update timestamp
  versions: string[];    // Available model versions
  url: string;          // URL to the model page
}
```

#### `Category` Enum

- `Category.Thinking` - Models optimized for general thinking tasks
- `Category.Embedding` - Models specialized for embeddings
- `Category.Vision` - Models with vision capabilities
- `Category.Tools` - Models with tool usage capabilities

#### `Order` Enum

- `Order.Newest` - Sort by newest models first
- `Order.Popular` - Sort by most popular models first

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- [Ollama](https://ollama.com/) for providing the models
- [Cheerio](https://cheerio.js.org/) for HTML parsing
- [Axios](https://axios-http.com/) for HTTP requests
