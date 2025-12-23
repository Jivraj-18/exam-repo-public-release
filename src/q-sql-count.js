import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-sql-count";
    const title = "SQL Count";

    const random = seedrandom(`${user.email}#${id}`);

    // Generate random data for a table
    const ages = Array.from({ length: 10 }, () => Math.floor(random() * 40) + 18);
    const threshold = Math.floor(random() * 10) + 25; // Random threshold between 25 and 35

    const count = ages.filter(age => age > threshold).length;
    const answer = count;

    const question = html`
    <div class="mb-3">
      <p>Given the table <code>users</code> with the following <code>age</code> values:</p>
      <pre>${ages.join(", ")}</pre>
      <p>
        What is the result of the following SQL query?
      </p>
      <pre><code class="language-sql">SELECT COUNT(*) FROM users WHERE age > ${threshold};</code></pre>
      
      <label for="${id}" class="form-label">Result:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
