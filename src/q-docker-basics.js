import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-docker-cmd";
  const title = "Docker Run Command";

  const answer = "docker run -it python:3.11-slim";

  const question = html`
    <div class="mb-3">
      <p>
        Which Docker command starts an <strong>interactive terminal</strong>
        using the <code>python:3.11-slim</code> image?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
