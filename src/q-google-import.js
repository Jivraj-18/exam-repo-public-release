import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-google-import";
    const title = "Google Sheets Web Import";

    const answer = "IMPORTHTML";

    const question = html`
    <div class="mb-3">
      <p>
        Which Google Sheets function is used to
        <strong>import tables or lists directly from a web page</strong>
        using a URL?
      </p>
      <label for="${id}" class="form-label">Function name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
