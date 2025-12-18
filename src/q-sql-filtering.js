import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-filtering";
  const title = "SQL Logic: Filtering Data";

  const random = seedrandom(`${user.email}#${id}`);
  const threshold = Math.floor(random() * 40) + 20; // Random age between 20 and 60

  const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 45 },
    { id: 3, name: "Charlie", age: 30 },
    { id: 4, name: "Diana", age: 60 }
  ];

  // Calculate expected result
  const count = users.filter(u => u.age > threshold).length;

  const answer = (input) => {
    return parseInt(input) === count;
  };

  const question = html`
    <div class="mb-3">
      <p>Consider the following <code>users</code> table:</p>
      <pre><code>${JSON.stringify(users, null, 2)}</code></pre>
      <p>How many rows would the following SQL query return?</p>
      <pre><code>SELECT * FROM users WHERE age > ${threshold}</code></pre>
      
      <label for="${id}" class="form-label">Row Count:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

  return { id, title, weight, question, answer };
}