import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const SITE_DIR = path.resolve(MODULE_DIR, "..", "..");
const ROOT_PACKAGE_JSON = path.join(SITE_DIR, "package.json");

const SOURCE_FILES = [
  {
    id: "home",
    file: "index.html",
    urlPath: "/",
    label: "Homepage",
  },
  {
    id: "whitepaper",
    file: "whitepaper.html",
    urlPath: "/whitepaper",
    label: "Whitepaper",
  },
  {
    id: "applications",
    file: "apps.html",
    urlPath: "/apps",
    label: "Applications",
  },
  {
    id: "contact",
    file: "contact.html",
    urlPath: "/contact",
    label: "Contact",
  },
];

const ENTITY_MAP = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&quot;": "\"",
  "&#34;": "\"",
  "&#39;": "'",
  "&apos;": "'",
  "&lt;": "<",
  "&gt;": ">",
};

let cachedDocuments;

function readOrigin() {
  try {
    const raw = fs.readFileSync(ROOT_PACKAGE_JSON, "utf8");
    const pkg = JSON.parse(raw);
    const homepage = typeof pkg.homepage === "string" ? pkg.homepage.trim() : "";
    return homepage.replace(/\/+$/, "") || "https://veilux.network";
  } catch {
    return "https://veilux.network";
  }
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_match, hex) =>
      String.fromCodePoint(Number.parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_match, decimal) =>
      String.fromCodePoint(Number.parseInt(decimal, 10))
    )
    .replace(
      /&(nbsp|amp|quot|apos|lt|gt|#34|#39);/g,
      (match) => ENTITY_MAP[match] ?? match
    );
}

function stripHtml(html) {
  return decodeHtmlEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
      .replace(/<\/(p|div|section|article|header|footer|li|tr|h[1-6])>/gi, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\r/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

function extractTitle(html, fallback) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  return match ? decodeHtmlEntities(match[1]).trim() : fallback;
}

function extractMetaDescription(html) {
  const match = html.match(
    /<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["'][^>]*>/i
  );
  return match ? decodeHtmlEntities(match[1]).trim() : "";
}

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function buildDocument(origin, source) {
  const absolutePath = path.join(SITE_DIR, source.file);
  const html = fs.readFileSync(absolutePath, "utf8");
  const title = extractTitle(html, source.label);
  const description = extractMetaDescription(html);
  const text = stripHtml(html);
  const url = new URL(source.urlPath, `${origin}/`).toString();

  return {
    id: source.id,
    title,
    description,
    text,
    url,
    path: source.file,
    wordCount: text.split(/\s+/).filter(Boolean).length,
  };
}

export function loadSiteDocuments() {
  if (!cachedDocuments) {
    const origin = readOrigin();
    cachedDocuments = SOURCE_FILES.map((source) => buildDocument(origin, source));
  }

  return cachedDocuments;
}

function countOccurrences(text, token) {
  if (!token) {
    return 0;
  }

  let count = 0;
  let offset = 0;

  while (offset >= 0) {
    offset = text.indexOf(token, offset);
    if (offset < 0) {
      break;
    }

    count += 1;
    offset += token.length;
  }

  return count;
}

export function searchDocuments(query, limit = 8) {
  const documents = loadSiteDocuments();
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return documents.slice(0, limit).map((document) => ({
      id: document.id,
      title: document.title,
      url: document.url,
    }));
  }

  const tokens = [...new Set(normalizedQuery.split(/\s+/).filter(Boolean))];

  return documents
    .map((document) => {
      const titleText = normalize(document.title);
      const descriptionText = normalize(document.description);
      const bodyText = normalize(document.text);

      const score = tokens.reduce((total, token) => {
        const titleScore = countOccurrences(titleText, token) * 8;
        const descriptionScore = countOccurrences(descriptionText, token) * 4;
        const bodyScore = Math.min(countOccurrences(bodyText, token), 12);
        return total + titleScore + descriptionScore + bodyScore;
      }, 0);

      return { document, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map(({ document }) => ({
      id: document.id,
      title: document.title,
      url: document.url,
    }));
}

export function getDocumentById(id) {
  return loadSiteDocuments().find((document) => document.id === id) ?? null;
}
