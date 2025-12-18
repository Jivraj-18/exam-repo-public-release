import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.5 }) {
  const id = "q-db-index";
  const title = "Database Performance Optimization";
  const answer = "btree";
  const question = html`
    <div class="mb-3">
      <p>
        Your PostgreSQL query <code>SELECT * FROM users WHERE email = 'user@example.com'</code>
        is slow on a table with 10 million rows. You create an index on the email column.
        What is the default index type PostgreSQL uses that provides O(log n) search time?
      </p>
      <label for="${id}" class="form-label">Index Type (lowercase):</label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}"
        placeholder="e.g., hash, btree, gin" 
      />
      <small class="form-text text-muted">
        This balanced tree structure is the most common index type in relational databases.
      </small>
    </div>
  `;
  return { id, title, weight, question, answer };
}
