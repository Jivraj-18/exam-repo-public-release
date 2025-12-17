import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

const countWeekendDays = (start, end) => {
  const cursor = new Date(start);
  let weekends = 0;
  while (cursor <= end) {
    const day = cursor.getUTCDay();
    if (day === 0 || day === 6) weekends += 1;
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return weekends;
};

const makeDate = (random) => {
  // Pick a date in 2025 to keep ranges friendly.
  const month = Math.floor(random() * 12); // 0-11
  const day = Math.max(1, Math.floor(random() * 28)); // avoid month-length edge cases
  return new Date(Date.UTC(2025, month, day));
};

const normalizeNumber = (value) => {
  const num = Number(String(value).trim());
  if (!Number.isFinite(num)) throw new Error("Answer must be a number");
  return num;
};

export default async function({ user, weight = 0.5 }) {
  const id = "q-weekend-days";
  const title = "Count weekend days in a date range";
  const random = seedrandom(`${user.email}#${id}`);

  let start = makeDate(random);
  let end = makeDate(random);
  if (end < start) [start, end] = [end, start];

  const startLabel = start.toISOString().slice(0, 10);
  const endLabel = end.toISOString().slice(0, 10);
  const expected = countWeekendDays(start, end);

  const question = html`
    <div class="mb-3">
      <h4>Operations calendar sanity check</h4>
      <p>
        For a deploy freeze calendar you need to count weekend days between two dates (inclusive). Use any tool (Python,
        Sheets, Excel, Bash) to calculate the number of Saturdays and Sundays between
        <code>${startLabel}</code> and <code>${endLabel}</code>, inclusive.
      </p>
      <label class="form-label" for="${id}">How many weekend days fall in this range?</label>
      <input class="form-control" id="${id}" name="${id}" type="number" placeholder="e.g. 7" required />
      <p class="text-muted">Hint: UTC dates, inclusive of both endpoints.</p>
    </div>
  `;

  const answer = (value) => {
    const provided = normalizeNumber(value);
    if (provided !== expected) throw new Error(`Expected ${expected} weekend days; got ${provided}`);
    return true;
  };

  return { id, title, weight, question, answer };
}

