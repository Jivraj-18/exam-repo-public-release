import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wget-recursive";
  const title = "wget Recursive Crawling";

  const answer = "--recursive";

  const question = html`
    <div class="mb-3">
      <p>
        What wget option enables downloading linked pages from a website,
        not just the initial URL?
      </p>
      <label for="${id}" class="form-label">Option flag:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="--..." />
      <small class="form-text text-muted">
        Hint: This option tells wget to follow links and download multiple pages
      </small>
    </div>
  `;

  return { id, title, weight, question, answer };
}