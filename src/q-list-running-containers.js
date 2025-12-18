import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-docker-ps";
  const title = "Running Docker Containers";

  const answer = "docker ps";

  const question = html`
    <div class="mb-3">
      <p>
        Which Docker command displays only the
        <strong>currently running containers</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
