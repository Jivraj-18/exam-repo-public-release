import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-aggregation";
  const title = "JSON Aggregation";

  let expected;

  const answer = async (value) => {
    value = value.trim();
    if (!expected) {
      const r = await fetch("/proxy/https://api.spacexdata.com/v4/launches");
      const data = await r.json();
      expected = data.filter(d => d.success === true).length.toString();
    }
    if (value !== expected) throw new Error("Incorrect count");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>API-Based Data Aggregation</h2>
      <p>
        SpaceX provides a public API with launch data.
      </p>

      <p>
        Endpoint:
        <code>https://api.spacexdata.com/v4/launches</code>
      </p>

      <p>
        Count how many launches have <code>"success": true</code>.
      </p>

      <label for="${id}" class="form-label">
        Enter the total successful launches:
      </label>
      <input class="form-control" id="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}

