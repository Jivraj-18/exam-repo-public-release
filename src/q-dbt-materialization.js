import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-dbt-materialization";
  const title = "dbt Model Materialization";

  // Expected exact answer
  const answer = "view";

  const question = html`
    <div class="mb-3">
      <p>
        In <strong>dbt</strong>, models can be materialized in different ways
        such as <code>view</code>, <code>table</code>, and <code>incremental</code>.
      </p>
      <p>
        Which materialization is used by default when you create a new dbt model
        and do not specify any configuration?
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
