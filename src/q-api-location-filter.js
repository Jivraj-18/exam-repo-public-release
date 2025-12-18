import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-location-filter";
  const title = "GitHub API Location Filter";

  const answer = "location:";

  const question = html`
    <div class="mb-3">
      <p>
        When searching users using the GitHub API,
        which query filter is used to restrict results
        to a specific city or place?
      </p>
      <label for="${id}" class="form-label">Filter:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
