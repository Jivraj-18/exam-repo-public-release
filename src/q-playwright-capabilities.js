import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-playwright-feature";
  const title = "Playwright Feature";

  const answer = "JavaScript rendering";

  const question = html`
    <div class="mb-3">
      <p>
        Unlike simple libraries like <code>requests</code>, what is the 
        primary feature of Playwright that allows it to scrape content 
        from sites where data is loaded dynamically via scripts?
      </p>
      <label for="${id}" class="form-label">Feature:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="Two words" />
    </div>
  `;

  return { id, title, weight, question, answer };
}