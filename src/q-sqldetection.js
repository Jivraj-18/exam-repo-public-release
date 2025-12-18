import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-window";
  const title = "SQL: Detecting Activation Spikes";

  const answer = "0.29";

  const question = html`
    <div class="mb-3">
      <p>
        You computed a <strong>7-day trailing average</strong> of daily activations
        using a SQL window function:
      </p>
      <pre><code>AVG(activations) OVER (
  PARTITION BY region
  ORDER BY date
  ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING
)</code></pre>
      <p>
        What is the <strong>maximum positive lift</strong> observed for the
        <code>EMEA</code> region?
      </p>
      <label for="${id}" class="form-label">Lift value:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
