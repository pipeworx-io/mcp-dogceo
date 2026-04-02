/**
 * Dog CEO MCP — wraps Dog CEO's Dog API (free, no auth)
 *
 * Tools:
 * - random_image: Get a random dog image URL
 * - list_breeds: List all dog breeds
 * - breed_images: Get multiple random images for a specific breed
 * - random_breed_image: Get a single random image for a specific breed
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://dog.ceo/api';

type RawSingleImageResponse = {
  status: string;
  message: string;
};

type RawMultiImageResponse = {
  status: string;
  message: string[];
};

type RawBreedsResponse = {
  status: string;
  message: Record<string, string[]>;
};

const tools: McpToolExport['tools'] = [
  {
    name: 'random_image',
    description: 'Get a random dog image URL from any breed.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'list_breeds',
    description: 'List all dog breeds and their sub-breeds.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'breed_images',
    description: 'Get multiple random dog images for a specific breed.',
    inputSchema: {
      type: 'object',
      properties: {
        breed: {
          type: 'string',
          description: 'The breed name (e.g. "hound", "labrador"). Use list_breeds to see valid values.',
        },
        count: {
          type: 'number',
          description: 'Number of images to return. Defaults to 3.',
        },
      },
      required: ['breed'],
    },
  },
  {
    name: 'random_breed_image',
    description: 'Get a single random dog image for a specific breed.',
    inputSchema: {
      type: 'object',
      properties: {
        breed: {
          type: 'string',
          description: 'The breed name (e.g. "hound", "labrador"). Use list_breeds to see valid values.',
        },
      },
      required: ['breed'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'random_image':
      return randomImage();
    case 'list_breeds':
      return listBreeds();
    case 'breed_images':
      return breedImages(args.breed as string, (args.count as number | undefined) ?? 3);
    case 'random_breed_image':
      return randomBreedImage(args.breed as string);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function randomImage() {
  const res = await fetch(`${BASE_URL}/breeds/image/random`);
  if (!res.ok) throw new Error(`Dog CEO API error: ${res.status}`);
  const data = (await res.json()) as RawSingleImageResponse;
  return { image_url: data.message };
}

async function listBreeds() {
  const res = await fetch(`${BASE_URL}/breeds/list/all`);
  if (!res.ok) throw new Error(`Dog CEO API error: ${res.status}`);
  const data = (await res.json()) as RawBreedsResponse;
  return { breeds: data.message };
}

async function breedImages(breed: string, count: number) {
  const res = await fetch(`${BASE_URL}/breed/${encodeURIComponent(breed)}/images/random/${count}`);
  if (!res.ok) throw new Error(`Dog CEO API error: ${res.status}`);
  const data = (await res.json()) as RawMultiImageResponse;
  return { breed, image_urls: data.message };
}

async function randomBreedImage(breed: string) {
  const res = await fetch(`${BASE_URL}/breed/${encodeURIComponent(breed)}/images/random`);
  if (!res.ok) throw new Error(`Dog CEO API error: ${res.status}`);
  const data = (await res.json()) as RawSingleImageResponse;
  return { breed, image_url: data.message };
}

export default { tools, callTool } satisfies McpToolExport;
