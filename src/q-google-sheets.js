import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gs-importhtml-formula";
  const title = "Google Sheets: IMPORTHTML Formula";

  const answer = '=IMPORTHTML("https://example.com","table",1)';

  const question = html`
    <div class="mb-3">
      <p><strong>Question name:</strong> ${title}</p>
      <p>
        Write a valid Google Sheets formula that imports the <strong>first table</strong>
        from <code>https://example.com</code> using <code>IMPORTHTML</code>.
      </p>
      <p class="text-muted mb-1">
        Use exactly: URL = <code>https://example.com</code>, query = <code>"table"</code>, index = <code>1</code>.
      </p>
      <label for="${id}" class="form-label">Formula:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
