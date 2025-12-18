import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-bash-json-aggregation";
  const title = "Bash: JSON Log Aggregation";

  const random = seedrandom(`${user.email}#${id}`);

  const services = ["auth", "payments", "search", "profile"];
  const logs = Array.from({ length: 120 }, () => ({
    service: services[Math.floor(random() * services.length)],
    status: random() < 0.8 ? 200 : 500,
    latency: Math.floor(50 + random() * 450),
  }));

  const expected = {};
  logs
    .filter((l) => l.status === 200)
    .forEach((l) => {
      expected[l.service] ??= [];
      expected[l.service].push(l.latency);
    });

  const averages = Object.entries(expected)
    .map(([k, v]) => [k, Math.round(v.reduce((a, b) => a + b, 0) / v.length)])
    .sort((a, b) => b[1] - a[1]);

  const answer = (output) => {
    const lines = output.trim().split("\n");
    if (lines.length !== averages.length) throw new Error("Incorrect number of lines");

    lines.forEach((line, i) => {
      const [svc, val] = line.split(/\s+/);
      if (svc !== averages[i][0] || Number(val) !== averages[i][1]) {
        throw new Error("Incorrect aggregation or ordering");
      }
    });
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Operational Diagnostics at CloudServe</h2>
      <p>
        CloudServe services emit JSON logs for every request. Engineers use command-line tools to quickly analyze
        performance during incidents.
      </p>
      <p>
        Each record contains <code>service</code>, <code>status</code>, and <code>latency</code>.
      </p>

      <h2>Your Task</h2>
      <ol>
        <li>Filter logs where <code>status = 200</code></li>
        <li>Group by <code>service</code></li>
        <li>Compute average latency</li>
        <li>Sort by highest average latency</li>
      </ol>

      <pre><code class="json">${JSON.stringify(logs, null, 2)}</code></pre>

      <label class="form-label">Enter the output (one line per service):</label>
      <textarea class="form-control" rows="4"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
