import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

const randInt = (random, min, max) =>
  Math.floor(random() * (max - min + 1)) + min;

export default async function ({ user, weight = 1 }) {
  const id = "q-fastapi-json-aggregation";
  const title = "FastAPI JSON Aggregation";

  const random = seedrandom(`${user.email}#${id}`);

  const values = Array.from({ length: randInt(random, 5, 10) }, () =>
    randInt(random, 10, 100)
  );

  const expectedSum = values.reduce((a, b) => a + b, 0);

  const question = html`
    <div class="mb-3">
      <h4>FastAPI JSON Aggregation</h4>

      <p>
        You are building a small API as part of a data pipeline.
      </p>

      <ol>
        <li>Create a FastAPI application.</li>
        <li>Implement a <code>POST /sum</code> endpoint.</li>
        <li>The endpoint should accept JSON in this format:</li>
      </ol>

      <pre class="bg-light p-2">
{
  "values": ${JSON.stringify(values)}
}
      </pre>

      <p>The API should return JSON like this:</p>

      <pre class="bg-light p-2">
{
  "result": NUMBER,
  "email": "${user.email}"
}
      </pre>

      <p>
        Calculate the sum of the numbers in <code>values</code>.
      </p>

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

    const endpoint = url.replace(/\/$/, "") + "/sum";

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

    if (Number(data.result) !== expectedSum)
      throw new Error(
        `Expected ${expectedSum}, got ${data.result}`
      );

    return true;
  };

  return { id, title, weight, question, answer };
}
