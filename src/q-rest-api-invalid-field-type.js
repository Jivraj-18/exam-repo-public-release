import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function({ user, weight = 1 }) {
  const id = "q-rest-api-invalid-field-type";
  const title = "REST API: Invalid JSON Field Type";

  const question = html`
    <div class="mb-3">
      <p>
        You are building a REST API that expects a user registration payload with an <code>age</code> field 
        that should be an integer. A client sends a request with the following JSON body:
      </p>
      <pre><code class="language-json">{
  "name": "Alice",
  "age": "twenty-five"
}</code></pre>
      
      <p>
        The API validates the request and discovers that the <code>age</code> field has an invalid type 
        (string instead of integer). 
      </p>
      
      <p>What is the most appropriate HTTP status code to return?</p>
      
      <label for="${id}" class="form-label">HTTP Status Code:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
      <p class="text-muted">Enter just the numeric status code (e.g., 200, 400, 500).</p>
    </div>
  `;

  const answer = "422";

  return { id, title, weight, question, answer };
}
