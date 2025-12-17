import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-llm-sentiment-role";
    const title = "LLM Sentiment – Message Roles";

    const answer = "system";

    const question = html`
    <div class="mb-3">
      <p>
        In an OpenAI <code>chat/completions</code> request used for sentiment analysis,
        which message role should contain the instruction
        <em>“Classify the sentiment as GOOD, BAD, or NEUTRAL”</em>
        to ensure consistent behavior across inputs?
      </p>
      <label for="${id}" class="form-label">Role name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
