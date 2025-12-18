import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-json-date-filter";
    const title = "Filter JSON Events by Date";

    const random = seedrandom(`${user.email}#${id}`);
    const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;

    const events = [];
    const years = [2023, 2024, 2025];
    let matchCount = 0;

    // Pick a target year
    const targetYear = years[Math.floor(random() * years.length)];

    for (let i = 0; i < 10; i++) {
        const y = years[Math.floor(random() * years.length)];
        const m = randInt(1, 12).toString().padStart(2, '0');
        const d = randInt(1, 28).toString().padStart(2, '0');
        const date = `${y}-${m}-${d}`;

        if (y === targetYear) matchCount++;

        events.push({ id: i + 1, date: date, event: `Event ${i + 1}` });
    }

    const question = html`
    <div class="mb-3">
      <p>
        Given the following JSON array of events, how many events occurred in the year <strong>${targetYear}</strong>?
      </p>
      <pre style="white-space: pre-wrap"><code class="language-json">
${JSON.stringify(events, null, 2)}
      </code></pre>
      <label for="${id}" class="form-label">Count:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    const answer = (input) => {
        if (parseInt(input) !== matchCount) {
            throw new Error(`Incorrect. Expected ${matchCount}`);
        }
        return true;
    };

    return { id, title, weight, question, answer };
}
