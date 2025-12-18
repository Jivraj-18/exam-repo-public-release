import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-docker-run-port";
  const title = "Docker Port Mapping";

  const answer = "docker run -p 8080:80 nginx";

  const question = html`
    <div class="mb-3">
      <p>
        Which Docker command runs an <code>nginx</code> container and 
        <strong>maps port 8080 on the host to port 80 in the container</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
