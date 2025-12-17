import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-unit-conversion";
    const title = "Unit Conversion - Fahrenheit to Celsius";

    const random = seedrandom(`${user.email}#${id}`);

    const numValues = 5 + Math.floor(random() * 5); // 5-9 values
    const fahrenheitValues = [];
    const expectedCelsius = [];

    for (let i = 0; i < numValues; i++) {
        const f = Math.floor(random() * 200); // 0-199 F
        fahrenheitValues.push(f);
        // C = (F - 32) * 5/9
        const c = (f - 32) * 5 / 9;
        expectedCelsius.push(c);
    }

    const answer = (input) => {
        let submission;
        try {
            submission = JSON.parse(input);
        } catch (e) {
            throw new Error("Input is not valid JSON");
        }

        if (!Array.isArray(submission)) throw new Error("Input must be an array");
        if (submission.length !== expectedCelsius.length) return false;

        // Check with tolerance
        return submission.every((val, idx) => Math.abs(val - expectedCelsius[idx]) < 0.1);
    };

    const question = html`
    <div class="mb-3">
      <p>
        Convert the following Fahrenheit temperatures to Celsius.
        Use the formula: <code>C = (F - 32) * 5/9</code>.
      </p>
      <p>Input (Fahrenheit):</p>
      <pre style="white-space: pre-wrap; background-color: #eef; padding: 10px; border-radius: 5px;"><code>${JSON.stringify(fahrenheitValues)}</code></pre>
      <p>Provide the result as a JSON array of numbers (e.g., <code>[0, 10.5, -5]</code>).</p>
      <label for="${id}" class="form-label">Celsius Values (JSON Array):</label>
      <input type="text" class="form-control" id="${id}" name="${id}" placeholder="[...]" required />
    </div>
  `;

    return { id, title, weight, question, answer };
}
