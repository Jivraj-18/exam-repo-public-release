import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wget-robots";
  const title = "CLI Crawling Ethics";

  const answer = "-e robots=off";

  const question = html`
    <div class="mb-3">
      <p>
        When using <code>wget</code> to crawl a site for research purposes, which command-line 
        flag/option is used to <strong>ignore or bypass</strong> the <code>robots.txt</code> 
        restrictions of the target server?
      </p>
      <label for="${id}" class="form-label">Flag:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="-e robots=..." />
    </div>
  `;

  return { id, title, weight, question, answer };
}