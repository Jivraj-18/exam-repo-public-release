import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-sentiment";
  const title = "LLM Sentiment Classification";

  const answer = "gpt-4o-mini";

  const question = html`
    <div class="mb-3">
      <p>
        Which OpenAI model is explicitly recommended in the course material
        for basic <strong>sentiment analysis</strong> and low-cost experimentation?
      </p>
      <label for="${id}" class="form-label">Model name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
