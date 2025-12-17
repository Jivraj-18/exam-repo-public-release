// File: src/q-ollama-ngrok.js
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-ollama-ngrok";
  const title = "Expose Local Ollama via ngrok";

  const answer = "https://abcd1234.ngrok-free.app";

  const question = html`
    <div class="mb-3">
      <p>
        You started Ollama with <code>OLLAMA_ORIGINS="*"</code> and exposed port <code>11434</code> using ngrok,
        injecting header <code>X-Email: 22f2000914@ds.study.iitm.ac.in</code>.
        What is the HTTPS forwarding URL printed by ngrok?
      </p>
      <label for="${id}" class="form-label">ngrok URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
