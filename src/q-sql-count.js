import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-count";
  const title = "SQL: COUNT";

  const random = seedrandom(`${user.email}#${id}`);
  const rows = Math.floor(random() * 20) + 5;

  const answer = (value) => {
    if (Number(value) !== rows) throw new Error("Incorrect result");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>A table <code>orders</code> contains ${rows} rows.</p>
      <p>You run:</p>
      <pre><code>SELECT COUNT(*) FROM orders;</code></pre>
      <label class="form-label">What is the output?</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
