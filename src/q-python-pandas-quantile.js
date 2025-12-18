import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-pandas-quantile";
  const title = "Python: Customer Segmentation";

  const answer = "quantile(0.9)";

  const question = html`
    <div class="mb-3">
      <p>
        Using a Pandas DataFrame <code>df</code> with a column <code>total_spend</code>, what method call would you use to find the 
        <strong>threshold value</strong> for the top 10% of spenders (the 90th percentile)?
      </p>
      <label for="${id}" class="form-label">Pandas Expression:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="df['column'].method(value)" />
    </div>
  `;

  return { id, title, weight, question, answer };
}