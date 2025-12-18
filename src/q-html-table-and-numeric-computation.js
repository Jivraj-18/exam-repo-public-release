import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-html-table-average";
  const title = "HTML Table Average";

  const answer = "67.4";

  const question = html`
    <div class="mb-3">
      <p>
        Fetch the HTML table from:
        <code>https://sanand0.github.io/tdsdata/html_table/9.html</code>
      </p>
      <p>
        Perform the following steps:
      </p>
      <ol>
        <li>Extract all numeric values from the table</li>
        <li>Ignore values less than <strong>50</strong></li>
        <li>Compute the <strong>average</strong></li>
      </ol>
      <p>
        Round the answer to <strong>1 decimal place</strong>.
      </p>
      <label for="${id}" class="form-label">Average value:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
