import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-spreadsheet-drift";
  const title = "Spreadsheet Scraping with Temporal Drift Detection";

  const question = html`
    <div class="mb-3">
      <p>
        A government website updates tabular data daily. Older rows may be corrected.
      </p>

      <p>
        URL:
        <a href="https://sanand0.github.io/tdsdata/drift/prices.html" target="_blank">
          prices.html
        </a>
      </p>

      <p><strong>Tasks (Google Sheets):</strong></p>
      <ol>
        <li>Import the table using <code>IMPORTHTML</code></li>
        <li>Copy values into a second sheet (freeze snapshot)</li>
        <li>Refresh the original import</li>
        <li>Count rows whose values changed</li>
      </ol>

      <p class="text-muted">
        Ignore newly added rows. Compare only matching row indices.
      </p>

      <label for="${id}" class="form-label">
        Number of modified rows
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

  const answer = (input) => {
    const n = Number(input);
    if (!Number.isInteger(n) || n < 0) {
      throw new Error("Answer must be a non-negative integer");
    }
    return true;
  };

  return { id, title, weight, question, answer };
}
