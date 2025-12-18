import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-schema-23f1000519";
  const title = "JSON: Write a Validation Schema";

  const question = html`
    <div class="mb-3">
      <p>
        You are given a JSON object representing a user profile.
      </p>
      <p>
        Write a <strong>JSON Schema</strong> that enforces the following rules:
      </p>
      <ul>
        <li><code>email</code> must be a valid email string</li>
        <li><code>age</code> must be an integer greater than or equal to 18</li>
        <li><code>role</code> must be one of <code>"admin"</code>, <code>"editor"</code>, or <code>"viewer"</code></li>
      </ul>
      <p>
        Paste the <strong>complete JSON Schema</strong> as a <strong>single minified JSON string</strong>.
      </p>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="6"
      ></textarea>
    </div>
  `;

  const answer = async (value) => {
    if (!value) throw new Error("JSON Schema is required");

    let parsed;
    try {
      parsed = JSON.parse(value);
    } catch {
      throw new Error("Response must be valid JSON");
    }

    if (typeof parsed !== "object") {
      throw new Error("Schema must be a JSON object");
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
