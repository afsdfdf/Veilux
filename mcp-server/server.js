import { createServer } from "node:http";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import {
  getDocumentById,
  loadSiteDocuments,
  searchDocuments,
} from "./lib/content-index.js";

const PORT = Number(process.env.PORT ?? 8787);
const MCP_PATH = "/mcp";

const SEARCH_SCHEMA = {
  query: z
    .string()
    .trim()
    .min(1)
    .describe("Search query for Veilux documentation and website content."),
};

const FETCH_SCHEMA = {
  id: z
    .string()
    .trim()
    .min(1)
    .describe("Document id previously returned by the search tool."),
};

function jsonTextContent(payload) {
  return [
    {
      type: "text",
      text: JSON.stringify(payload),
    },
  ];
}

function createKnowledgeServer() {
  const documents = loadSiteDocuments();
  const server = new McpServer({
    name: "veilux-knowledge",
    version: "0.1.0",
  });

  server.registerTool(
    "search",
    {
      title: "Search Veilux knowledge",
      description:
        "Use this when you need to search the Veilux website, whitepaper, applications page, or contact details.",
      inputSchema: SEARCH_SCHEMA,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: false,
        idempotentHint: true,
      },
    },
    async ({ query }) => {
      const results = searchDocuments(query);
      return {
        content: jsonTextContent({ results }),
      };
    }
  );

  server.registerTool(
    "fetch",
    {
      title: "Fetch Veilux document",
      description:
        "Use this when you already have a Veilux document id from search and need the full source text for citation or analysis.",
      inputSchema: FETCH_SCHEMA,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: false,
        idempotentHint: true,
      },
    },
    async ({ id }) => {
      const document = getDocumentById(id);
      if (!document) {
        throw new Error(
          `Unknown Veilux document id "${id}". Call search first to get a valid id.`
        );
      }

      return {
        content: jsonTextContent({
          id: document.id,
          title: document.title,
          text: document.text,
          url: document.url,
          metadata: {
            description: document.description,
            sourcePath: document.path,
            wordCount: document.wordCount,
          },
        }),
      };
    }
  );

  return { server, documents };
}

function isMcpRequest(url, method) {
  const allowedMethods = new Set(["GET", "POST", "DELETE"]);
  return (
    Boolean(method) &&
    allowedMethods.has(method) &&
    (url.pathname === MCP_PATH || url.pathname.startsWith(`${MCP_PATH}/`))
  );
}

const httpServer = createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
    res.end("Missing URL");
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

  if (req.method === "GET" && url.pathname === "/") {
    const documents = loadSiteDocuments();
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(
      JSON.stringify({
        name: "veilux-knowledge",
        status: "ok",
        mcpUrl: `http://localhost:${PORT}${MCP_PATH}`,
        documentCount: documents.length,
        toolNames: ["search", "fetch"],
      })
    );
    return;
  }

  if (req.method === "OPTIONS" && url.pathname.startsWith(MCP_PATH)) {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "content-type, mcp-session-id",
      "Access-Control-Expose-Headers": "Mcp-Session-Id",
    });
    res.end();
    return;
  }

  if (isMcpRequest(url, req.method)) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");

    const { server } = createKnowledgeServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    res.on("close", () => {
      transport.close();
      server.close();
    });

    try {
      await server.connect(transport);
      await transport.handleRequest(req, res);
    } catch (error) {
      console.error("Failed to handle MCP request:", error);
      if (!res.headersSent) {
        res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
        res.end("Internal server error");
      }
    }
    return;
  }

  res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
  res.end("Not Found");
});

httpServer.listen(PORT, () => {
  const documents = loadSiteDocuments();
  console.log(
    `Veilux MCP server listening on http://localhost:${PORT}${MCP_PATH} with ${documents.length} indexed documents.`
  );
});
