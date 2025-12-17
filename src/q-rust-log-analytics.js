import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-rust-log-analytics";
  const title = "Sessionize Web Logs (Analytics)";

  const rng = seedrandom(`${user.email}#${id}`);

  // Synthetic combined logs: ip, ts (ISO), path
  const ips = ["12.0.0.1", "12.0.0.2", "12.0.0.3"]; // few visitors
  const paths = ["/", "/docs", "/pricing", "/blog", "/blog/rust", "/blog/go", "/contact"];
  const start = Date.UTC(2025, 0, 15, 10, 0, 0);

  const logs = Array.from({ length: 120 }, (_, i) => {
    const ip = ips[Math.floor(rng() * ips.length)];
    const path = paths[Math.floor(rng() * paths.length)];
    // random walk in minutes
    const minute = Math.floor(rng() * 180);
    const ts = new Date(start + minute * 60 * 1000).toISOString();
    return { ip, ts, path };
  }).sort((a, b) => a.ts.localeCompare(b.ts));

  // Build sessions: new session if inactivity > 30 minutes per IP
  const SESSION_GAP_MS = 30 * 60 * 1000;
  /** @type {Record<string, {last:number, current:{paths:string[]}}>} */
  const state = {};
  /** @type {Array<{paths:string[]}>} */
  const allSessions = [];
  for (const { ip, ts, path } of logs) {
    const t = Date.parse(ts);
    const s = state[ip];
    const startNew = !s || t - s.last > SESSION_GAP_MS;
    if (startNew) {
      const session = { paths: [path] };
      state[ip] = { last: t, current: session };
      allSessions.push(session);
    } else {
      s.last = t;
      s.current.paths.push(path);
    }
  }

  // Aggregate visits per path across all sessions (not just the latest per IP)
  const counts = new Map();
  for (const s of allSessions) for (const p of s.paths) counts.set(p, (counts.get(p) || 0) + 1);
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "/";

  const answer = (input) => {
    const value = (input || "").trim();
    if (!value) throw new Error("Please enter a path like /docs");
    if (value !== top) throw new Error("Incorrect top path");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        You are analyzing web server logs to reconstruct user sessions.
        A new session starts for a visitor if there is inactivity longer than <code>30 minutes</code>.
        Based on the synthetic log dataset below, which <strong>path</strong> has the highest total visit count across all sessions?
      </p>
      <pre style="white-space: pre-wrap"><code class="language-json">${JSON.stringify(logs)}</code></pre>
      <label for="${id}" class="form-label">Top path (e.g., <code>/docs</code>):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
