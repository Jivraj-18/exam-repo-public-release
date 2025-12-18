import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-markdown-readme-formatting";
  const title = "Markdown: README Formatting & Structure";

  const random = seedrandom(`${user.email}#${id}`);
  const projectNames = ["Weather Tracker", "Expense Analyzer", "Book Finder", "Task Manager", "Stock Dashboard"];
  const project = projectNames[Math.floor(random() * projectNames.length)];

  const answer = (input) => {
    // normalize whitespace
    const text = input.trim();

    const checks = [
      /^# .+/m,                    // H1 heading
      /## Installation/m,          // Installation section
      /## Usage/m,                 // Usage section
      /```(bash|sh)?/m,            // code block
      /\*\*.+\*\*/m,               // bold text
      /- .+/m,                     // bullet list
      /\[.+\]\(.+\)/m,             // markdown link
    ];

    return checks.every((r) => r.test(text));
  };

  const question = html`
    <div class="mb-3">
      <p>
        You are creating a <strong>README.md</strong> file for a project called
        <strong>${project}</strong>.
      </p>

      <p>
        Write a Markdown snippet that includes:
      </p>

      <ul>
        <li>An <strong>H1 title</strong> with the project name</li>
        <li>An <strong>Installation</strong> section</li>
        <li>A <strong>Usage</strong> section</li>
        <li>At least <strong>one bullet list</strong></li>
        <li>A <strong>code block</strong> showing a shell command</li>
        <li>One example of <strong>bold text</strong></li>
        <li>A <strong>Markdown link</strong></li>
      </ul>

      <p>
        Paste <strong>only the Markdown content</strong> below (no explanations).
      </p>

      <label for="${id}" class="form-label">Markdown content</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="10"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
