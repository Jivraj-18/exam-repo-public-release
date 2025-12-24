import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.5 }) {
  const id = "q-rate-limit";
  const title = "API Rate Limiting Strategy";
  const answer = "429";
  const question = html`
    <div class="mb-3">
      <p>
        Your FastAPI endpoint receives too many requests from a single client.
        What HTTP status code should you return to indicate rate limit exceeded?
      </p>
      <label for="${id}" class="form-label">HTTP Status Code:</label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}"
        type="number"
        placeholder="Enter 3-digit status code" 
      />
      <small class="form-text text-muted">
        This status code specifically indicates "Too Many Requests".
      </small>
    </div>
  `;
  return { id, title, weight, question, answer };
}