import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-shell-log-audit";
  const title = "Shell: Filter live traffic logs";

  const random = seedrandom(`${user.email}#${id}`);

  const clusters = ["use1", "euw2", "aps1"];
  const methods = ["GET", "POST", "PUT"];
  const paths = [
    "/api/orders/import",
    "/api/orders/bulk",
    "/api/orders",
    "/api/catalog/items",
    "/download/report/monthly",
    "/download/report/weekly",
  ];
  const agents = [
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6)",
    "Mozilla/5.0 (X11; Linux x86_64)",
    "curl/8.5.0",
    "python-httpx/0.27.0",
  ];

  const pick = (arr) => arr[Math.floor(random() * arr.length)];
  const randint = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  const pad2 = (n) => String(n).padStart(2, "0");
  const isoZ = (d) =>
    `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}T${pad2(d.getUTCHours())}:${
      pad2(d.getUTCMinutes())
    }:${pad2(d.getUTCSeconds())}Z`;

  // We'll generate 3 weeks of log lines so "Mondays 06:00–12:00 UTC" is meaningful.
  const start = new Date("2024-04-01T00:00:00Z");
  const lines = [];

  // Define the filter for the question
  const targetCluster = "euw2";
  const targetPathPrefix = "/api/orders";
  const targetMethod = "POST";
  const dayName = "Monday";
  const hourStart = 6; // inclusive
  const hourEnd = 12; // exclusive

  // Ensure there is always at least 1 matching line
  let expectedCount = 0;

  const totalLines = 320;
  for (let i = 0; i < totalLines; i++) {
    const d = new Date(start.getTime() + randint(0, 21 * 24 * 60 * 60) * 1000);
    const method = pick(methods);
    const path = pick(paths);
    const cluster = pick(clusters);
    const status = randint(100, 599);
    const bytes = randint(120, 98000);
    const rt = randint(5, 1800);
    const referer = pick([
      "https://console.orbit.example.com",
      "https://app.orbit.example.com",
      "https://finance.orbit.example.com",
      "-",
    ]);
    const agent = pick(agents);

    // Make POST /api/orders* slightly more common in euw2 to create realistic skew.
    if (random() < 0.18) {
      d.setUTCDate(d.getUTCDate() + (1 - d.getUTCDay())); // shift towards Monday-ish
    }

    const line = `${isoZ(d)} ${method} ${path} status=${status} bytes=${bytes} rt=${rt}ms cluster=${cluster} referer="${
      referer === "-" ? "" : referer
    }" agent="${agent}"`;
    lines.push(line);

    const isMonday = d.getUTCDay() === 1;
    const isHourMatch = d.getUTCHours() >= hourStart && d.getUTCHours() < hourEnd;
    const isPathMatch = path.startsWith(targetPathPrefix);
    const isSuccess = status >= 200 && status <= 299;

    if (method === targetMethod && cluster === targetCluster && isMonday && isHourMatch && isPathMatch && isSuccess) {
      expectedCount++;
    }
  }

  // Force at least one match, deterministically, if generation missed.
  if (expectedCount === 0) {
    const forced = new Date("2024-04-08T08:15:00Z"); // Monday
    const status = 201;
    const bytes = 4242;
    const rt = 210;
    const line = `${isoZ(forced)} POST /api/orders/bulk status=${status} bytes=${bytes} rt=${rt}ms cluster=euw2 referer="https://console.orbit.example.com" agent="curl/8.5.0"`;
    lines.push(line);
    expectedCount = 1;
  }

  const blob = new Blob([lines.join("\n") + "\n"], { type: "text/plain" });

  const answer = async (input) => {
    if (!input) throw new Error("Enter a number.");
    const n = Number(String(input).trim().replace(/[^\d.-]/g, ""));
    if (!Number.isFinite(n)) throw new Error("Enter a valid number (the count).");
    if (n !== expectedCount) {
      throw new Error(
        `Incorrect. Re-check filters: ${targetMethod} ${targetPathPrefix}* in ${targetCluster}, ${dayName} 06:00–12:00 UTC, status 2xx.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Traffic audit for Orbit Commerce (offline log sample)</h2>
      <p>
        You’re on-call and need to quantify a burst of traffic. The access log format is:
      </p>
      <pre><code>2024-04-17T14:23:11Z GET /api/catalog/items status=200 bytes=32844 rt=245ms cluster=use1 referer="..." agent="..."</code></pre>

      <h3>Your shell task</h3>
      <ol>
        <li>Download the log file.</li>
        <li>Filter for <strong>${targetMethod}</strong> requests whose path starts with <code>${targetPathPrefix}</code>.</li>
        <li>Restrict to the <code>${targetCluster}</code> cluster.</li>
        <li>Keep only <strong>${dayName}s</strong> between <strong>${hourStart}:00 and ${hourEnd}:00 UTC</strong>.</li>
        <li>Count only successful requests (<code>status</code> 200–299).</li>
      </ol>

      <p>
        Download the traffic log:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.log`)}>
          ${id}.log
        </button>
      </p>

      <label for="${id}" class="form-label">
        How many successful requests match all filters?
      </label>
      <input class="form-control" id="${id}" name="${id}" inputmode="numeric" required />
      <p class="text-muted">
        Tip: use a pipeline with <code>grep</code>/<code>awk</code>/<code>wc -l</code>. Use UTC timestamps.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}


