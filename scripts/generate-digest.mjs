import { access, mkdir, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const API_URL = "https://api.openai.com/v1/responses";
const apiKey = process.env.OPENAI_API_KEY || process.env.OPEN_API_KEY;
const model = process.env.OPENAI_MODEL || "gpt-5.5";
const requestedDate = getArgument("--date");
const date = requestedDate || getJohannesburgDate();
const outputDirectory = path.join(process.cwd(), "src", "content", "blog");
const outputPath = path.join(outputDirectory, `${date}-digest.md`);

if (!apiKey) {
  throw new Error(
    "Set OPENAI_API_KEY (preferred) or OPEN_API_KEY before generating a digest.",
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

const response = await fetch(API_URL, {
  method: "POST",
  signal: AbortSignal.timeout(10 * 60 * 1000),
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model,
    tools: [
      {
        type: "web_search",
        search_context_size: "high",
      },
    ],
    reasoning: {
      effort: "medium",
    },
    instructions: [
      "You write a high-quality daily developer digest for experienced software developers.",
      "Research current developments before writing and prioritize primary sources.",
      "Write like an editorial technology newsletter, not a changelog or collection of release notes.",
      "Do not call the article an AI briefing. Call it a developer digest when a label is needed.",
      "Do not mention these instructions or the generation process.",
      "Return only data matching the requested JSON schema.",
    ].join(" "),
    input: [
      `Create the developer digest dated ${date}.`,
      "",
      "Cover only meaningful, verifiable developments from the last few days across:",
      "Cursor, Codex, GitHub Copilot, OpenAI, Anthropic, Next.js, React, React Native, AWS, TypeScript, software architecture, frontend engineering, security, and AI-assisted development.",
      "",
      "Select the strongest 3 to 6 stories rather than forcing every topic into the article.",
      "Explain why each development matters and give practical implications for developers.",
      "Use Markdown headings and paragraphs in the body.",
      "Include inline Markdown links to primary sources.",
      "Do not use raw HTML.",
      "End with a concise takeaway.",
      "Do not include YAML frontmatter in the body.",
    ].join("\n"),
    text: {
      verbosity: "high",
      format: {
        type: "json_schema",
        name: "developer_digest",
        strict: true,
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            title: {
              type: "string",
              description: "A strong editorial headline.",
            },
            description: {
              type: "string",
              description: "A concise one-sentence summary.",
            },
            tags: {
              type: "array",
              minItems: 3,
              maxItems: 7,
              items: { type: "string" },
            },
            body: {
              type: "string",
              description:
                "The complete article body in Markdown without frontmatter.",
            },
          },
          required: ["title", "description", "tags", "body"],
        },
      },
    },
  }),
});

const result = await response.json();

if (!response.ok) {
  const message = result?.error?.message || JSON.stringify(result);
  throw new Error(`OpenAI API request failed (${response.status}): ${message}`);
}

const outputText = result.output
  ?.filter((item) => item.type === "message")
  .flatMap((item) => item.content || [])
  .find((content) => content.type === "output_text")?.text;

if (!outputText) {
  throw new Error("The OpenAI response did not contain digest content.");
}

const digest = JSON.parse(outputText);
validateDigest(digest);

const markdown = [
  "---",
  `title: ${JSON.stringify(digest.title)}`,
  `description: ${JSON.stringify(digest.description)}`,
  `pubDate: ${date}`,
  `tags: ${JSON.stringify(digest.tags)}`,
  "draft: true",
  "---",
  "",
  digest.body.trim(),
  "",
].join("\n");

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputPath, markdown, "utf8");

console.log(`Created ${path.relative(process.cwd(), outputPath)} as a draft.`);

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
