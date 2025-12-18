import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pandas-readhtml";
  const title = "Pandas HTML Table Reading";

  const answer = "pd.read_html";

  const question = html`
    <div class="mb-3">
      <p>
        What pandas function can directly read HTML tables from a URL or
        HTML string and return them as a list of DataFrames?
      </p>
      <p>
        Example: <code>tables = ______("https://example.com")</code>
      </p>
      <label for="${id}" class="form-label">Function name (include pd. prefix):</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="pd...." />
      <small class="form-text text-muted">
        Hint: This function parses all &lt;table&gt; elements in the HTML
      </small>
    </div>
  `;

  return { id, title, weight, question, answer };
}