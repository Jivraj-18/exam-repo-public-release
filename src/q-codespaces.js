import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-codespaces-feature";
    const title = "Codespaces Devcontainer Feature";

    const answer = "ghcr.io/devcontainers/features/python:1";

    const question = html`
    <div class="mb-3">
      <p>
        Which Dev Container feature reference installs Python in a GitHub
        Codespace using the official Dev Containers registry?
      </p>
      <label for="${id}" class="form-label">Feature reference:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}