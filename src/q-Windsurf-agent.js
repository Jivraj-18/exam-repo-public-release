import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-windsurf-agent";
  const title = "Windsurf Core Agent";

  const answer = "Cascade";

  const question = html`
    <div class="mb-3">
      <p>
        What is the name of the core AI agent system in the Windsurf IDE that has 
        full contextual awareness and "flows" with the developer?
      </p>
      <label for="${id}" class="form-label">Agent Name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}