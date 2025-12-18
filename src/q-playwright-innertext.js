import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-playwright-innertext";
  const title = "Playwright Text Extraction";

  const answer = "inner_text()";

  const question = html`
    <div class="mb-3">
      <p>
        In Playwright (Python), if you have located a table cell using <code>page.locator("td")</code>, 
        what <strong>method</strong> do you call to retrieve the visible text content inside that element? 
        (Include parentheses).
      </p>
      <label for="${id}" class="form-label">Method Name:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="method_name()" />
    </div>
  `;

  return { id, title, weight, question, answer };
}