import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-llm-token-cost";
    const title = "LLM Token Cost";

    const random = seedrandom(`${user.email}#${id}`);
    const tokens = Math.floor(random() * 50000) + 1000;
    const pricePerMillion = (Math.random() * 10 + 0.5).toFixed(2); // 0.50 to 10.50

    // Cost calculation
    const cost = (tokens / 1000000) * parseFloat(pricePerMillion);
    const answer = cost.toFixed(6); // Precision might be tricky, checking exact string might fail if user rounds differently.

    // Let's use a simpler price to avoid floating point issues or precise string matching issues.
    // Integer tokens (1M, 2M) and Integer price.
    const niceTokens = (Math.floor(random() * 10) + 1) * 1000000;
    const nicePrice = Math.floor(random() * 20) + 1;
    const costSimple = (niceTokens / 1000000) * nicePrice;

    const question = html`
    <div class="mb-3">
      <p>If an LLM API charges <strong>$${nicePrice}</strong> per 1 million input tokens, what is the cost for processing <strong>${niceTokens.toLocaleString()}</strong> tokens?</p>
      <p>Enter the number (e.g. <code>10.5</code>).</p>
      
      <label for="${id}" class="form-label">Answer ($)</label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

    return { id, title, weight, question, answer: costSimple.toString() };
}
