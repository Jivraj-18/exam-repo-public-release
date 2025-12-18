import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-js-console";
  const title = "JavaScript Logging";
  const answer = "console.log";

  const question = html`
    <div class="mb-3">
      <p>
        Which method is used to print messages to the 
        <strong>browser's debugging console</strong> in JavaScript?
      </p>
      <label for="${id}" class="form-label">Method name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
