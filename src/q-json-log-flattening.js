import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1.5 }) {
  const id = "q-json-log-flattening";
  const title = "Data Prep: Nested Log Flattening & Deduplication";
  const userEmail = user?.email || "guest@example.com";
  const random = seedrandom(`${userEmail}#${id}`);

  const categories = ["Security", "System", "Application", "Network"];
  const servers = ["srv-alpha", "srv-beta", "srv-gamma"];
  const records = [];
  
  // Generate messy nested logs
  for (let i = 0; i < 300; i++) {
    const timestamp = new Date(2024, 5, 1, 10, i).toISOString();
    const server = pick(servers, random);
    const category = pick(categories, random);
    // Intentional duplicates: 10% chance to repeat the previous server/timestamp
    const isDuplicate = i > 0 && random() < 0.1;
    
    const log = {
      meta: {
        ts: isDuplicate ? records[records.length - 1].meta.ts : timestamp,
        origin: isDuplicate ? records[records.length - 1].meta.origin : server
      },
      details: {
        type: category,
        code: Math.floor(random() * 500) + 100,
        severity: random() < 0.2 ? "HIGH" : "LOW"
      }
    };
    records.push(log);
  }

  const jsonl = records.map(r => JSON.stringify(r)).join("\n");

  // Logic: Flatten, then deduplicate by (ts + origin), then count HIGH severity for a specific server
  const targetServer = pick(servers, random);
  
  // Solution calculation:
  const uniqueSeen = new Set();
  let highSeverityCount = 0;

  records.forEach(r => {
    const key = `${r.meta.ts}-${r.meta.origin}`;
    if (!uniqueSeen.has(key)) {
      uniqueSeen.add(key);
      if (r.meta.origin === targetServer && r.details.severity === "HIGH") {
        highSeverityCount++;
      }
    }
  });

  const answer = async (value) => {
    const numeric = parseInt(value);
    if (isNaN(numeric)) throw new Error("Please enter a numeric count.");
    
    // Check if they forgot to deduplicate
    const withoutDedup = records.filter(r => r.meta.origin === targetServer && r.details.severity === "HIGH").length;
    if (numeric === withoutDedup && numeric !== highSeverityCount) {
      throw new Error("Incorrect. Your count includes duplicate log entries. You must deduplicate by timestamp and origin first.");
    }
    
    if (numeric !== highSeverityCount) {
      throw new Error("Incorrect count. Ensure you are flattening the nested 'meta' and 'details' objects correctly before filtering.");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Server Log Sanitization</h2>
      <p>
        You have received a raw JSONL (JSON Lines) file containing nested system logs. 
        The data is messy: some events were logged twice due to a retry-loop bug.
      </p>
      <p><strong>Your Task:</strong></p>
      <ol>
        <li>Flatten the nested JSON structure so you can access <code>meta.ts</code>, <code>meta.origin</code>, and <code>details.severity</code>.</li>
        <li><strong>Deduplicate</strong> the records. A record is a duplicate if it has the exact same <code>ts</code> and <code>origin</code>. Keep only the <em>first</em> occurrence.</li>
        <li>Count the number of <strong>HIGH</strong> severity events that occurred on <strong>${targetServer}</strong>.</li>
      </ol>
      <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(new Blob([jsonl], {type: "application/jsonl"}), `${id}.jsonl`)}>
        Download system_logs.jsonl
      </button>
      <div class="mt-3">
        <label>Number of unique HIGH severity events for ${targetServer}:</label>
        <input type="number" class="form-control" id="${id}" name="${id}" required />
      </div>
    </div>
  `;

  return { id, title, weight, question, answer };
}