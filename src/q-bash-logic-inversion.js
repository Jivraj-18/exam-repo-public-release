import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-bash-logic-inversion";
  const title = "Advanced Grep Filtering";
  const answer = "-v";

  const question = html`
    <div class="mb-3">
      <p>
        You are processing a massive log file and want to <strong>exclude</strong> all lines 
        that contain the word "DEBUG". Which <code>grep</code> flag allows you to 
        <strong>invert</strong> the match to show only lines <strong>without</strong> that pattern?
      </p>
      <label for="${id}" class="form-label">Flag:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. -x" />
    </div>
  `;

  return { id, title, weight, question, answer };
}