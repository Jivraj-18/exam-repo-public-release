import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-datasette-hotspot";
  const title = "Datasette: Filtered Growth Hotspot";

  // Expected answer format: Region name (e.g., "Central")
  const answer = "Region name (e.g., Central)";

  const question = html`
    <div class="mb-3">
      <p>
        You have a Datasette-ready SQLite with tables <code>page_views</code>,
        <code>sales</code>, and <code>region</code>. Use facets/filters in
        Datasette to find regions where:
      </p>

      <ol>
        <li><code>page_views &gt; 10000</code></li>
        <li>
          <code>sales_conversion_rate</code> &gt; industry average (compute
          conversion as sales / page_views)
        </li>
      </ol>

      <p>
        Which <strong>region</strong> satisfies both conditions and has the
        highest <code>sales_conversion_rate</code> among them?
      </p>

      <label for="${id}" class="form-label">Region name:</label>
      <input class="form-control" id="${id}" name="${id}" />
      <small class="form-text text-muted">
        Example answer format: <code>Central</code>
      </small>
    </div>
  `;

  return { id, title, weight, question, answer };
}
