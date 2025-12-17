import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-llm-vision-detail";
    const title = "LLM Vision – Cost Optimisation";

    const answer = "low";

    const question = html`
    <div class="mb-3">
      <p>
        In OpenAI Vision API requests, the <code>detail</code> parameter
        controls how many visual tokens are consumed.
      </p>
      <p>
        Which value should be used when you only need coarse information
        (e.g., detecting presence of objects) and want to minimize cost?
      </p>
      <label for="${id}" class="form-label">detail value:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
