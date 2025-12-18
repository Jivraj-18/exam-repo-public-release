import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-dbt-incremental";
  const title = "dbt: Materialization Strategy";

  const answer = "incremental";

  const question = html`
    <div class="mb-3">
      <p>
        You are building a dbt model for a massive event log table. To optimize
        performance, you only want to process new or changed records rather than
        rebuilding the whole table every run.
      </p>
      <p>
        Which <strong>materialization</strong> strategy should you configure in
        your model?
      </p>
      <label for="${id}" class="form-label">Materialization Type:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
