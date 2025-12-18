import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-zscore-anomaly";
  const title = "Z-Score Anomaly Detection";
  const answer = "1";

  const question = html`
    <div class="mb-3">
      <p>
        You are analyzing throughput logs for a production system.
        Sudden spikes may indicate anomalies that require investigation.
      </p>

      <p>
        Given the following throughput values:
      </p>

      <pre>[85, 92, 88, 210, 90, 87, 95]</pre>

      <p>
        An anomaly is defined as a value whose absolute z-score is
        <strong>greater than 2.5</strong>.
      </p>

      <ul>
        <li>Compute the mean and standard deviation of the series</li>
        <li>Compute the z-score for each value</li>
        <li>Count how many values are anomalies</li>
      </ul>

      <p>
        Enter the <strong>number of anomalies</strong>.
      </p>

      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
