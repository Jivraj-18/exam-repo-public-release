import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-docker-run-apt";
  const title = "Docker RUN Apt Install";

  const answer = "RUN apt-get update && apt-get install -y curl";

  const question = html`
    <div class="mb-3">
      <p>
        Write a valid Dockerfile <code>RUN</code> instruction to
        <strong>install curl</strong> using <code>apt-get</code>.
      </p>
      <label for="${id}" class="form-label">RUN instruction:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}