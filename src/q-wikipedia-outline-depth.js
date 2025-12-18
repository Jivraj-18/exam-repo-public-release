import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wikipedia-outline-depth";
  const title = "Wikipedia Outline — Deep Hierarchy Extraction";

  const answer = "12";

  const question = html`
    <div class="mb-3">
      <p>
        Fetch the Wikipedia page for <strong>Norway</strong>.
      </p>
      <p>
        Extract all headings <code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>.
      </p>
      <p>
        Count how many headings are at <strong>depth level 4 or deeper</strong>
        (i.e., <code>####</code> and below in Markdown).
      </p>
      <p>
        Ignore:
        <ul>
          <li>References</li>
          <li>See also</li>
          <li>External links</li>
        </ul>
      </p>
      <label for="${id}" class="form-label">
        Total number of deep headings:
      </label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
