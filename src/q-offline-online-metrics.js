import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-offline-online-metrics";
  const title = "Offline vs Online Model Evaluation";

  const question = html`
    <div class="mb-3">
      <h4>Evaluating Deployed Machine Learning Models</h4>

      <p>
        Offline metrics such as accuracy or RMSE may not always reflect real user behavior once a
        model is deployed.
      </p>

      <p>
        <strong>Business Context:</strong> A recommendation system shows strong offline performance
        but leads to reduced user engagement after deployment.
      </p>

      <p>
        <strong>Question:</strong> Name one online evaluation method that should be used instead.
      </p>

      <input class="form-control" id="${id}" name="${id}" type="text" />
    </div>
  `;

  const answer = async (response) => {
    const text = String(response || "").toLowerCase();
    if (!text.includes("a/b") && !text.includes("experiment")) {
      throw new Error("Answer should mention A/B testing or online experimentation");
    }
    return true;
  };

  return { id, title, weight, question, answer };
}
