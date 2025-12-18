import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-jq-filter";
  const title = "jq JSON Filtering";
  const answer = "jq '.users[] | select(.age > 25) | .name'";
  
  const question = html`
    <div class="mb-3">
      <p>
        JSON file has: <code>{"users": [{"name": "Alice", "age": 30}, {"name": "Bob", "age": 22}]}</code>
        <br>Write a <strong>jq command</strong> to extract names of users older than 25.
      </p>
      <label for="${id}" class="form-label">jq Command:</label>
      <input class="form-control" id="${id}" name="${id}" 
             placeholder="jq '...' data.json" />
      <small class="form-text text-muted">Filter users by age and extract name field</small>
    </div>
  `;
  
  return { id, title, weight, question, answer };
}