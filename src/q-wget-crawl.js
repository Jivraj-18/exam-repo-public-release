import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wget-crawl";
  const title = "Web Crawling with wget";

  const answer = "wget --recursive --level=2 --no-parent --convert-links https://example.com";

  const question = html`
    <div class="mb-3">
      <p>
        Write a wget command to recursively crawl a website at 
        <code>https://example.com</code> with the following requirements:
        <ul>
          <li>Recursive download to depth 2</li>
          <li>Don't go to parent directories</li>
          <li>Convert links for local viewing</li>
        </ul>
      </p>
      <label for="${id}" class="form-label">wget command:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="wget ..." />
    </div>
  `;

  return { id, title, weight, question, answer };
}