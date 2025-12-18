import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-schema-validation";
  const title = "Validate JSON against a schema";

  const random = seedrandom(`${user.email}#${id}`);

  const schema = {
    required: ["id", "email"],
  };

  const valid = random() > 0.5;

  const jsonData = valid
    ? { id: 101, email: "user@example.com" }
    : { id: 101 };

  const answer = async () => {
    const input = document.getElementById(id).value;

    let parsed;
    try {
      parsed = JSON.parse(input);
    } catch {
      throw new Error("Invalid JSON");
    }

    for (const key of schema.required) {
      if (!(key in parsed)) {
        throw new Error(`Missing required field: ${key}`);
      }
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        Validate the JSON below against the required schema.
        Required fields: <code>id</code>, <code>email</code>.
      </p>
      <pre>${JSON.stringify(jsonData, null, 2)}</pre>
      <label class="form-label">
        Paste a JSON object that satisfies the schema
      </label>
      <textarea id="${id}" class="form-control" rows="6"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}



