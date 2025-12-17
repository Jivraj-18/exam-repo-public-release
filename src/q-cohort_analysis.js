import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-pivot";
  const title = "Python: Pandas Pivot Table";

  const answer = "pivot_table";

  const question = html`
    <div class="mb-3">
      <p>
        In Pandas, which method is commonly used to create a
        <strong>cohort retention matrix</strong>
        with signup month as rows and month offset as columns?
      </p>
      <label for="${id}" class="form-label">Method name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
