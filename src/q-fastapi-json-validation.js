import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

const randInt = (random, min, max) =>
  Math.floor(random() * (max - min + 1)) + min;

export default async function ({ user, weight = 1 }) {
  const id = "q-fastapi-json-validation";
  const title = "FastAPI JSON Validation";

  const random = seedrandom(`${user.email}#${id}`);

  const values = Array.from({ length: randInt(random, 6, 10) }, () =>
    randInt(random, -10, 120)
  );

  const valid = values.filter((v) => v >= 0 && v <= 100).length;
  const invalid = values.length - valid;

  const question = html`
    <div class="mb-3">
      <h4>FastAPI JSON Validation</h4>

      <p>
        You are building an API that validates incoming numeric data.
      </p>

      <p>The API will receive this JSON:</p>

      <pre class="bg-light p-2">
{
  "values": ${JSON.stringify(values)}
}
      </pre>

      <p>
        Rules:
        <ul>
          <li>Valid values are between 0 and 100 (inclusive)</li>
          <li>All other values are invalid</li>
        </ul>
      </p>

      <p>
        Create a <code>POST /validate</code> endpoint that returns:
      </p>

      <pre class="bg-light p-2">
{
  "valid": NUMBER,
  "invalid": NUMBER,
  "email": "${user.email}"
}
      </pre>

      <label for="${id}" class="form-label">
        Enter the base URL of your API
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="url"
        placeholder="http://localhost:8000"
      />
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");

    const endpoint = url.replace(/\/$/, "") + "/validate";

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ values }),
    });

    if (!resp.ok) throw new Error(`Endpoint returned ${resp.status}`);

    let data;
    try {
      data = await resp.json();
    } catch {
      throw new Error("Invalid JSON response");
    }

    if (data.email !== user.email)
      throw new Error("Email does not match");

    if (Number(data.valid) !== valid)
      throw new Error(`Expected valid=${valid}`);

    if (Number(data.invalid) !== invalid)
      throw new Error(`Expected invalid=${invalid}`);

    return true;
  };

  return { id, title, weight, question, answer };
}
