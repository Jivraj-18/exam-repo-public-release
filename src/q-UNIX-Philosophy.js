import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-unix-ai";
  const title = "UNIX Philosophy with AI";

  const answer = "stdin";

  const question = html`
    <div class="mb-3">
      <p>
        Simon Willison’s <code>llm</code> CLI follows the UNIX philosophy
        to integrate with existing tools.
      </p>
      <p>
        Which standard stream is primarily used to feed data into <code>llm</code>?
      </p>
      <label for="${id}" class="form-label">Stream:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
