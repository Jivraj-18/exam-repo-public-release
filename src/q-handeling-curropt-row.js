import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-ignore-errors";
  const title = "DuckDB: Corrupted CSV Handling";

  const answer = "ignore_errors=true";

  const question = html`
    <div class="mb-3">
      <p>
        You are loading a CSV file into DuckDB that contains malformed rows
        and unescaped quotes.
      </p>
      <p>
        Which option allows DuckDB to <strong>skip invalid rows</strong>
        while still loading all valid records?
      </p>
      <label for="${id}" class="form-label">CSV option:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
