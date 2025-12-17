import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

const pick = (arr, random) => arr[Math.floor(random() * arr.length)];

const minute = 60 * 1000;

export default async function({ user, weight = 1 }) {
  const id = "q-jq-jsonl-sessionize";
  const title = "JSONL Sessionization: count user sessions";

  const random = seedrandom(`${user.email}#${id}`);

  const users = Array.from({ length: 12 }, (_, i) => `u${String(i + 1).padStart(2, "0")}`);
  const events = ["view", "click", "search", "purchase", "logout"];

  const lines = [];
  const records = [];

  // generate events over a day
  const base = 1734300000000; // fixed
  const n = 260;

  for (let i = 0; i < n; i += 1) {
    const userId = pick(users, random);
    const ts = new Date(base + Math.floor(random() * 22 * 60) * minute + Math.floor(random() * 60) * 1000);
    const type = pick(events, random);

    const rec = {
      user_id: userId,
      ts: ts.toISOString(),
      event: type,
    };
    records.push(rec);
    lines.push(JSON.stringify(rec));
  }

  // Choose one user with enough events
  const grouped = new Map();
  for (const rec of records) {
    if (!grouped.has(rec.user_id)) grouped.set(rec.user_id, []);
    grouped.get(rec.user_id).push(rec);
  }

  const eligible = [...grouped.entries()]
    .map(([u, arr]) => [u, arr.sort((a, b) => a.ts.localeCompare(b.ts))])
    .filter(([, arr]) => arr.length >= 12);

  const [targetUser, userEvents] = pick(eligible, random);

  // session definition: new session starts if gap > 30 minutes
  const thresholdMs = 30 * minute;

  let sessions = 0;
  let last = null;
  for (const ev of userEvents) {
    const t = Date.parse(ev.ts);
    if (last === null || t - last > thresholdMs) sessions += 1;
    last = t;
  }

  const answer = (value) => {
    const numeric = Number(String(value).trim());
    if (!Number.isFinite(numeric)) throw new Error("Enter an integer session count");
    if (Math.round(numeric) !== numeric) throw new Error("Session count must be an integer");
    if (numeric !== sessions) throw new Error("Incorrect session count. Check ordering and gap rule.");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        You have a clickstream exported as JSON Lines (one JSON object per line). For a given user,
        define a <strong>session</strong> as a sequence of events where consecutive events are at most
        <strong>30 minutes</strong> apart. A new session starts when the gap between consecutive events is
        <strong>&gt; 30 minutes</strong>.
      </p>
      <ol>
        <li>Filter to records where <code>user_id == "${targetUser}"</code>.</li>
        <li>Sort by <code>ts</code> ascending.</li>
        <li>Count sessions using the gap rule above.</li>
      </ol>
      <pre style="white-space: pre-wrap"><code class="language-json">${lines.join("\n")}</code></pre>
      <label for="${id}" class="form-label">How many sessions does ${targetUser} have?</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
