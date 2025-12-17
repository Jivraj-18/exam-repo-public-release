import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-ga4-token-count";
  const title = "Token Count Verification";

  const answer = "make the request";

  const question = html`
    <div class="mb-3">
      <p>
        According to the GA4 token cost question,
        to accurately determine the number of input tokens used by a prompt,
        what must you explicitly do?
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
