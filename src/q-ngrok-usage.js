import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-ngrok-port";
  const title = "Expose Local Server with Ngrok";

  const answer = "ngrok http 8000";

  const question = html`
    <div class="mb-3">
      <p>
        Which command exposes a local web server running on
        <strong>port 8000</strong> to the internet using ngrok?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
