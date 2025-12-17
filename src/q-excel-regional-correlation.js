import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function ({ user, weight = 0.75 }) {
  const id = "q-excel-regional-correlation";
  const title = "Excel: Regional Marketing Correlation Deep-Dive";

  const random = seedrandom(`${user.email}#${id}`);
  const regions = ["North", "South", "East", "West", "Central"];

  const rows = [];
  for (let i = 0; i < 120; i++) {
    const region = pick(regions, random);
    const spend = Math.round(5000 + random() * 40000);
    const noise = random() * 20000 - 10000;
    const revenue = Math.round(spend * (region === "North" ? 1.9 : 1.2) + noise);
    rows.push({ region, spend, revenue });
  }

  const csv =
    "Region,Marketing_Spend_USD,Net_Revenue_USD\n" +
    rows.map(r => `${r.region},${r.spend},${r.revenue}`).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });

  const correlations = {};
  for (const r of regions) {
    const data = rows.filter(x => x.region === r);
    const mean = a => a.reduce((s, v) => s + v, 0) / a.length;
    const corr = (x, y) => {
      const mx = mean(x), my = mean(y);
      return x.reduce((s, v, i) => s + (v - mx) * (y[i] - my), 0) /
        Math.sqrt(
          x.reduce((s, v) => s + (v - mx) ** 2, 0) *
          y.reduce((s, v) => s + (v - my) ** 2, 0)
        );
    };
    correlations[r] = corr(
      data.map(d => d.spend),
      data.map(d => d.revenue),
    );
  }

  const bestRegion = Object.entries(correlations)
    .sort((a, b) => b[1] - a[1])[0][0];

  const answer = (v) => {
    if (!v.toLowerCase().includes(bestRegion.toLowerCase()))
      throw new Error("Incorrect region.");
    return true;
  };

  const question = html`
    <h2>${title}</h2>
    <p>Download the campaign dataset and compute Pearson correlation per region in Excel.</p>
    <button class="btn btn-sm btn-outline-primary"
      @click=${() => download(blob, `${id}.csv`)}>Download CSV</button>
    <p>Which region shows the strongest positive correlation?</p>
    <input class="form-control" id="${id}" />
  `;

  return { id, title, weight, question, answer };
}
