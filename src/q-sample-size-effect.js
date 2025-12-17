
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.5 }) {
  const id = "q-sample-size-effect";
  const title = "Sample Size Effect on Standard Error";

  const answer = "2";

  const question = html`
    <div class="mb-3">
      <p>
        A population has standard deviation σ = 20.
        What is the standard error of the mean when sample size n = 100?
      </p>
      <label for="${id}" class="form-label">Standard error:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}