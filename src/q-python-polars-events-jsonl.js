import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1 }) {
  const id = "q-python-polars-events-jsonl";
  const title = "Python Data Prep (polars): Normalize JSONL Events";
  const random = seedrandom(`${user.email}#${id}`);

  const plans = ["Free", "Basic", "Pro"];
  const eventTypes = ["view", "click", "scroll", "purchase"];
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;
  const start = new Date("2024-05-01T00:00:00Z");
  const end = new Date("2024-08-31T23:59:59Z");
  const randDate = () => new Date(start.getTime() + random() * (end.getTime() - start.getTime()));

  const proRatio = 0.28 + random() * 0.12;

  /** @type {Array<{user_id: string, plan: string, event: {type: string, duration_ms: number | string}, ts: string}>} */
  const events = [];
  const n = 1200;
  for (let i = 0; i < n; i++) {
    const userId = `U${String(randInt(1, 75)).padStart(3, "0")}`;
    const plan = random() < proRatio ? "Pro" : pick(plans, random);
    const type = pick(eventTypes, random);
    const duration = type === "purchase" ? randInt(50, 400) : randInt(200, 9000);
    const durationMs = random() < 0.22 ? `${duration}` : duration;
    events.push({
      user_id: userId,
      plan,
      event: { type, duration_ms: durationMs },
      ts: randDate().toISOString(),
    });
  }

  const jsonl = events.map((e) => JSON.stringify(e)).join("\n");
  const blob = new Blob([jsonl], { type: "application/jsonl" });

  // Expected: Pro + view only; duration_ms coerced to number; group by user_id; mean; take max mean.
  /** @type {Map<string, {sum: number, count: number}>} */
  const agg = new Map();
  for (const e of events) {
    if (e.plan !== "Pro") continue;
    if (e.event.type !== "view") continue;
    const dur = Number(e.event.duration_ms);
    if (!Number.isFinite(dur)) continue;
    const cur = agg.get(e.user_id) ?? { sum: 0, count: 0 };
    cur.sum += dur;
    cur.count += 1;
    agg.set(e.user_id, cur);
  }

  let expectedMaxMean = 0;
  for (const { sum, count } of agg.values()) {
    if (!count) continue;
    expectedMaxMean = Math.max(expectedMaxMean, sum / count);
  }
  expectedMaxMean = Math.round(expectedMaxMean * 10) / 10;

  const answer = async (value) => {
    if (typeof value === "string") value = value.replace(/[^\d.-]/g, "");
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) throw new Error("Enter the max per-user mean duration (ms) as a number.");
    if (Math.abs(numeric - expectedMaxMean) > 0.1) {
      throw new Error(
        "Mismatch. Make sure you filter to plan==Pro and event.type==view, coerce duration_ms to numeric, then group by user_id and compute mean(duration_ms), then take the maximum mean across users. Round to 1 decimal.",
      );
    }
    return true;
  };

  const preview = jsonl.split("\n").slice(0, 8).join("\n");

  const question = html`
    <div class="mb-3">
      <h2>Normalize nested JSONL with <code>polars</code></h2>
      <p>
        Your analytics vendor sends newline-delimited JSON. The schema is nested and some numeric fields arrive as
        strings. You need a fast, lazy pipeline.
      </p>

      <h3>Your task (use Python + polars)</h3>
      <ol>
        <li>Read the JSONL file.</li>
        <li>Extract <code>event.type</code> and <code>event.duration_ms</code> into columns.</li>
        <li>Coerce <code>duration_ms</code> to a number.</li>
        <li>Filter to <code>plan == "Pro"</code> and <code>event.type == "view"</code>.</li>
        <li>Group by <code>user_id</code> and compute mean duration (ms).</li>
        <li>Report the <strong>maximum</strong> of these per-user means, rounded to 1 decimal.</li>
      </ol>

      <p>
        Download:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.jsonl`)}>
          ${id}.jsonl
        </button>
      </p>

      <details class="mb-3">
        <summary>Preview (first 7 lines)</summary>
        <pre style="white-space: pre-wrap"><code class="language-json">${preview}</code></pre>
      </details>

      <label for="${id}" class="form-label">
        What is the <strong>max</strong> per-user mean <code>duration_ms</code> for Pro-view events?
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
      <p class="text-muted">Round to 1 decimal place.</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}


