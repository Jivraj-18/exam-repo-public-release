import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vibe-github-api";
  const title = "Vibe Code — GitHub API App";

  const answer = "GitHub REST API";

  const question = html`
    <div class="mb-3">
      <p>
        While building a Vibe Code application that fetches repository data,
        which API is most appropriate for accessing GitHub resources?
      </p>

      <label for="${id}-a" class="form-label">
        <input type="radio" id="${id}-a" name="${id}" />
        GitHub REST API
      </label><br />

      <label for="${id}-b" class="form-label">
        <input type="radio" id="${id}-b" name="${id}" />
        Twitter API
      </label><br />

      <label for="${id}-c" class="form-label">
        <input type="radio" id="${id}-c" name="${id}" />
        Google Maps API
      </label>
    </div>
  `;

  return { id, title, question, answer, weight };
}
