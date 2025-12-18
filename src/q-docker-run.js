import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-docker-run";
  const title = "Docker Run Command";

  const answer = "docker run -d -p 8080:80 nginx";

  const question = html`
    <div class="mb-3">
      <p>
        Write a Docker command to run an <code>nginx</code> container in
        <strong>detached mode</strong>, mapping host port <code>8080</code>
        to container port <code>80</code>.
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
