import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vibe-coding-limit";
  const title = "Limits of Vibe Coding";

  const answer = "production";

  const question = html`
    <div class="mb-3">
      <p>
        Vibe coding works well for prototypes and internal tools,
        but is discouraged in which type of systems?
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
