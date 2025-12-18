import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-docker-build";
  const title = "Build Docker Image";

  const answer = "docker build -t myapp .";

  const question = html`
    <div class="mb-3">
      <p>
        Which Docker command builds an image from the current directory
        and tags it as <code>myapp</code>?
      </p>
      <label for="${id}" class="form-label">Docker command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
