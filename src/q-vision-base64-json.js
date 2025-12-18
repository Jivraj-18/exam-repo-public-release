import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vision-base64-json";
  const title = "Vision API with Base64 Image";

  const answer = `{
  "model": "gpt-4o-mini",
  "messages": [
    {
      "role": "user",
      "content": [
        { "type": "text", "text": "Extract all visible text from this invoice image." },
        {
          "type": "image_url",
          "image_url": {
            "url": "data:image/png;base64,REPLACE_WITH_EXACT_BASE64_STRING",
            "detail": "low"
          }
        }
      ]
    }
  ]
}`;

  const question = html`
    <div class="mb-3">
      <p>
        InvoiceFlow Systems is building an invoice reader that sends scanned
        invoices to <code>gpt-4o-mini</code> using the vision-enabled chat API.
        Each request must contain both a text instruction and a base64-encoded
        invoice image in a single user message.
      </p>
      <p>
        Write the <strong>JSON body only</strong> for a POST request to
        <code>https://api.openai.com/v1/chat/completions</code> that:
      </p>
      <ul>
        <li>Uses the model <code>gpt-4o-mini</code>.</li>
        <li>
          Sends one <strong>user</strong> message whose <code>content</code> is an array
          with:
          <ol>
            <li>A text item: <code>Extract all visible text from this invoice image.</code></li>
            <li>
              An <code>image_url</code> item with a
              <code>url</code> field set to a data URL:
              <code>data:image/png;base64,REPLACE_WITH_EXACT_BASE64_STRING</code>.
            </li>
          </ol>
        </li>
        <li>Sets <code>"detail": "low"</code> on the image content.</li>
      </ul>
      <p>Do not alter the base64 prefix or placeholder string.</p>
      <label for="${id}" class="form-label">JSON body:</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="10"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
