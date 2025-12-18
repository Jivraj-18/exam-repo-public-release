import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-playwright-innertext";
  const title = "Playwright Data Extraction";

  const answer = "inner_text()";

  const question = html`
    <div class="mb-3">
      <p>
        In Playwright (Python), after using <code>page.query_selector(".price")</code> 
         to find an element, which method is used to extract the 
         <strong>visible text</strong> from that element?
      </p>
      <label for="${id}" class="form-label">Method Name:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="method_name()" />
    </div>
  `;

  return { id, title, weight, question, answer };
}