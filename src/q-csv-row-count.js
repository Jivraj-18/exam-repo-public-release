import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-csv-row-count";
  const title = "CSV Data Inspection";

  const random = seedrandom(`${user.email}#${id}`);
  const year = 2020 + Math.floor(random() * 4);
  let expected;

  const answer = async (count) => {
    count = count.trim();
    if (!expected) {
      const r = await fetch("/proxy/https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv");
      const text = await r.text();
      const rows = text.split("\n").filter(r => r.includes(year));
      expected = rows.length.toString();
    }
    if (count !== expected) throw new Error("Incorrect row count");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Data Validation for Financial Analytics</h2>
      <p>
        You are validating a CSV dataset containing historical Apple stock prices.
      </p>

      <p>
        Download the CSV file from:
        <a href="https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv">
          Apple Stock CSV
        </a>
      </p>

      <p>
        Count how many rows correspond to the year <code>${year}</code>.
      </p>

      <label for="${id}" class="form-label">
        How many rows match the year ${year}?
      </label>
      <input class="form-control" id="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}
