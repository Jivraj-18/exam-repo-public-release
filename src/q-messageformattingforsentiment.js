import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sentiment-system-role";
  const title = "Sentiment Analysis Prompt Structure";

  const answer = "system";

  const question = html`
    <div class="mb-3">
      <p>
        In the sentiment-analysis test harness, which <strong>message role</strong>
        must explicitly instruct the LLM to classify text as
        <strong>GOOD, BAD, or NEUTRAL</strong>?
      </p>
      <label for="${id}" class="form-label">Message role:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
