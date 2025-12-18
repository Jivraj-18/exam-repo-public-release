import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gemini-canvas";
  const title = "Gemini Canvas App";

  const answer = "Interactive prototyping";

  const question = html`
    <div class="mb-3">
      <p>
        What is the main benefit of building an app using Gemini Canvas?
      </p>

      <label>
        <input type="radio" name="${id}" />
        Interactive prototyping
      </label><br />

      <label>
        <input type="radio" name="${id}" />
        Low-level kernel programming
      </label><br />

      <label>
        <input type="radio" name="${id}" />
        Network packet inspection
      </label>
    </div>
  `;

  return { id, title, question, answer, weight };
}
