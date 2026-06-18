import { access, mkdir, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const model = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";
const requestedDate = getArgument("--date");
const date = requestedDate || getJohannesburgDate();
const outputDirectory = path.join(process.cwd(), "src", "content", "blog");
const outputPath = path.join(outputDirectory, `${date}-digest.md`);
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

const sourceFeeds = [
  {
    name: "OpenAI News",
    url: "https://openai.com/news/rss.xml",
  },
  {
    name: "Anthropic News",
    url: "https://www.anthropic.com/news/rss.xml",
  },
  {
    name: "GitHub Blog",
    url: "https://github.blog/feed/",
  },
  {
    name: "Vercel Blog",
    url: "https://vercel.com/blog/rss.xml",
  },
  {
    name: "Next.js Releases",
    url: "https://github.com/vercel/next.js/releases.atom",
  },
  {
    name: "React Native Releases",
    url: "https://github.com/facebook/react-native/releases.atom",
  },
  {
    name: "TypeScript Releases",
    url: "https://github.com/microsoft/TypeScript/releases.atom",
  },
  {
    name: "AWS News",
    url: "https://aws.amazon.com/about-aws/whats-new/recent/feed/",
  },
  {
    name: "AWS Security Blog",
    url: "https://aws.amazon.com/blogs/security/feed/",
  },
];

if (!apiKey) {
  throw new Error(
    "Set GEMINI_API_KEY before generating a digest. GOOGLE_API_KEY is also accepted.",
  );
}

if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  throw new Error(`Invalid date "${date}". Use YYYY-MM-DD.`);
}

if (!isValidDate(date)) {
  throw new Error(`Invalid calendar date "${date}".`);
}

try {
  await access(outputPath, constants.F_OK);
  throw new Error(
    `${path.relative(process.cwd(), outputPath)} already exists. Refusing to overwrite it.`,
  );
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const weekRange = getWeekRange(date);
const sources = await collectSources(weekRange);

if (sources.length === 0) {
  throw new Error("No source updates could be fetched for the digest.");
}

const response = await fetch(`${API_URL}?key=${encodeURIComponent(apiKey)}`, {
  method: "POST",
  signal: AbortSignal.timeout(10 * 60 * 1000),
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: buildPrompt({ date, weekRange, sources }),
          },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          title: {
            type: "STRING",
            description: "A strong editorial headline.",
          },
          description: {
            type: "STRING",
            description: "A concise one-sentence summary.",
          },
          tags: {
            type: "ARRAY",
            minItems: 3,
            maxItems: 7,
            items: { type: "STRING" },
          },
          body: {
            type: "STRING",
            description:
              "The complete article body in Markdown without frontmatter.",
          },
        },
        required: ["title", "description", "tags", "body"],
      },
      temperature: 0.7,
    },
  }),
});

const result = await response.json();

if (!response.ok) {
  const message = result?.error?.message || JSON.stringify(result);
  throw new Error(`Gemini API request failed (${response.status}): ${message}`);
}

const outputText = result.candidates?.[0]?.content?.parts
  ?.map((part) => part.text || "")
  .join("")
  .trim();

if (!outputText) {
  throw new Error("The Gemini response did not contain digest content.");
}

const digest = JSON.parse(outputText);
validateDigest(digest);

const markdown = [
  "---",
  `title: ${JSON.stringify(digest.title)}`,
  `description: ${JSON.stringify(digest.description)}`,
  `pubDate: ${date}`,
  `tags: ${JSON.stringify(digest.tags)}`,
  "---",
  "",
  digest.body.trim(),
  "",
].join("\n");

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputPath, markdown, "utf8");

console.log(`Created ${path.relative(process.cwd(), outputPath)}.`);

async function collectSources(weekRange) {
  const settled = await Promise.allSettled(
    sourceFeeds.map(async (feed) => {
      const response = await fetch(feed.url, {
        headers: {
          "User-Agent": "meezaan.dev weekly digest generator",
        },
        signal: AbortSignal.timeout(20 * 1000),
      });

      if (!response.ok) {
        throw new Error(`${feed.name} returned ${response.status}`);
      }

      const text = await response.text();
      return parseFeed(feed, text)
        .filter((source) => isWithinWeek(source.date, weekRange))
        .slice(0, 8);
    }),
  );

  return settled
    .filter((result) => result.status === "fulfilled")
    .flatMap((result) => result.value)
    .filter((source) => source.title && source.url)
    .slice(0, 60);
}

