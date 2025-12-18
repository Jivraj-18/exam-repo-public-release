import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default function ({ user, weight }) {
  const id = "q-llm-price";
  const title = "LLM API Cost";
  const rng = seedrandom(user.email + id);

  const inputTokens = Math.floor(rng() * 1000000) + 500000;
  const outputTokens = Math.floor(rng() * 500000) + 100000;

  const inputRate = 0.50; // $0.50 per 1M
  const outputRate = 1.50; // $1.50 per 1M

  const cost = (inputTokens / 1000000 * inputRate) + (outputTokens / 1000000 * outputRate);

  const question = html`
    <div>
      <h3>${title}</h3>
      <p>Calculate the total cost for an LLM API job with the following usage and pricing:</p>
      <ul>
        <li><strong>Input Tokens:</strong> ${inputTokens.toLocaleString()}</li>
        <li><strong>Output Tokens:</strong> ${outputTokens.toLocaleString()}</li>
        <li><strong>Pricing:</strong> $${inputRate.toFixed(2)} / 1M input tokens, $${outputRate.toFixed(2)} / 1M output tokens</li>
      </ul>
      <p>Round your answer to <strong>2 decimal places</strong> (e.g. 1.25).</p>
      <label>Total Cost ($):</label>
      <input type="number" step="0.01" name="answer" />
    </div>
  `;

  return {
    id,
    title,
    weight,
    question,
    answer: (answer) => Math.abs(parseFloat(answer) - cost) < 0.01,
  };
}
