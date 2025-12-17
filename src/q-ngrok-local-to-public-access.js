import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-ngrok-usecase";
  const title = "Purpose of ngrok";

  const answer = "Expose a local server to the internet";

  const question = html`
    <div class="mb-3">
      <p>
        What is the primary purpose of using <strong>ngrok</strong>
        in a local development workflow?
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
