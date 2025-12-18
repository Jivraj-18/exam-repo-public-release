import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-count";
  const title = "SQL WHERE Clause Logic";

  const random = seedrandom(`${user.email}#${id}`);

  const ages = Array.from({ length: 15 }, () =>
    Math.floor(random() * 60) + 18,
  );

  const threshold = 30;
  const answer = ages.filter((a) => a > threshold).length;

  const question = html`
    <div class="mb-3">
      <p>
        A database table contains the following values in an
        <code>age</code> column:
      </p>

      <pre><code>${ages.join(", ")}</code></pre>

      <p>
        What would this SQL query return?
      </p>

      <pre><code class="language-sql">
SELECT COUNT(*) FROM users WHERE age &gt; ${threshold};
      </code></pre>

      <label for="${id}" class="form-label">Result</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
