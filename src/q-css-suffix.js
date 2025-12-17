import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-css-suffix";
  const title = "CSS Attribute Suffix Selector";

  const answer = "a[href$='.pdf']";

  const question = html`
    <div class="mb-3">
      <p>
        You are scraping a website and want to select all anchor tags (<code>&lt;a&gt;</code>) 
        that link to PDF files.
      </p>
      <p>
        Write the CSS selector that targets all <code>a</code> elements where the 
        <code>href</code> attribute <strong>ends with</strong> the string <code>.pdf</code>.
      </p>
      <label for="${id}" class="form-label">CSS Selector:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. div.class" />
    </div>
  `;

  return { id, title, weight, question, answer };
}