import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-context-tool";
  const title = "Context XML Tool";

  const answer = "uvx files-to-prompt";

  const question = html`
    <div class="mb-3">
      <p>
        According to the "File context" section, which command-line tool (run via uvx) 
        concatenates files into an XML structure for AI tools? 
        (Provide the full command including 'uvx')
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="uvx ..." />
    </div>
  `;

  return { id, title, weight, question, answer };
}
