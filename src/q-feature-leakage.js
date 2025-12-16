import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-feature-leakage";
  const title = "Detecting Feature Leakage in Machine Learning";

  const question = html`
    <div class="mb-3">
      <h4>Model Evaluation and Reliability</h4>

      <p>
        Machine learning models may sometimes show extremely high validation accuracy but fail
        badly when deployed to real users.
      </p>

      <p>
        <strong>Business Context:</strong> A fraud detection model performs exceptionally well during
        offline testing but produces poor results in production.
      </p>

      <p>
        <strong>Question:</strong> Name one data-related issue that commonly causes this problem.
      </p>

      <input class="form-control" id="${id}" name="${id}" type="text" />
    </div>
  `;

  const answer = async (response) => {
    const text = String(response || "").toLowerCase();
    if (!text.includes("leak")) {
      throw new Error("Answer should mention feature leakage or data leakage");
    }
    return true;
  };

  return { id, title, weight, question, answer };
}
