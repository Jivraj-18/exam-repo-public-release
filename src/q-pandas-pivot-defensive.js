import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pandas-pivot-defensive";
  const title = "Defensive Pivot Table with Invalid Values";

  const question = html`
    <div class="mb-3">
      <p>
        You are given a pandas DataFrame <code>df</code> with columns:
      </p>
      <ul>
        <li><code>city</code></li>
        <li><code>category</code></li>
        <li><code>sales</code></li>
      </ul>

      <p>
        The <code>sales</code> column may contain non-numeric strings (e.g. "NA", "unknown"),
        and some rows may have missing <code>city</code> values.
      </p>

      <p>
        Write a <strong>single pandas expression</strong> that:
      </p>
      <ol>
        <li>Converts <code>sales</code> to numeric, coercing errors</li>
        <li>Drops rows where <code>city</code> or <code>sales</code> is missing</li>
        <li>Creates a pivot table with:
          <ul>
            <li>Index = <code>city</code></li>
            <li>Columns = <code>category</code></li>
            <li>Values = sum of <code>sales</code></li>
          </ul>
        </li>
        <li>Replaces missing pivot values with <code>0</code></li>
      </ol>

      <p class="mt-2">
        <strong>Answer format:</strong> Enter only the pandas code (no imports).
      </p>

      <label for="${id}" class="form-label">Pandas code:</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="4"
        placeholder="df[...]"
      ></textarea>
    </div>
  `;

  const answer = null;

  return { id, title, weight, question, answer };
}
