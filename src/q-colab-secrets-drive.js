// File: src/q-colab-secrets-drive.js
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-colab-secrets-drive";
  const title = "Harden a Colab Secrets + Drive Workflow";

  const answer =
    "WXYZ-042";

  const question = html`
    <div class="mb-3">
      <p>
        In Google Colab, mount Drive at <code>/content/drive</code>, read the secret using
        <code>userdata.get("GA2_API_KEY")</code>, and compute:
        <code>{token[-4:].upper()}-{total:03d}</code>
        where <code>total</code> is the sum of failures for rows where <code>failures/requests &ge; 0.02</code>.
        What verification code prints?
      </p>
      <label for="${id}" class="form-label">Verification code:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
