import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-time-series-window";
  const title = "Aggregation Windows in Time-Series Data";

  const question = html`
    <div class="mb-3">
      <h4>Time-Series Analysis for User Activity</h4>

      <p>
        Time-series data often contains short-term noise that makes trend analysis difficult.
        Aggregation windows are used to smooth fluctuations while preserving important seasonal
        patterns.
      </p>

      <p>
        <strong>Business Context:</strong> A product analytics team studies daily user activity logs.
        The business wants smoother trends without losing daily or weekly seasonality.
      </p>

      <p>
        <strong>Question:</strong> Which aggregation window technique is most appropriate in this case?
      </p>

      <input class="form-control" id="${id}" name="${id}" type="text" />
    </div>
  `;

  const answer = async (response) => {
    const text = String(response || "").toLowerCase();
    if (!text.includes("rolling") && !text.includes("window")) {
      throw new Error("Answer should mention a rolling or window-based aggregation");
    }
    return true;
  };

  return { id, title, weight, question, answer };
}
