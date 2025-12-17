import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-search";
  const title = "GitHub User Search Query";

  const answer = "location:Berlin followers:>100";

  const question = html`
    <div class="mb-3">
      <p>
        What GitHub search query finds users located in <strong>Berlin</strong>
        with <strong>more than 100 followers</strong>?
      </p>
      <label for="${id}" class="form-label">Search query:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
