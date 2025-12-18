import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-copilot-chat";
  const title = "GitHub Copilot Chat App";

  const answer = "Context-aware coding assistance";

  const question = html`
    <div class="mb-3">
      <p>
        What makes GitHub Copilot Chat especially useful while building apps?
      </p>

      <label>
        <input type="radio" name="${id}" />
        Context-aware coding assistance
      </label><br />

      <label>
        <input type="radio" name="${id}" />
        Hardware monitoring
      </label><br />

      <label>
        <input type="radio" name="${id}" />
        Manual code compilation
      </label>
    </div>
  `;

  return { id, title, question, answer, weight };
}
