import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-markdown-structure-analysis";
  const title = "Markdown Structure Analysis";

  const random = seedrandom(`${user.email}#${id}`);

  const headingCount = Math.floor(random() * 3) + 3; // 3–5 headings
  const listCount = Math.floor(random() * 4) + 2; // 2–5 lists

  let expectedLinks = 0;

  let md = "";
  for (let i = 1; i <= headingCount; i++) {
    md += `## Section ${i}\n\n`;
    if (i <= listCount) {
      md += `- Item A\n- Item B\n\n`;
    }
    if (random() > 0.5) {
      md += `[Reference](https://example.com/${i})\n\n`;
      expectedLinks++;
    }
  }

  const blob = new Blob([md], { type: "text/markdown" });

  const answer = async (value) => {
    const n = Number(value);
    if (!Number.isInteger(n)) throw new Error("Enter a valid integer.");
    if (n !== expectedLinks) {
      throw new Error("Incorrect link count. Count markdown links only.");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Markdown Documentation Review</h2>
      <p>
        Technical teams often use Markdown for documentation, reports, and
        narratives. You are reviewing a Markdown file to understand its
        structure.
      </p>

      <ol>
        <li>Open the Markdown file.</li>
        <li>Scan for inline links in the format <code>[text](url)</code>.</li>
        <li>Count how many links are present.</li>
      </ol>

      <p>
        Download the Markdown file:
        <button class="btn btn-sm btn-outline-primary"
          @click=${() => download(blob, `${id}.md`)}>
          ${id}.md
        </button>
      </p>

      <label for="${id}" class="form-label">
        How many Markdown links are present in the document?
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}
