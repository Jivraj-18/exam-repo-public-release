import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1.25 }) {
  const id = "q-rolling-anomaly";
  const title = "Rolling Average Anomaly Detection";

  const random = seedrandom(`${user.email}#${id}`);
  
  // Generate 60 days of traffic data
  const data = [];
  let baseTraffic = 100;
  for (let i = 0; i < 60; i++) {
    // Add random noise + occasional spike
    let val = baseTraffic + (random() * 40 - 20);
    if (random() > 0.9) val += 100; // Spike
    data.push({ day: i + 1, visits: Math.round(val) });
  }

  // Logic: 
  // Calculate 5-day trailing average (exclusive of current day).
  // e.g., for day 6, avg(day 1..5).
  // Identify days where visits > 1.5 * trailing_avg.
  // Start checking from Day 6.

  const anomalies = [];
  for (let i = 5; i < data.length; i++) {
    const window = data.slice(i - 5, i);
    const avg = window.reduce((sum, d) => sum + d.visits, 0) / 5;
    if (data[i].visits > 1.5 * avg) {
      anomalies.push({ day: data[i].day, visits: data[i].visits, avg: Number(avg.toFixed(2)) });
    }
  }

  const answer = (input) => {
    try {
      const arr = JSON.parse(input);
      if (arr.length !== anomalies.length) throw new Error("Count mismatch");
      return arr.every((item, i) => 
        item.day === anomalies[i].day && 
        Math.abs(item.avg - anomalies[i].avg) < 0.1
      );
    } catch (e) { throw e; }
  };

  const question = html`
    <div class="mb-3">
      <p>
        Analyze the daily traffic data below to find anomalies using a <strong>5-day trailing moving average</strong>.
      </p>
      <ol>
        <li>For each day (starting from Day 6), calculate the average visits of the <strong>previous 5 days</strong>.</li>
        <li>Identify days where the current visit count is strictly greater than <strong>1.5x</strong> the trailing average.</li>
        <li>Return a JSON array of objects: <code>{ "day": 12, "visits": 200, "avg": 120.50 }</code>.</li>
      </ol>
      <pre style="white-space: pre-wrap; max-height: 200px; overflow: auto;"><code class="language-json">${JSON.stringify(data)}</code></pre>
      <label for="${id}" class="form-label">Anomalies JSON:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}