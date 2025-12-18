import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-date-diff";
    const title = "Calculate Days Between Dates";

    const random = seedrandom(`${user.email}#${id}`);

    // Generate a random recent date
    const startTimestamp = new Date("2024-01-01").getTime();
    const endTimestamp = new Date("2025-01-01").getTime();

    const d1 = new Date(startTimestamp + random() * (endTimestamp - startTimestamp));
    const daysToAdd = Math.floor(random() * 50) + 10; // 10 to 60 days
    const d2 = new Date(d1.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

    const formatDate = (d) => d.toISOString().split('T')[0];

    const answer = (input) => {
        const val = parseInt(input, 10);
        if (isNaN(val)) throw new Error("Input is not a number");
        if (val !== daysToAdd) throw new Error(`Incorrect. Expected ${daysToAdd}, got ${val}`);
        return true;
    };

    const question = html`
    <div class="mb-3">
      <h4>Days Between Dates</h4>
      <p>
        How many days are there between <strong>${formatDate(d1)}</strong> and <strong>${formatDate(d2)}</strong>?
        (Calculate <code>date2 - date1</code> in days).
      </p>
      <label for="${id}" class="form-label">Number of days</label>
      <input type="number" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
