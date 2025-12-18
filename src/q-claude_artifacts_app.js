import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-claude-artifacts";
  const title = "Claude Artifacts App";

  const answer = "Reusable project outputs";

  const question = html`
    <div class="mb-3">
      <p>
        In Claude Artifacts, what are artifacts mainly used for?
      </p>

      <label>
        <input type="radio" name="${id}" />
        Reusable project outputs
      </label><br />

      <label>
        <input type="radio" name="${id}" />
        API authentication
      </label><br />

      <label>
        <input type="radio" name="${id}" />
        Database indexing
      </label>
    </div>
  `;

  return { id, title, question, answer, weight };
}
