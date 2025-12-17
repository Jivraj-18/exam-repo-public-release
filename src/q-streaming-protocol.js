import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-streaming-protocol";
  const title = "Real-time Data Streaming";
  const answer = "websocket";
  const question = html`
    <div class="mb-3">
      <p>
        You need to implement bi-directional, real-time communication between a browser
        and your server for a live dashboard. Which protocol provides full-duplex
        communication channels over a single TCP connection?
      </p>
      <label for="${id}" class="form-label">Protocol Name:</label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}"
        placeholder="Enter protocol name (lowercase)" 
      />
      <small class="form-text text-muted">
        Hint: This protocol enables persistent connections and is commonly used for chat apps.
      </small>
    </div>
  `;
  return { id, title, weight, question, answer };
}