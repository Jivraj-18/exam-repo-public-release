import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function({ user, weight = 1 }) {
  const id = "q-fastapi-pydantic-validation";
  const title = "FastAPI: Pydantic Field Validation";

  const question = html`
    <div class="mb-3">
      <p>
        You have a FastAPI endpoint with the following Pydantic model:
      </p>
      <pre><code class="language-python">from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    email: str
    password: str</code></pre>
      
      <p>A client sends a POST request with the following JSON body:</p>
      <pre><code class="language-json">{
  "username": "john_doe",
  "email": "john@example.com"
}</code></pre>
      
      <p>
        The <code>password</code> field is missing, which is required by the Pydantic model. 
        What HTTP status code will FastAPI return by default?
      </p>
      
      <label for="${id}" class="form-label">HTTP Status Code:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
      <p class="text-muted">Enter just the numeric status code (e.g., 200, 400, 500).</p>
    </div>
  `;

  const answer = "422";

  return { id, title, weight, question, answer };
}
