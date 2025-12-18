import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

const isoNoMs = (d) => d.toISOString().replace(".000Z", "Z");

export default async function({ user, weight = 1 }) {
  const id = "q-python-duckdb-join-dedup-events";
  const title = "Python Data Prep (duckdb): Join + Deduplicate Event Streams";
  const random = seedrandom(`${user.email}#${id}`);

  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;
  const plans = ["Free", "Basic", "Pro"];
  const plan = "Pro";

  // customers.csv
  /** @type {Array<{customer_id: string, plan: string, signup_at: Date}>} */
  const customers = [];
  const customerCount = 400 + randInt(0, 120);
  const signupStart = new Date("2024-01-01T00:00:00Z");
  const signupEnd = new Date("2024-06-30T23:59:59Z");
  const randSignup = () =>
    new Date(signupStart.getTime() + random() * (signupEnd.getTime() - signupStart.getTime()));
  for (let i = 1; i <= customerCount; i++) {
    customers.push({
      customer_id: `C${String(i).padStart(5, "0")}`,
      plan: random() < 0.32 ? "Pro" : pick(plans, random),
      signup_at: randSignup(),
    });
  }

  const cutoff = new Date(signupStart.getTime() + (0.35 + random() * 0.45) * (signupEnd.getTime() - signupStart.getTime()));
  const cutoffIso = isoNoMs(cutoff);

  const customersCsv = [
    ["customer_id", "plan", "signup_at"].join(","),
    ...customers.map((c) => [c.customer_id, c.plan, isoNoMs(c.signup_at)].join(",")),
  ].join("\n");

  // events.csv (with duplicates)
  /** @type {Array<{event_id: string, customer_id: string, event_type: string, amount_cents: number, ingested_at: Date}>} */
  const events = [];
  const eventTypes = ["purchase", "refund", "support"];
  const ingestStart = new Date("2024-07-01T00:00:00Z");
  const ingestEnd = new Date("2024-09-30T23:59:59Z");
  const randIngest = () => new Date(ingestStart.getTime() + random() * (ingestEnd.getTime() - ingestStart.getTime()));

  const baseEvents = 1400 + randInt(0, 400);
  for (let i = 1; i <= baseEvents; i++) {
    const eid = `E${String(i).padStart(6, "0")}`;
    const customer = pick(customers, random).customer_id;
    const type = pick(eventTypes, random);
    const amount = type === "purchase" ? randInt(199, 25999) : type === "refund" ? -randInt(199, 9999) : 0;
    events.push({ event_id: eid, customer_id: customer, event_type: type, amount_cents: amount, ingested_at: randIngest() });
  }

  // Add duplicates with later ingested_at (same event_id, possibly corrected amount/type).
  const dupCount = 220 + randInt(0, 90);
  for (let i = 0; i < dupCount; i++) {
    const original = events[randInt(0, events.length - 1)];
    const later = new Date(original.ingested_at.getTime() + randInt(5, 240) * 60 * 1000);
    const correctedType = random() < 0.12 ? "refund" : original.event_type;
    const correctedAmount =
      correctedType === "purchase"
        ? Math.abs(original.amount_cents) + randInt(-200, 600)
        : correctedType === "refund"
        ? -Math.abs(original.amount_cents || randInt(199, 9999))
        : 0;
    events.push({
      event_id: original.event_id,
      customer_id: original.customer_id,
      event_type: correctedType,
      amount_cents: correctedAmount,
      ingested_at: later,
    });
  }

  const eventsCsv = [
    ["event_id", "customer_id", "event_type", "amount_cents", "ingested_at"].join(","),
    ...events.map((e) => [e.event_id, e.customer_id, e.event_type, String(e.amount_cents), isoNoMs(e.ingested_at)].join(",")),
  ].join("\n");

  const blobCustomers = new Blob([customersCsv], { type: "text/csv" });
  const blobEvents = new Blob([eventsCsv], { type: "text/csv" });

  // Expected: dedupe events by event_id keeping max ingested_at; join customers; filter plan==Pro and signup_at < cutoff; sum purchase amount_cents (only purchase rows, positive) and return integer cents.
  /** @type {Map<string, {customer_id: string, event_type: string, amount_cents: number, ingested_at: Date}>} */
  const latestByEvent = new Map();
  for (const e of events) {
    const cur = latestByEvent.get(e.event_id);
    if (!cur || e.ingested_at.getTime() > cur.ingested_at.getTime()) {
      latestByEvent.set(e.event_id, e);
    }
  }

  /** @type {Map<string, {plan: string, signup_at: Date}>} */
  const custMap = new Map(customers.map((c) => [c.customer_id, { plan: c.plan, signup_at: c.signup_at }]));

  let expectedCents = 0;
  for (const e of latestByEvent.values()) {
    if (e.event_type !== "purchase") continue;
    if (e.amount_cents <= 0) continue;
    const c = custMap.get(e.customer_id);
    if (!c) continue;
    if (c.plan !== plan) continue;
    if (c.signup_at.getTime() >= cutoff.getTime()) continue;
    expectedCents += e.amount_cents;
  }

  const answer = async (value) => {
    if (typeof value === "string") value = value.replace(/[^\d-]/g, "");
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) throw new Error("Enter the summed purchase amount (cents) as an integer.");
    if (Math.abs(numeric - expectedCents) > 0) {
      throw new Error(
        `Mismatch. Steps: (1) dedupe events by event_id keeping latest ingested_at, (2) join customers, (3) filter customers where plan=="${plan}" and signup_at < ${cutoffIso}, (4) keep event_type=="purchase" and amount_cents>0, (5) sum amount_cents.`,
      );
    }
    return true;
  };

  const previewCustomers = customersCsv.split("\n").slice(0, 10).join("\n");
  const previewEvents = eventsCsv.split("\n").slice(0, 10).join("\n");

  const question = html`
    <div class="mb-3">
      <h2>Join + dedupe with <code>duckdb</code> (Python)</h2>
      <p>
        You receive an append-only events stream with duplicates (same <code>event_id</code>) due to late corrections.
        You want the latest version of each event, joined to customer metadata.
      </p>

      <h3>Your task (use Python + duckdb)</h3>
      <ol>
        <li>Load <code>customers.csv</code> and <code>events.csv</code> into DuckDB.</li>
        <li>Deduplicate <code>events</code> by <code>event_id</code>, keeping the row with the latest <code>ingested_at</code>.</li>
        <li>Join to customers on <code>customer_id</code>.</li>
        <li>Filter to customers with <code>plan == "Pro"</code> and <code>signup_at &lt; ${cutoffIso}</code>.</li>
        <li>Filter to <code>event_type == "purchase"</code> and <code>amount_cents &gt; 0</code>.</li>
        <li>Compute the sum of <code>amount_cents</code> (integer).</li>
      </ol>

      <p class="mb-2">
        Download:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blobCustomers, `${id}-customers.csv`)}>
          ${id}-customers.csv
        </button>
        <button class="btn btn-sm btn-outline-primary ms-2" type="button" @click=${() => download(blobEvents, `${id}-events.csv`)}>
          ${id}-events.csv
        </button>
      </p>

      <details class="mb-3">
        <summary>Preview customers.csv</summary>
        <pre style="white-space: pre-wrap"><code class="language-csv">${previewCustomers}</code></pre>
      </details>
      <details class="mb-3">
        <summary>Preview events.csv</summary>
        <pre style="white-space: pre-wrap"><code class="language-csv">${previewEvents}</code></pre>
      </details>

      <label for="${id}" class="form-label">
        What is the total <code>purchase</code> amount (in cents) after deduplication and filtering?
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}


