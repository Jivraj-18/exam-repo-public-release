import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-docker-push";
  const title = "Push Docker Image to Docker Hub";

  const answer = "docker push username/image:tag";

  const question = html`
    <div class="mb-3">
      <p>
        Which Docker command uploads a locally built image
        named <code>image:tag</code> to Docker Hub under your
        Docker Hub username?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
