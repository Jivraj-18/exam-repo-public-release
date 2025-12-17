import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-ga4-sentiment-role";
  const title = "Sentiment Analysis Message Roles";

  const answer = "system";

  const question = html`
    <div class="mb-3">
      <p>
        In the GA4 sentiment analysis task using <code>gpt-4o-mini</code>,
        which message <strong>role</strong> must be used for the instruction
        that asks the model to classify text as
        <strong>GOOD, BAD, or NEUTRAL</strong>?
      </p>
      <label for="${id}" class="form-label">Role:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
