import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-data-story";
  const title = "LLM Data Storytelling Goal";

  const answer = "insights";

  const question = html`
    <div class="mb-3">
      <p>
        In data storytelling with LLMs, the primary goal is to transform raw
        analysis into clear, actionable __________ for decision-makers.
      </p>
      <label for="${id}" class="form-label">One word answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
