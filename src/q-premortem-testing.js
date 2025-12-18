import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-premortem";
  const title = "Premortem Tests";

  const answer = "premortem";

  const question = html`
    <div class="mb-3">
      <p>
        What type of testing workflow involves writing the tests you want to see fail 
        <strong>before</strong> you let the AI model touch the repository?
      </p>
      <label for="${id}" class="form-label">Test Type:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. regression" />
    </div>
  `;

  return { id, title, weight, question, answer };
}