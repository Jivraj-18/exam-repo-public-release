import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-ngrok-http";
  const title = "Expose Port 8000 via Ngrok";

  const answer = "ngrok http 8000";

  const question = html`
    <div class="mb-3">
      <p>
        What <code>ngrok</code> command exposes your local web server running 
        on <strong>port 8000</strong> to the public internet?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}