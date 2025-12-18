import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function({ user, weight = 1 }) {
  const id = "q-json-safe-access";
  const title = "JSON: Safe Property Access in Python";

  const question = html`
    <div class="mb-3">
      <p>
        You are parsing JSON data in Python and want to safely access a field that may or may not exist.
        Given the following Python code:
      </p>
      <pre><code class="language-python">import json

json_string = '{"name": "Product A", "price": 29.99}'
data = json.loads(json_string)</code></pre>
      
      <p>
        Which of the following is the safest way to access the <code>rating</code> field 
        (which does not exist in this JSON) without causing a <code>KeyError</code>?
      </p>
      
      <div class="form-check">
        <input class="form-check-input" type="radio" name="${id}" id="${id}-a" value="a" />
        <label class="form-check-label" for="${id}-a">
          <code>data["rating"]</code>
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="${id}" id="${id}-b" value="b" />
        <label class="form-check-label" for="${id}-b">
          <code>data.get("rating")</code>
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="${id}" id="${id}-c" value="c" />
        <label class="form-check-label" for="${id}-c">
          <code>data.rating</code>
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="${id}" id="${id}-d" value="d" />
        <label class="form-check-label" for="${id}-d">
          <code>data[rating]</code>
        </label>
      </div>
    </div>
  `;

  const answer = "b";

  return { id, title, weight, question, answer };
}
