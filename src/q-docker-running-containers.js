import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-docker-running-containers";
  const title = "Docker Running Containers";
  const answer = "docker ps";

  const question = html`
    <div class="mb-3">
      <p>
        Which Docker command lists <strong>only running containers</strong>?
      </p>
      <p class="text-muted">
        Do not include flags.
      </p>
    </div>
  `;

  return { id, title, question, answer, weight };
}
