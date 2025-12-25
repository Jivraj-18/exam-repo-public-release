import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-seasonal-index";
  const title = "Excel: Seasonal Demand Index Calculation";

  // Expected answer format: month name (e.g., "July")
  const answer = "Month name (e.g., July)";

  const question = html`
    <div class="mb-3">
      <p>
        A retail chain provides monthly sales for 36 months. In Excel, compute a
        centered moving-average seasonal index for each calendar month
        (Jan–Dec), then normalize the indices so the average across all 12
        months = 1.
      </p>

      <p><strong>Deliverables</strong></p>
      <ol>
        <li>Use a 12-month centered moving average to estimate trend.</li>
        <li>Divide actual month value by trend to get raw seasonal ratios.</li>
        <li>
          Average across same-calendar months and normalize so annual mean = 1.
        </li>
      </ol>

      <p>
        Which <strong>month</strong> has the highest seasonal index
        (normalized)? Enter the month name (you may optionally suffix with
        "Month" or "Region").
      </p>

      <label for="${id}" class="form-label">Month name:</label>
      <input class="form-control" id="${id}" name="${id}" />
      <small class="form-text text-muted">
        Example answer format: <code>July</code>
      </small>
    </div>
  `;

  return { id, title, weight, question, answer };
}
