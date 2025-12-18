import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js"; 

export default async function({ user, weight = 1 }) {
  const id = "q-llm-streaming";
  const title = "LLM Streaming Request Payload";

  const question = html`
    <div class="mb-3">
      <p>Create a JSON payload suitable for a streaming LLM request:</p>
      <ul>
        <li>Must include <code>model</code></li>
        <li>Must include <code>messages</code> array with at least one message</li>
        <li>Must include a <code>stream</code> boolean set to <code>true</code></li>
      </ul>

      <label class="form-label">Enter your JSON payload:</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="6"></textarea>
    </div>
  `;

  const answer = (userAnswer) => {
    try {
      const payload = JSON.parse(userAnswer);
      return typeof payload.model === "string" &&
             Array.isArray(payload.messages) &&
             payload.messages.length > 0 &&
             typeof payload.stream === "boolean" &&
             payload.stream === true;
    } catch {
      return false;
    }
  };

  return { id, title, weight, question, answer };
};
