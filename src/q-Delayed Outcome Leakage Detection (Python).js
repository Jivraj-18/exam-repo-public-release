import { html } from "lit-html";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-leakage-detection";
  const title = "Delayed Outcome Leakage Detection";

  const random = seedrandom(`${user.email}#${id}`);
  const rows = [];

  for (let i = 0; i < 200; i++) {
    const featureTime = random() * 100;
    const outcomeTime = 50 + random() * 40;
    rows.push({
      feature_time: featureTime,
      outcome_time: outcomeTime,
      value: random() * 10,
    });
  }

  const csv = ["feature_time,outcome_time,value", ...rows.map(r => `${r.feature_time},${r.outcome_time},${r.value}`)].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });

  const valid = rows.filter(r => r.feature_time < r.outcome_time);
  const expected = valid.reduce((s, r) => s + r.value, 0) / valid.length;

  const answer = async v => {
    const n = Number(v);
    if (!Number.isFinite(n)) throw new Error("Enter numeric average.");
    if (Math.abs(n - expected) > 0.1) throw new Error("Incorrect leakage-adjusted average.");
    return true;
  };

  const question = html`
    <h2>Delayed Outcome Leakage</h2>
    <p>
      Remove features whose timestamps occur after the outcome. Compute the
      average value of the remaining features.
    </p>
    <button @click=${() => download(blob, `${id}.csv`)}>Download CSV</button>
    <input class="form-control" id="${id}" />
  `;

  return { id, title, weight, question, answer };
}
