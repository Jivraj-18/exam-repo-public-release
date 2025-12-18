import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-importhtml-advanced";
  const title = "Advanced Google Sheets IMPORTHTML";

  const answer =
    '=INDEX(IMPORTHTML("https://example.com/page.html", "table", 2), 2, 3)';

  const question = html`
    <div class="mb-3">
      <p>
        You are importing data from a web page into Google Sheets.
        The page contains multiple tables.
      </p>
      <p>
        Which Google Sheets formula imports the <strong>second table</strong>
        from <code>https://example.com/page.html</code> and returns the value
        from the <strong>second row and third column</strong> of that table?
      </p>
      <label for="${id}" class="form-label">Formula:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
