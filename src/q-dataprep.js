import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-temperature-normalization";
  const title = "Normalize Sensor Data";

  const random = seedrandom(`${user.email}#${id}`);
  const records = Array.from({ length: 80 }, () => {
    const c = 20 + random() * 20;
    return {
      status: random() < 0.85 ? "ok" : "offline",
      value: random() < 0.3 ? c * 9 / 5 + 32 : c,
      unit: random() < 0.3 ? "F" : "C",
    };
  });

  const expected =
    records
      .filter((r) => r.status === "ok")
      .map((r) => (r.unit === "F" ? (r.value - 32) * 5 / 9 : r.value))
      .reduce((a, b) => a + b, 0) /
    records.filter((r) => r.status === "ok").length;

  const answer = (val) => {
    if (Math.abs(Number(val) - expected) > 0.1) {
      throw new Error("Incorrect average temperature");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Sensor Data Normalization</h2>
      <p>
        Temperature data arrives in mixed units. Offline readings must be ignored.
      </p>

      <pre><code class="json">${JSON.stringify(records, null, 2)}</code></pre>

      <h2>Your Task</h2>
      <ol>
        <li>Ignore offline records</li>
        <li>Convert Fahrenheit to Celsius</li>
        <li>Compute average temperature</li>
      </ol>

      <label class="form-label">Average temperature (°C):</label>
      <input class="form-control" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
