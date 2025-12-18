import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-docker-images";
    const title = "List Docker Images";

    const answer = "docker images";

    const question = html`
    <div class="mb-3">
      <p>
        Which Docker command lists all <strong>locally available Docker images</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
