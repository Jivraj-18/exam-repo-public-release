import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wget-robots-override";
  const title = "Robots.txt Override in Web Crawling";

  const answer = "-e robots=off";

  const question = html`
    <div class="mb-3">
      <p>
        When using <strong>wget</strong> for web crawling, websites may restrict
        access to certain paths using a <code>robots.txt</code> file.
      </p>
      <p>
        Which wget option explicitly tells the crawler to
        <strong>ignore robots.txt rules</strong>?
      </p>
      <p class="text-muted">
        Answer with the exact command-line flag.
      </p>
      <label for="${id}" class="form-label">wget option:</label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        placeholder="Enter flag"
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}
