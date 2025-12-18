import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ url, weight = 2 }) {
  const id = "q-json-evil";
  const title = "The Silent Promise Bug";

  const answer = "await";

  const question = html`
    <div class="mb-3">
      <p>
        Your function fetches JSON,
        maps <code>data[].number</code>,
        and even calls <code>reduce()</code>.
        <br /><br />
        The code runs.
        No errors.
        But the result is always
        <strong>a Promise instead of a number</strong>.
        <br /><br />
        Which single missing keyword causes this
        psychological damage?
      </p>
      <label for="${id}" class="form-label">Keyword:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
