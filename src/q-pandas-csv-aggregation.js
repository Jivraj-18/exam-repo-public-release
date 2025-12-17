import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

const randInt = (random, min, max) =>
  Math.floor(random() * (max - min + 1)) + min;

export default async function ({ user, weight = 1 }) {
  const id = "q-pandas-csv-aggregation";
  const title = "Pandas CSV Aggregation";

  const random = seedrandom(`${user.email}#${id}`);

  const categories = ["A", "B", "C"];
  const rows = Array.from({ length: randInt(random, 6, 10) }, () => ({
    category: categories[randInt(random, 0, categories.length - 1)],
    value: randInt(random, 10, 50),
  }));

  const expected = {};
  for (const r of rows) {
    expected[r.category] = (expected[r.category] || 0) + r.value;
  }

  const csv = [
    "category,value",
    ...rows.map((r) => `${r.category},${r.value}`),
  ].join("\n");

  const question = html`
    <div class="mb-3">
      <h4>Pandas CSV Aggregation</h4>

      <p>
        You are given a CSV file containing categories and numeric values.
      </p>

      <p><strong>CSV data:</strong></p>

      <pre class="bg-light p-2">${csv}</pre>

      <p>
        Write a Python program using <code>pandas</code> that:
      </p>

      <ol>
        <li>Reads the CSV data</li>
        <li>Groups by <code>category</code></li>
        <li>Calculates the sum of <code>value</code> for each category</li>
      </ol>

      <p>
        Your program should output JSON in this format:
      </p>

      <pre class="bg-light p-2">
{
  "email": "${user.email}",
  "result": {
    "A": NUMBER,
    "B": NUMBER,
    "C": NUMBER
  }
}
      </pre>

      <label for="${id}" class="form-label">
        Paste your program output JSON here
      </label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="6"
      ></textarea>
    </div>
  `;

  const answer = async (output) => {
    let data;
    try {
      data = JSON.parse(output);
    } catch {
      throw new Error("Invalid JSON");
    }

    if (data.email !== user.email) {
      throw new Error("Email does not match");
    }

    for (const key of Object.keys(expected)) {
      if (Number(data.result?.[key]) !== expected[key]) {
        throw new Error(
          `Incorrect sum for ${key}. Expected ${expected[key]}`
        );
      }
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
