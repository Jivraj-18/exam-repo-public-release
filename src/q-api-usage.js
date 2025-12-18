import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-curl-json";
  const title = "Fetch JSON Using curl";

  const answer = "curl https://api.github.com";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>curl command</strong> fetches JSON data from
        the GitHub public API root endpoint?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
