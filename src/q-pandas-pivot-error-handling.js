import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pandas-pivot-error";
  const title = "Robust Pivot Table with Missing Data Handling";

  const question = html`
    <div class="mb-3">
      <p>
        You are given a CSV file <code>sales.csv</code> with the following columns:
      </p>
      <ul>
        <li><code>region</code></li>
        <li><code>product</code></li>
        <li><code>revenue</code></li>
        <li><code>date</code></li>
      </ul>

      <p>
        Some rows have <strong>missing values</strong> in <code>region</code> or
        <code>revenue</code>, and a few rows have <code>revenue</code> stored as strings.
      </p>

      <p>
        Write a <strong>single pandas statement</strong> that:
      </p>
      <ol>
        <li>Safely converts <code>revenue</code> to numeric, coercing errors</li>
        <li>Drops rows where <code>region</code> or <code>revenue</code> is missing</li>
        <li>Creates a pivot table with:
          <ul>
            <li>Rows = <code>region</code></li>
            <li>Columns = <code>product</code></li>
            <li>Values = <strong>total revenue</strong></li>
          </ul>
        </li>
        <li>Fills missing pivot values with <code>0</code></li>
      </ol>

      <p class="mt-2">
        <strong>Answer format:</strong>  
        Enter only the pandas code (no imports, no explanations).
      </p>

      <label for="${id}" class="form-label">Pandas statement:</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="4"
        placeholder="df[...]"
      ></textarea>
    </div>
  `;

  // No exact answer enforced — evaluator may check correctness manually or via function
  const answer = null;

  return { id, title, weight, question, answer };
}
