import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-pager";
  const title = "View File Page by Page";

  const answer = "less";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command allows you to
        <strong>view the contents of a file one page at a time</strong>
        and scroll both forward and backward?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
