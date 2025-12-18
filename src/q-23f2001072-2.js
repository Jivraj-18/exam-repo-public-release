import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-23f2001072-2";
  const title = "Pandas DataFrame Operations";

  // deterministic RNG
  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  // Generate DataFrame data
  const len = 5;
  const cities = ["Delhi", "Mumbai", "Chennai", "Kolkata"];
  const sales = Array.from({ length: len }, () => 100 + Math.floor(random() * 500));
  const cityCol = Array.from({ length: len }, () => pick(cities));

  const targetCity = pick(cities);
  const targetSales = sales.reduce((acc, sale, i) => (cityCol[i] === targetCity ? acc + sale : acc), 0);

  const dfData = {
    "City": cityCol,
    "Sales": sales
  };

  const dfRows = sales.map((s, i) => html`
      <tr>
        <td>${i}</td>
        <td>${cityCol[i]}</td>
        <td>${s}</td>
      </tr>
    `);

  const expected = targetSales.toString();

  const answer = (input) => {
    return input.trim() === expected;
  };

  const question = html`
    <div class="mb-3">
      <p>Given the following DataFrame <code>df</code>:</p>
      <table class="table table-sm table-bordered w-auto">
        <thead>
          <tr>
            <th></th>
            <th>City</th>
            <th>Sales</th>
          </tr>
        </thead>
        <tbody>
          ${dfRows}
        </tbody>
      </table>
      <p>What is the total sales for <strong>${targetCity}</strong>?</p>
      <p>Calculated as: <code>df[df['City'] == '${targetCity}']['Sales'].sum()</code></p>
      
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
