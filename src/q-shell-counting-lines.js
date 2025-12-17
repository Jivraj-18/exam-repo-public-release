import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-shell-wc";
  const title = "Shell: Counting Data Rows";

  // Accepting variants with or without filename
  const answer = "wc -l";

  const question = html`
    <div class="mb-3">
      <p>
        In the shell traffic audit, you used tools like <code>grep</code> and <code>cut</code>. 
        If you have a file named <code>traffic.log</code> and you want to count exactly how many 
        lines (requests) are in the file, which command and flag combination should you use?
      </p>
      <label for="${id}" class="form-label">Command (e.g., cmd -flag):</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="wc -l" />
    </div>
  `;

  return { id, title, weight, question, answer };
}