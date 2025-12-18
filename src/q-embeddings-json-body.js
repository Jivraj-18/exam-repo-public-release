import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-embeddings-json-body";
  const title = "OpenAI Embeddings JSON";

  const answer = `{
  "model": "text-embedding-3-small",
  "input": [
    "Dear user, please verify your transaction code 32025 sent to your registered email.",
    "Dear user, please verify your transaction code 94309 sent to your registered email."
  ]
}`;

  const question = html`
    <div class="mb-3">
      <p>
        SafePay Wallet converts transactional notification texts into embeddings
        using OpenAI's <code>text-embedding-3-small</code> model. These vectors
        feed into a downstream anomaly detector.
      </p>
      <p>
        For two verification messages:
      </p>
      <ul>
        <li><code>Dear user, please verify your transaction code 32025 sent to your registered email.</code></li>
        <li><code>Dear user, please verify your transaction code 94309 sent to your registered email.</code></li>
      </ul>
      <p>
        Write the exact <strong>JSON body</strong> for a POST request to
        <code>https://api.openai.com/v1/embeddings</code> that:
      </p>
      <ul>
        <li>Uses <code>model</code> = <code>text-embedding-3-small</code>.</li>
        <li>Sends both messages together using the <code>input</code> field.</li>
        <li>Keeps the messages exactly as written above.</li>
      </ul>
      <label for="${id}" class="form-label">JSON body:</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="8"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
