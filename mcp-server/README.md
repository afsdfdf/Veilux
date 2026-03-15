# Veilux MCP Server

This folder adds a tool-only ChatGPT app to the existing Veilux website repo.

## Archetype

`tool-only`

The current repo is a static knowledge source, so the MCP server exposes the standard read-only `search` and `fetch` tools instead of adding a widget.

## Repo Shape

```text
mcp-server/
  package.json
  server.js
  lib/
    content-index.js
```

## Tools

- `search`
  - Input: `{ "query": "..." }`
  - Output: one MCP `content` item containing JSON text with `results[] { id, title, url }`
- `fetch`
  - Input: `{ "id": "..." }`
  - Output: one MCP `content` item containing JSON text with `{ id, title, text, url, metadata }`

The indexed sources are the local `index.html`, `whitepaper.html`, `apps.html`, and `contact.html` pages.

## Local Run

```bash
cd mcp-server
npm install
npm start
```

Health check:

```bash
curl http://localhost:8787/
```

MCP endpoint:

```text
http://localhost:8787/mcp
```

## ChatGPT Developer Mode

1. Start the server locally.
2. Expose it with HTTPS, for example `ngrok http 8787`.
3. In ChatGPT, enable Developer Mode under `Settings -> Apps & Connectors -> Advanced settings`.
4. Create a new app using the public HTTPS URL plus `/mcp`.
5. Refresh the app in ChatGPT after tool metadata changes.
