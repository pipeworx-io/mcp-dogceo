# mcp-dogceo

Dog CEO MCP — wraps Dog CEO's Dog API (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 250+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `random_image` | Get a random dog photo. Returns image URL and breed name. Use when you need any dog picture without a specific breed preference. |
| `list_breeds` | List all available dog breeds and sub-breeds. Returns breed names and varieties. Use to explore breeds or validate a breed name before fetching images. |
| `breed_images` | Get multiple dog photos for a specific breed (e.g., \'labrador\', \'poodle\'). Returns array of image URLs. Use when you need a gallery of one breed. |
| `random_breed_image` | Get one dog photo for a specific breed (e.g., \'golden_retriever\', \'bulldog\'). Returns image URL and breed name. Use when you need exactly one photo of a particular breed. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "dogceo": {
      "url": "https://gateway.pipeworx.io/dogceo/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 250+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Dogceo data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
