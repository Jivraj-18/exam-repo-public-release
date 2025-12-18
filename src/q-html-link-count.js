import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ weight = 1 }) {
  const id = "q-html-link-count";
  const title = "Count Links in HTML";

  const url = "https://sanand0.github.io/tdsdata/simple_page.html";

  const question = html`
    <h4>HTML Scraping Task</h4>
    <p>Visit the following page:</p>
    <code>${url}</code>
    <ol>
      <li>Count all <code>&lt;a&gt;</code> tags</li>
      <li>Return the total number</li>
    </ol>

    <input class="form-control" id="${id}" />
  `;

  const answer = async (output) => {
    if (!output.match(/^\d+$/)) {
      throw new Error("Output must be a single integer");
    }
    return true;
  };

  return { id, title, weight, question, answer };
}
