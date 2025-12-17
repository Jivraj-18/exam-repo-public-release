import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;

const taskFactories = [
  (random) => {
    const level = randInt(random, 1, 6);
    const text = pick(["Hello World", "Welcome", "Introduction", "Getting Started", "Overview"], random);
    return {
      id: `heading-${level}`,
      input: `${"#".repeat(level)} ${text}`,
      expected: `<h${level}>${text}</h${level}>`,
      description: `heading level ${level}`,
    };
  },
  (random) => {
    const word = pick(["important", "critical", "note", "warning", "highlight"], random);
    return {
      id: `bold-${word}`,
      input: `**${word}**`,
      expected: `<strong>${word}</strong>`,
      description: `bold text`,
    };
  },
  (random) => {
    const word = pick(["emphasis", "italic", "styled", "formatted", "special"], random);
    return {
      id: `italic-${word}`,
      input: `*${word}*`,
      expected: `<em>${word}</em>`,
      description: `italic text`,
    };
  },
  (random) => {
    const text = pick(["Click here", "Visit site", "Learn more", "Documentation", "Reference"], random);
    const url = pick(["https://example.com", "https://test.org", "https://demo.io"], random);
    return {
      id: `link-${text.replace(/\s/g, "")}`,
      input: `[${text}](${url})`,
      expected: `<a href="${url}">${text}</a>`,
      description: `hyperlink`,
    };
  },
  (random) => {
    const items = randInt(random, 2, 4);
    const listItems = Array.from({ length: items }, (_, i) => `Item ${i + 1}`);
    const input = listItems.map((item) => `- ${item}`).join("\n");
    const expected = `<ul>${listItems.map((item) => `<li>${item}</li>`).join("")}</ul>`;
    return {
      id: `list-${items}`,
      input,
      expected,
      description: `unordered list with ${items} items`,
    };
  },
  (random) => {
    const code = pick(["print('hello')", "console.log(1)", "return x + y", "def main():", "let x = 5"], random);
    return {
      id: `code-inline`,
      input: `\`${code}\``,
      expected: `<code>${code}</code>`,
      description: `inline code`,
    };
  },
];

export default async function ({ user, weight = 1 }) {
  const id = "q-markdown-converter";
  const title = "Markdown to HTML Converter API";
  const random = seedrandom(`${user.email}#${id}`);
  const task = pick(taskFactories, random)(random);

  const question = html`
    <div class="mb-3">
      <h4>Markdown to HTML Converter</h4>
      <p>
        <strong>Scenario:</strong> Build a FastAPI endpoint that converts Markdown text to HTML.
        This tests your understanding of string parsing and API development.
      </p>
      <ol>
        <li>Implement a FastAPI app with a <code>POST /convert</code> route.</li>
        <li>Accept JSON body: <code>{ "markdown": "..." }</code></li>
        <li>Convert the markdown to HTML and respond with: <code>{ "html": "...", "email": "${user.email}" }</code></li>
        <li>Enable CORS for cross-origin requests.</li>
      </ol>
      <p>
        For grading, we will send this markdown:
        <code class="d-block my-2">${task.input}</code>
        Expected output should contain ${task.description}.
      </p>
      <label for="${id}" class="form-label">Enter the base URL of your API (without /convert)</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");

    const endpoint = url.replace(/\/$/, "") + "/convert";
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markdown: task.input }),
    });

    if (!resp.ok) throw new Error(`Endpoint returned ${resp.status}`);

    const contentType = resp.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) throw new Error("Response must be JSON");

    let data;
    try {
      data = await resp.json();
    } catch {
      throw new Error("Invalid JSON response");
    }

    if (data.email !== user.email) throw new Error("Email must match your registered email");
    if (!data.html) throw new Error("Response must include 'html' field");

    const normalized = data.html.replace(/\s+/g, "").toLowerCase();
    const expectedNorm = task.expected.replace(/\s+/g, "").toLowerCase();
    if (!normalized.includes(expectedNorm)) {
      throw new Error(`HTML output does not match expected ${task.description}`);
    }

    return true;
  };

  return { id, title, weight, question, answer };
}