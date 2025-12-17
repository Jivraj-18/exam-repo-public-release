import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-category-margins";
  const title = "DuckDB: Post-Launch Category Margins";

  const random = seedrandom(`${user.email}#${id}`);
  const categories = ["Electronics", "Furniture", "Appliances", "Fitness"];
  const rows = [];

  for (let i = 0; i < 220; i++) {
    const category = pick(categories, random);
    const units = Math.floor(1 + random() * 6);
    const price = Math.round(80 + random() * 900);
    const cost = Math.round(price * (0.45 + random() * 0.25));
    const date = new Date(
      Date.parse("2024-04-01") + random() * (Date.parse("2024-07-31") - Date.parse("2024-04-01")),
    ).toISOString().slice(0, 10);
    rows.push({ category, units, price, cost, date });
  }

  const csv =
    "category,units,unit_price,unit_cost,ship_date\n" +
    rows.map(r => `${r.category},${r.units},${r.price},${r.cost},${r.date}`).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });

  const margins = {};
  for (const c of categories) {
    const data = rows.filter(r => r.category === c && r.date >= "2024-05-15");
    const revenue = data.reduce((s, r) => s + r.units * r.price, 0);
    const cost = data.reduce((s, r) => s + r.units * r.cost, 0);
    margins[c] = (revenue - cost) / revenue;
  }

  const bestCategory = Object.entries(margins).sort((a, b) => b[1] - a[1])[0][0];

  const answer = (v) => {
    if (!v.toLowerCase().includes(bestCategory.toLowerCase()))
      throw new Error("Incorrect category.");
    return true;
  };

  const question = html`
    <h2>${title}</h2>
    <p>
      Load the CSV into DuckDB and compute gross margin by category
      for shipments on or after <strong>2024-05-15</strong>.
    </p>
    <button class="btn btn-sm btn-outline-primary"
      @click=${() => download(blob, `${id}.csv`)}>Download CSV</button>
    <p>Which category has the highest gross margin?</p>
    <input class="form-control" id="${id}" />
  `;

  return { id, title, weight, question, answer };
}
