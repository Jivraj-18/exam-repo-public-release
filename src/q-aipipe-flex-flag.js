// q-aipipe-flex-flag.js
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-aipipe-flex-flag";
  const title = "AI Pipe: Flex Processing Flag";

  const answer = '"service_tier":"flex"';

  const question = html`
    <div class="mb-3">
      <p>
        In AI Pipe, you can request <strong>Flex processing</strong> (cheaper but slower).
        What is the exact JSON fragment (no spaces) you add to the request body to enable it?
      </p>
      <label for="${id}" class="form-label">JSON fragment:</label>
      <input class="form-control" id="${id}" name="${id}" />
      <div class="form-text">
        Include the quotes, colon, and value exactly. No surrounding braces.
      </div>
    </div>
  `;

  return { id, title, weight, question, answer };
}
