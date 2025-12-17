import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

const randInt = (random, min, max) =>
  Math.floor(random() * (max - min + 1)) + min;

export default async function ({ user, weight = 1 }) {
  const id = "q-histogram-bin-count";
  const title = "Histogram Bin Counting";

  const random = seedrandom(`${user.email}#${id}`);

  const values = Array.from({ length: randInt(random, 8, 12) }, () =>
    randInt(random, 0, 99)
  );

  const bins = [
    { label: "0-24", min: 0, max: 24 },
    { label: "25-49", min: 25, max: 49 },
    { label: "50-74", min: 50, max: 74 },
    { label: "75-99", min: 75, max: 99 },
  ];

  const expected = {};
  for (const b of bins) {
    expected[b.label] = values.filter(
      (v) => v >= b.min && v <= b.max
    ).length;
  }

  const question = html`
    <div class="mb-3">
      <h4>Histogram Bin Counting</h4>

      <p>
        You are preparing data for a histogram.
      </p>

      <p><strong>Values:</strong></p>

      <pre class="bg-light p-2">
${JSON.stringify(values)}
      </pre>

      <p>
        Count how many values fall into each bin:
      </p>

      <ul>
        <li>0–24</li>
        <li>25–49</li>
        <li>50–74</li>
        <li>75–99</li>
      </ul>

      <p>
        Output JSON in this format:
      </p>

      <pre class="bg-light p-2">
{
  "email": "${user.email}",
  "bins": {
    "0-24": NUMBER,
    "25-49": NUMBER,
    "50-74": NUMBER,
    "75-99": NUMBER
  }
}
      </pre>

      <label for="${id}" class="form-label">
        Paste your output JSON here
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

    if (data.email !== user.email)
      throw new Error("Email does not match");

    for (const key of Object.keys(expected)) {
      if (Number(data.bins?.[key]) !== expected[key]) {
        throw new Error(
          `Incorrect count for ${key}. Expected ${expected[key]}`
        );
      }
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
