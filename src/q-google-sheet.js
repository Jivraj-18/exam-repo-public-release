import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-importxml-wiki";
  const title = "Import Wikipedia Headings";

  const answer = '=IMPORTXML("https://en.wikipedia.org/wiki/India","//h2/span[@class=\'mw-headline\']")';

  const question = html`
    <div class="mb-3">
      <p>
        Write a Google Sheets formula using <code>IMPORTXML</code> to extract all
        <strong>H2 section titles</strong> from the Wikipedia page of India.
      </p>
      <label for="${id}" class="form-label">Formula:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
