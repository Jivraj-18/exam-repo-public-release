import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

const pick = (arr, random) => arr[Math.floor(random() * arr.length)];

const percentile = (values, p) => {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, Math.min(sorted.length - 1, idx))];
};

export default async function({ user, weight = 1 }) {
  const id = "q-regex-log-p95";
  const title = "Regex + Aggregation: 95th percentile latency";

  const random = seedrandom(`${user.email}#${id}`);

  const endpoints = ["/api/search", "/api/items", "/api/login", "/api/metrics", "/api/profile", "/health"];
  const bots = ["Googlebot", "Bingbot", "DuckDuckBot", "AhrefsBot", "SemrushBot"];
  const browsers = ["Chrome", "Firefox", "Safari", "Edge"];

  const lines = [];
  const latenciesByEndpoint = new Map();

  const linesCount = 220;

  for (let i = 0; i < linesCount; i += 1) {
    const endpoint = pick(endpoints, random);
    const status = random() < 0.85 ? 200 : pick([400, 401, 403, 404, 500], random);

    const isBot = random() < 0.22;
    const ua = isBot ? pick(bots, random) : pick(browsers, random);

    const latency = Math.round((15 + random() * 1200) * 10) / 10; // ms

    const ip = `${Math.floor(10 + random() * 240)}.${Math.floor(1 + random() * 254)}.${
      Math.floor(
        1 + random() * 254,
      )
    }.${Math.floor(1 + random() * 254)}`;

    const ts = new Date(1720000000000 + Math.floor(random() * 10_000_000)).toISOString();

    // log format intentionally a bit noisy
    lines.push(
      `${ts} ip=${ip} method=GET path=${endpoint} status=${status} latency_ms=${latency} ua="${ua}"`,
    );

    if (!isBot) {
      if (!latenciesByEndpoint.has(endpoint)) latenciesByEndpoint.set(endpoint, []);
      latenciesByEndpoint.get(endpoint).push(latency);
    }
  }

  // pick a target endpoint that has enough samples
  const eligible = [...latenciesByEndpoint.entries()].filter(([, arr]) => arr.length >= 25);
  const [targetEndpoint, samples] = pick(eligible, random);

  const expected = percentile(samples, 95);

  const answer = (value) => {
    const numeric = Number(String(value).trim());
    if (!Number.isFinite(numeric)) throw new Error("Enter a number (p95 latency in ms)");
    if (Math.abs(numeric - expected) > 0.05) {
      throw new Error("Incorrect p95. Ensure you excluded bots and used the correct percentile definition.");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        Youre analyzing API latency logs. Each line includes a path and a <code>latency_ms</code> value.
      </p>
      <ol>
        <li>Ignore any line where <code>ua</code> is a known bot (contains <code>bot</code>, case-insensitive).</li>
        <li>Filter to <strong>${targetEndpoint}</strong>.</li>
        <li>
          Compute the <strong>95th percentile</strong> of <code>latency_ms</code> using the
          <strong>nearest-rank</strong> method: sort values ascending and take the value at rank
          <code>ceil(0.95 * N)</code> (1-indexed).
        </li>
      </ol>
      <pre style="white-space: pre-wrap"><code>${lines.join("\n")}</code></pre>
      <label for="${id}" class="form-label">p95 latency for ${targetEndpoint} (ms)</label>
      <input class="form-control" id="${id}" name="${id}" />
      <p class="text-muted">Answer can include decimals.</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
