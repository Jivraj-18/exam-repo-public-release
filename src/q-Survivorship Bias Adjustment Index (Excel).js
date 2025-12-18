import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-survivorship-adjustment";
  const title = "Survivorship Bias Adjustment Index";

  const random = seedrandom(`${user.email}#${id}`);
  const campaigns = Array.from({ length: 8 }, (_, i) => `C${i + 1}`);
  const months = Array.from({ length: 10 }, (_, i) => `M${i + 1}`);

  const rows = [];
  for (const c of campaigns) {
    let alive = true;
    let base = 100 + random() * 200;
    for (const m of months) {
      if (!alive) continue;
      if (random() < 0.15) alive = false;
      base += random() * 60 - 30;
      rows.push({ campaign: c, month: m, score: Math.max(10, base) });
    }
  }

  const csv = ["campaign,month,score", ...rows.map(r => `${r.campaign},${r.month},${r.score.toFixed(2)}`)].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });

  const totalMonths = months.length;
  const index =
    rows.reduce((s, r) => s + r.score, 0) /
    campaigns.reduce((s, c) => {
      const active = rows.filter(r => r.campaign === c).length;
      return s + active / totalMonths;
    }, 0);

  const answer = async v => {
    const n = Number(v);
    if (!Number.isFinite(n)) throw new Error("Enter numeric index.");
    if (Math.abs(n - index) > 0.5) throw new Error("Incorrect survivorship-adjusted index.");
    return true;
  };

  const question = html`
    <h2>Survivorship Bias Adjustment</h2>
    <p>
      Campaigns drop out over time. Compute a bias-adjusted index where dropped campaigns
      still contribute proportional weight to the denominator.
    </p>
    <button @click=${() => download(blob, `${id}.csv`)}>Download CSV</button>
    <input class="form-control" id="${id}" />
  `;

  return { id, title, weight, question, answer };
}
