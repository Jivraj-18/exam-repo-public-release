import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function({ user, weight = 0.5 }) {
  const id = "q-importhtml-formula";
  const title = "Google Sheets IMPORTHTML";

  const answer = '=IMPORTHTML("https://example.com/table.html","table",1)';

  const question = html`
    <div class="mb-3">
      <p>
        Write a Google Sheets formula to import the <strong>first table</strong>
        from the following URL:
      </p>

      <pre><code>https://example.com/table.html</code></pre>

      <label class="form-label">Formula:</label>
      <input class="form-control" id="${id}" name="${id}" />
      <p class="text-muted">Enter the exact formula.</p>
    </div>
  `;

  return {
    id,
    title,
    weight,
    question,
    answer: (input) => input.replace(/\s+/g, "") === answer.replace(/\s+/g, ""),
  };
}
