import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-pages";
  const title = "Deploy with GitHub Pages";

  const answer = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Page not accessible");
    const text = await res.text();
    if (!text.toLowerCase().includes(user.email)) {
      throw new Error("Email not found on page");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Publishing an Analytics Report</h2>
      <p>
        You are asked to publish a lightweight analytics report using GitHub Pages.
      </p>

      <h2>Your Task</h2>
      <ol>
        <li>Create a Markdown report</li>
        <li>Push it to GitHub</li>
        <li>Enable GitHub Pages</li>
        <li>Ensure your email appears on the page</li>
      </ol>

      <label class="form-label">Enter the public GitHub Pages URL:</label>
      <input class="form-control" type="url" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
