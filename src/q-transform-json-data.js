import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-transform-json-data";
    const title = "Group by City and Average Age";

    const random = seedrandom(`${user.email}#${id}`);
    const pick = (arr) => arr[Math.floor(random() * arr.length)];

    const cities = ["New York", "London", "Paris", "Tokyo", "Berlin"];
    const names = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank"];

    const usersList = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        name: pick(names),
        city: pick(cities),
        age: 20 + Math.floor(random() * 40) // 20-59
    }));

    // Expected result: { "New York": 35.5, ... }
    const expected = {};
    const counts = {};

    for (const u of usersList) {
        if (!expected[u.city]) {
            expected[u.city] = 0;
            counts[u.city] = 0;
        }
        expected[u.city] += u.age;
        counts[u.city] += 1;
    }

    for (const city in expected) {
        expected[city] = expected[city] / counts[city];
    }

    const answer = (input) => {
        const res = JSON.parse(input);
        const keys = Object.keys(expected);
        if (Object.keys(res).length !== keys.length) throw new Error("Key count mismatch");

        for (const k of keys) {
            if (Math.abs(res[k] - expected[k]) > 0.001) {
                throw new Error(`Value for ${k} mismatch. Expected ${expected[k]}, got ${res[k]}`);
            }
        }
        return true;
    };

    const question = html`
    <div class="mb-3">
      <p>
        Transform the following list of users into a summary object.
      </p>
      <pre style="white-space: pre-wrap; max-height: 200px; overflow-y: auto; background: #f8f9fa; padding: 10px;"><code class="language-json">
${JSON.stringify(usersList, null, 2)}
      </code></pre>
      <ol>
        <li>Group users by <code>city</code>.</li>
        <li>Calculate the <strong>average age</strong> for each city.</li>
        <li>Return a JSON object where keys are city names and values are the average age.</li>
      </ol>
      <label for="${id}" class="form-label">Result JSON:</label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

    return { id, title, weight, question, answer };
}
