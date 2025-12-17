import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-csv-anomaly-detection";
  const title = "Detect anomalies in CSV data";
  const random = seedrandom(`${user.email}#${id}`);

  const rows = [["timestamp", "value"]];
  const values = [];

  for (let i = 0; i < 300; i++) {
    let v = Math.round((random() * 20 + 50) * 100) / 100;
    if (random() < 0.03) v *= 4; // inject anomaly
    values.push(v);
    rows.push([`2024-07-${String((i % 28) + 1).padStart(2, "0")}`, v]);
  }

  const mean =
    values.reduce((a, b) => a + b, 0) / values.length;
  const std = Math.sqrt(
    values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length
  );

  const anomalies = values.filter(v => v > mean + 3 * std).length;

  const csv = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });

  const answer = async (val) => {
    const n = Number(val);
    if (!Number.isFinite(n)) throw new Error("Enter a number");
    if (n !== anomalies) throw new Error("Incorrect anomaly count");
    return true;
  };

  const question = html`
    <p>Download the dataset and detect anomalies.</p>
    <p>An anomaly is defined as <code>value &gt; mean + 3 × std</code>.</p>
    <button @click=${() => download(blob, `${id}.csv`)}>Download CSV</button>
    <label>How many anomalies exist?</label>
    <input id="${id}" />
  `;

  return { id, title, weight, question, answer };
}