function parseFeed(feed, text) {
  const itemMatches =
    text.match(/<item[\s\S]*?<\/item>/gi) ||
    text.match(/<entry[\s\S]*?<\/entry>/gi) ||
    [];

  return itemMatches.map((item) => ({
    feed: feed.name,
    title: decodeEntities(readTag(item, "title")),
    url: decodeEntities(readTag(item, "link") || readLinkHref(item)),
    date: decodeEntities(
      readTag(item, "pubDate") ||
        readTag(item, "updated") ||
        readTag(item, "published"),
    ),
    summary: cleanText(
      decodeEntities(
        readTag(item, "description") ||
          readTag(item, "summary") ||
          readTag(item, "content"),
      ),
    ),
  }));
}

function getWeekRange(digestDate) {
  const end = new Date(`${digestDate}T00:00:00.000Z`);
  end.setUTCDate(end.getUTCDate() - 1);

  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 6);

  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

function isWithinWeek(sourceDate, weekRange) {
  if (!sourceDate) return true;

  const parsed = new Date(sourceDate);
  if (Number.isNaN(parsed.valueOf())) return true;

  const value = parsed.toISOString().slice(0, 10);
  return value >= weekRange.start && value <= weekRange.end;
}

function buildPrompt({ date, weekRange, sources }) {
  const sourceBrief = sources
    .map((source, index) =>
      [
        `${index + 1}. ${source.title}`,
        `Source: ${source.feed}`,
        `URL: ${source.url}`,
        source.date ? `Date: ${source.date}` : "",
        source.summary ? `Summary: ${source.summary.slice(0, 500)}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");

  return [
    "You write a high-quality weekly developer digest for experienced software developers.",
    "Use only the source list below. Do not invent links or facts.",
    "Synthesize the week into a cohesive overview rather than a day-by-day recap.",
    "Prioritize primary sources and choose the strongest 5 to 8 stories.",
    "Write like an editorial technology newsletter, not a changelog or collection of release notes.",
    "Do not call the article an AI briefing. Call it a developer digest when a label is needed.",
    "Use Markdown headings and paragraphs in the body.",
    "Include inline Markdown links to the supplied source URLs.",
    "Do not use raw HTML.",
    "End with a concise takeaway about the week's overall signal.",
    "Do not include YAML frontmatter in the body.",
    "",
    `Create the weekly developer digest dated ${date}, covering ${weekRange.start} through ${weekRange.end}.`,
    "",
    "Coverage areas include Cursor, Codex, GitHub Copilot, OpenAI, Anthropic, Next.js, React, React Native, AWS, TypeScript, software architecture, frontend engineering, security, and AI-assisted development.",
    "",
    "Return JSON with this exact shape: title, description, tags, body.",
    "",
    "Sources:",
    sourceBrief,
  ].join("\n");
}

function readTag(text, tagName) {
  const match = text.match(new RegExp(`<[^:>]*:?${tagName}[^>]*>([\\s\\S]*?)<\\/[^:>]*:?${tagName}>`, "i"));
  return match?.[1]?.trim() || "";
}

function readLinkHref(text) {
  const match = text.match(/<link[^>]+href=["']([^"']+)["'][^>]*>/i);
  return match?.[1]?.trim() || "";
}

function cleanText(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeEntities(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function getArgument(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

function getJohannesburgDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function isValidDate(value) {
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().startsWith(value);
}

function validateDigest(value) {
  if (
    !value ||
    typeof value.title !== "string" ||
    value.title.trim().length === 0 ||
    typeof value.description !== "string" ||
    value.description.trim().length === 0 ||
    typeof value.body !== "string" ||
    value.body.trim().length === 0 ||
    !Array.isArray(value.tags) ||
    value.tags.length < 3 ||
    value.tags.some((tag) => typeof tag !== "string")
  ) {
    throw new Error("The generated digest did not match the expected shape.");
  }

  const unsafeHtml = /<(script|iframe|object|embed)\b|javascript:/i;
  if (unsafeHtml.test(value.body)) {
    throw new Error("The generated digest contains unsafe HTML.");
  }
}
