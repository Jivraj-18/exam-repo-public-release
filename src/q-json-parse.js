import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-api-json";
    const title = "Basic REST API Endpoint";

    const answer = "https://api.github.com/users/octocat";

    const question = html`
    <div class="mb-3">
      <p>
        Which <strong>GitHub REST API URL</strong> returns public profile data
        for the user <strong>octocat</strong> in JSON format?
      </p>
      <label for="${id}" class="form-label">URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
