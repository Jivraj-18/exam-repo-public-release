import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-rank-volatility";
  const title = "Rank volatility under partial observability";

  const random = seedrandom(`${user.email}#${id}`);
  const regions = ["North", "South", "East", "West", "Central"];
  const weeks = Array.from({ length: 12 }, (_, i) => `W${i + 1}`);

  const rows = [];
  for (const region of regions) {
    let base = Math.floor(800 + random() * 400);
    for (const week of weeks) {
      if (random() < 0.18) continue; // missing week
      base += Math.floor(random() * 120 - 60);
      rows.push({ region, week, value: Math.max(100, base) });
    }
  }

  const csv = ["region,week,value", ...rows.map(r => `${r.region},${r.week},${r.value}`)].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });

  // forward fill + renormalize weekly totals
  const filled = {};
  for (const region of regions) {
    let last = null;
    for (const week of weeks) {
      const r = rows.find(x => x.region === region && x.week === week);
      if (r) last = r.value;
      if (!filled[week]) filled[week] = {};
      filled[week][region] = last ?? null;
    }
  }

  let maxDisplacement = 0;
  let prevRanks = null;

  for (const week of weeks) {
    const weekData = Object.entries(filled[week]).filter(([, v]) => v !== null);
    const total = weekData.reduce((s, [, v]) => s + v, 0);
    const ranked = weekData
      .map(([r, v]) => [r, v / total])
      .sort((a, b) => b[1] - a[1]);

    const ranks = Object.fromEntries(ranked.map((x, i) => [x[0], i + 1]));
    if (prevRanks) {
      for (const r of Object.keys(ranks)) {
        maxDisplacement = Math.max(
          maxDisplacement,
          Math.abs(ranks[r] - (prevRanks[r] ?? ranks[r]))
        );
      }
    }
    prevRanks = ranks;
  }

  const answer = async v => {
    const n = Number(v);
    if (!Number.isFinite(n)) throw new Error("Enter a numeric rank displacement.");
    if (n !== maxDisplacement) throw new Error("Incorrect maximum rank displacement.");
    return true;
  };

  const question = html`
    <h2>Rank Volatility Under Partial Observability</h2>
    <p>
      Weekly regional performance data contains missing weeks. Analysts forward-fill missing values,
      renormalize weekly totals, and rank regions each week.
    </p>
    <p>
      Compute the <strong>maximum absolute rank displacement</strong> experienced by any region
      between consecutive weeks.
    </p>
    <button @click=${() => download(blob, `${id}.csv`)}>Download CSV</button>
    <input class="form-control" id="${id}" />
  `;

  return { id, title, weight, question, answer };
}
