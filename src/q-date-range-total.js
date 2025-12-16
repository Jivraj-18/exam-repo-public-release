import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

// Sum transaction amounts within a date range
//
// Students are given a list of transaction records with dates and amounts. They must filter the
// transactions that fall between two provided dates (inclusive) and compute the total amount.
// Dates are expressed in ISO 8601 format. The answer must return the sum as a number with
// two decimal places.

export default async function ({ user, weight = 1 }) {
  const id = "q-date-range-total";
  const title = "Calculate total transaction amount in a date range";

  // deterministic RNG
  const random = seedrandom(`${user.email}#${id}`);
  // generate a start and end date window within a fixed year
  const year = 2024;
  const startMonth = Math.floor(random() * 6) + 1; // 1–6
  const endMonth = startMonth + Math.floor(random() * 6); // ensure endMonth >= startMonth
  const startDate = new Date(Date.UTC(year, startMonth - 1, 1));
  const endDate = new Date(Date.UTC(year, endMonth - 1, 28));


  const dateToISO = (d) => d.toISOString().split("T")[0];

  const startISO = dateToISO(startDate);
  const endISO = dateToISO(endDate);


  // generate 60 transactions across the year
  const transactions = Array.from({ length: 60 }, () => {
    const month = Math.floor(random() * 12); // 0–11
    const day = Math.floor(random() * 28) + 1; // 1–28 to avoid month length issues
    const date = new Date(Date.UTC(year, month, day));
    const amount = Number((10 + random() * 990).toFixed(2));
    return { date: dateToISO(date), amount };
  });

  // compute expected sum of amounts within the date range (inclusive)
  let total = 0;
  for (const tx of transactions) {
    if (tx.date >= startISO && tx.date <= endISO) {
      total += tx.amount;
    }
  }

  const expectedTotal = Number(total.toFixed(2));

  const answer = (input) => {
    const provided = Number(input);
    if (Number.isNaN(provided)) {
      throw new Error("Input must be a number");
    }
    // allow a tiny epsilon difference due to floating point addition if they recompute
    return Math.abs(provided - expectedTotal) < 0.01;
  };

  const question = html`
    <div class="mb-3">
      <p>
        Below is a JSON array of transaction records. Each record has a <code>date</code> (ISO 8601
        string) and an <code>amount</code> (rupees). Your task is to filter all transactions that fall
        between <strong>${dateToISO(startDate)}</strong> and <strong>${dateToISO(endDate)}</strong>, inclusive,
        and compute the total amount. Return the sum as a number rounded to two decimal places.
      </p>
      <pre style="white-space: pre-wrap"><code class="language-json">${JSON.stringify(transactions, null, 2)}</code></pre>
      <label for="${id}" class="form-label">Total amount (number):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
