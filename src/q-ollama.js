import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-ollama-port";
    const title = "Ollama Default API Port";

    const answer = "11434";

    const question = html`
    <div class="mb-3">
      <p>
        When running <strong>ollama serve</strong>, which default
        <strong>TCP port</strong> does Ollama expose its local HTTP API on?
      </p>
      <label for="${id}" class="form-label">Port number:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}