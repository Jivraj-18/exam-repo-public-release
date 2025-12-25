import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vector-db";
  const title = "Vector Database Purpose";

  const answer = "semantic search";

  const question = html`
    <div class="mb-3">
      <p>
        Vector databases are mainly used to enable
        fast and scalable <strong>what type of search</strong>?
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}

