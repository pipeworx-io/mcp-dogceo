# mcp-dogceo

MCP server for random dog images and breed listings via [Dog CEO API](https://dog.ceo/dog-api/). No authentication required.

## Tools

| Tool | Description |
|------|-------------|
| `random_image` | Get a random dog image URL from any breed |
| `list_breeds` | List all dog breeds and their sub-breeds |
| `breed_images` | Get multiple random dog images for a specific breed |
| `random_breed_image` | Get a single random dog image for a specific breed |

## Quickstart via Pipeworx Gateway

Call any tool through the hosted gateway with zero setup:

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "dogceo_random_image",
      "arguments": {}
    }
  }'
```

## License

MIT
