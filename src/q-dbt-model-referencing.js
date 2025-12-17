import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-dbt-ref";
  const title = "dbt: Referencing Models";

  const answer = "ref";

  const question = html`
    <div class="mb-3">
      <p>
        When building the "Operations performance mart" in dbt, you are instructed to build 
        on top of upstream staging tables (like <code>stg_shipments</code>). 
      </p>
      <p>
        According to the instructions and the "dbt Fundamentals" section, which Jinja function 
        must you use to reference these other models to ensure dependencies are tracked correctly?
      </p>
      <div class="code-snippet" style="background: #f4f4f4; padding: 10px; margin-bottom: 10px; font-family: monospace;">
        select * from {{ <input style="width: 80px; display: inline-block;" class="form-control form-control-sm" id="${id}" name="${id}" />('stg_shipments') }}
      </div>
      <label for="${id}" class="form-label">Function name only:</label>
    </div>
  `;

  return { id, title, weight, question, answer };
}