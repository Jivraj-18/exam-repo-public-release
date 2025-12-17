import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q_vision_shipping";
  const title = "Vision Model: Shipping Label";

  const answer = `"model": "gpt-4o-mini"`; // Anchor

  const question = html`
    <div class="mb-3">
      <p><b>Vision: Extract Shipping Label Text</b></p>

      <p>Write the JSON body for:</p>
      <ul>
        <li><code>model: gpt-4o-mini</code></li>
        <li>One user message with:</li>
        <ul>
          <li>
            <b>Text:</b> "Extract all text from this shipping label image."
          </li>
          <li><b>Image URL:</b> data URL base64</li>
        </ul>
        <li><code>"detail": "low"</code></li>
      </ul>

      <label for=${id} class="form-label">Enter JSON body:</label>
      <textarea class="form-control" id=${id} name=${id} rows="16"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
