import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-two-commits-23f1000519";
  const title = "GitHub: Multiple Commits on Same File";

  const question = html`
    <div class="mb-3">
      <p>
        Create a <strong>public GitHub repository</strong>.
        Create a file <code>count.txt</code> with a number.
      </p>
      <ol>
        <li>Commit the file once.</li>
        <li>Increment the number by 1.</li>
        <li>Commit the file again.</li>
      </ol>
      <p>
        Enter the <strong>GitHub URL of the commits page</strong> showing both commits.
      </p>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("Commits page URL is required");
    if (!url.startsWith("https://github.com/")) {
      throw new Error("Must be a valid GitHub URL");
    }
    if (!url.includes("/commits/")) {
      throw new Error("URL must point to the commits page");
    }
    return true;
  };

  return { id, title, weight, question, answer };
}
