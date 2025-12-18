import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-bs-findall";
  const title = "BeautifulSoup Tag Extraction";

  const answer = "find_all";

  const question = html`
    <div class="mb-3">
      <p>
        Which BeautifulSoup method is used to retrieve
        all matching HTML elements for a given tag?
      </p>
      <label for="${id}" class="form-label">Method name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
