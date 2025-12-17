import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;

export default async function({ user, weight = 1 }) {
  const id = "q-visualization-moving-average";
  const title = "7-day Moving Average & Chart Choice";
  const random = seedrandom(`${user.email}#${id}`);

  const days = Array.from({ length: 21 }, (_, i) => ({
    day: `Day ${i + 1}`,
    value: randInt(random, 140, 360),
  }));
  const last7 = days.slice(-7).map((d) => d.value);
  const movingAvg = Number((last7.reduce((a, b) => a + b, 0) / last7.length).toFixed(2));

  const question = html`
    <div class="mb-3">
      <h4>Data Analysis + Visualization</h4>
      <p>Compute the trailing 7-day moving average for the metric below and choose the best visualization to show this time-series trend on a dashboard.</p>
      <pre style="white-space: pre-wrap"><code class="language-json">${JSON.stringify(days, null, 2)}</code></pre>
      <p>Return JSON: <code>{"movingAvg": number, "chart": "line|bar|pie|heatmap"}</code>. Use two decimals for the average.</p>
      <input class="form-control" id="${id}" name="${id}" placeholder='{"movingAvg":123.45,"chart":"line"}' />
    </div>
  `;

  const answer = (input) => {
    if (!input) throw new Error("Answer required");
    let data;
    try {
      data = JSON.parse(String(input));
    } catch {
      throw new Error("Must be valid JSON");
    }
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("Use an object");
    if (!("movingAvg" in data) || !("chart" in data)) return false;
    const avgOk = Math.abs(Number(data.movingAvg) - movingAvg) < 0.01;
    const chartOk = String(data.chart).toLowerCase() === "line";
    return avgOk && chartOk;
  };

  return { id, title, weight, question, answer };
}