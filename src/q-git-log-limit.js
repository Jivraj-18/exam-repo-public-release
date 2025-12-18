import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-git-log-limit";
  const title = "Git Log Limit";

  const random = seedrandom(`${user.email}#${id}`);
  const n = Math.floor(random() * 10) + 1; // 1 to 10
  const answer = `-n ${n}`;

  const question = html`
    <div class="mb-3">
      <p>Which <code>git log</code> flag limits the output to the last <strong>${n}</strong> commits?</p>
      <p>Provide the flag and the number, separated by a space (e.g. <code>-n 5</code>).</p>
      
      <label for="${id}" class="form-label">Answer</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
