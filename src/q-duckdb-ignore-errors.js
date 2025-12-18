import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-ignore-errors";
  const title = "Load Corrupted CSV Safely";

  const answer = "ignore_errors";

  const question = html`
    <div class="mb-3">
      <p>
        When loading a malformed CSV file in DuckDB using
        <code>read_csv_auto()</code>, which option allows the query to
        <strong>skip bad rows instead of failing</strong>?
      </p>
      <label for="${id}" class="form-label">Option name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
