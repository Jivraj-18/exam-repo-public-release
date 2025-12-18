import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function () {
  const id = "q-duckdb-date-window";
  const title = "DuckDB: Date filtering";

  const expected = "between";

  const answer = async () => {
    const v = document.getElementById(id).value.trim().toLowerCase();
    if (v !== expected) throw new Error("Incorrect keyword");
    return true;
  };

  const question = html`
    <p>
      Which SQL keyword filters rows within a date range?
    </p>
    <input id="${id}" class="form-control" />
  `;

  return { id, title, weight: 1, question, answer };
}
