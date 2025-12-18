import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-fastapi-cli-agent";
  const title = "FastAPI + CLI Coding Agent Task";
  const answer = "Public FastAPI endpoint URL";
  const question = html`
    <div class="mb-3">
      <p>
        Implement a <strong>FastAPI</strong> app with a GET endpoint <code>/run</code> that forwards a task
        description to a CLI coding agent and returns its output as JSON.
        The agent must execute a task that prints the <strong>factorial of 10</strong>.
      </p>
      <label for="${id}" class="form-label">FastAPI Endpoint URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;
  return { id, title, weight, question, answer };
}
