import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-web-crawler";
    const title = "Website Crawling Tool";

    const answer = "wget";

    const question = html`
    <div class="mb-3">
      <p>
        Which command-line tool is widely used to
        <strong>recursively download entire websites</strong>
        for offline analysis?
      </p>
      <label for="${id}" class="form-label">Tool name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
