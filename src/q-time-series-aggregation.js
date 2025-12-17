import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-daily-totals";
  const title = "Aggregate Transactions by Date";

  const random = seedrandom(`${user.email}#${id}`);

  const dates = ["2025-01-01", "2025-01-02", "2025-01-03", "2025-01-04"];

  const txns = Array.from({ length: 70 }, () => ({
    date: dates[Math.floor(random() * dates.length)],
    amount: Number((10 + random() * 90).toFixed(2)),
  }));

  const expected = Object.values(
    txns.reduce((acc, t) => {
      acc[t.date] ??= { date: t.date, total: 0 };
      acc[t.date].total += t.amount;
      acc[t.date].total = Number(acc[t.date].total.toFixed(2));
      return acc;
    }, {}),
  ).sort((a, b) => a.date.localeCompare(b.date));

  const answer = (input) => {
    const arr = JSON.parse(input);
    return (
      arr.length === expected.length &&
      arr.every(
        (d, i) => d.date === expected[i].date && d.total === expected[i].total,
      )
    );
  };

  const question = html`
    <p>
      You are given transaction records with <code>date</code> and
      <code>amount</code>.
    </p>
    <ol>
      <li>Group by <code>date</code>.</li>
      <li>Compute total amount per day.</li>
      <li>Sort by date ascending.</li>
    </ol>
    <pre><code class="language-json">${JSON.stringify(txns)}</code></pre>
    <input class="form-control" id="${id}" />
  `;

  return { id, title, weight, question, answer };
}
