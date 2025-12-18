import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-docker-run-port";
  const title = "Docker Port Mapping";

  const answer = "docker run -p 8080:80 nginx";

  const question = html`
    <div class="mb-3">
      <p>
        Which Docker command runs an <strong>nginx</strong> container and maps
        <strong>container port 80</strong> to <strong>host port 8080</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}

