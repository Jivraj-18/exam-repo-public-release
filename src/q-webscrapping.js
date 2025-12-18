import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-web-import";
  const title = "Excel Web Import";

  const answer = "Get Data from Web";

  const question = html`
    <div class="mb-3">
      <p>
        In Microsoft Excel, which feature allows you to
        <strong>import tables directly from a URL</strong>?
      </p>
      <label for="${id}" class="form-label">Feature name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
