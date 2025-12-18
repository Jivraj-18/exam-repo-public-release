import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-service-outliers";
  const title = "Identifying Extreme Performance Gaps";
  const answer = "Z-score";
  const question = html`
    <div class="mb-3">
      <p>A regional manager at a logistics firm notices that a few warehouses have significantly higher delivery delay times than the average. To identify warehouses that are "statistically extreme" (more than 3 standard deviations from the mean) for a corrective audit, which standardized statistical metric should they calculate in Excel?</p>
      <label for="${id}" class="form-label">Statistical Metric:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. Variance" />
    </div>
  `;

  return { id, title, weight, question, answer };
}