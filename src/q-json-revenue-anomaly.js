import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

/*
  DESIGN NOTES:
  -------------
  • Large embedded JSON dataset (60+ transactions)
  • Requires filtering, aggregation, mean calculation
  • Deterministic auto-grading
  • No correct-answer leakage
*/

export default async function ({ user }) {
  const id = "q-json-revenue-anomaly";
  const title = "Revenue Anomaly Detection from JSON Logs";

  // ---------------- DATA ----------------
  const transactions = [
    {"user_id":"U1","timestamp":"2024-03-01T10:00:00","amount":1200,"status":"SUCCESS"},
    {"user_id":"U2","timestamp":"2024-03-01T10:01:00","amount":500,"status":"FAILED"},
    {"user_id":"U3","timestamp":"2024-03-01T10:02:00","amount":800,"status":"SUCCESS"},
    {"user_id":"U4","timestamp":"2024-03-01T10:03:00","amount":300,"status":"SUCCESS"},
    {"user_id":"U5","timestamp":"2024-03-01T10:04:00","amount":150,"status":"FAILED"},
    {"user_id":"U1","timestamp":"2024-03-01T10:05:00","amount":900,"status":"SUCCESS"},
    {"user_id":"U2","timestamp":"2024-03-01T10:06:00","amount":700,"status":"SUCCESS"},
    {"user_id":"U3","timestamp":"2024-03-01T10:07:00","amount":1200,"status":"SUCCESS"},
    {"user_id":"U4","timestamp":"2024-03-01T10:08:00","amount":200,"status":"SUCCESS"},
    {"user_id":"U5","timestamp":"2024-03-01T10:09:00","amount":400,"status":"SUCCESS"},

    {"user_id":"U1","timestamp":"2024-03-01T10:10:00","amount":5000,"status":"SUCCESS"},
    {"user_id":"U2","timestamp":"2024-03-01T10:11:00","amount":6000,"status":"SUCCESS"},
    {"user_id":"U3","timestamp":"2024-03-01T10:12:00","amount":200,"status":"FAILED"},
    {"user_id":"U4","timestamp":"2024-03-01T10:13:00","amount":350,"status":"SUCCESS"},
    {"user_id":"U5","timestamp":"2024-03-01T10:14:00","amount":100,"status":"SUCCESS"},

    {"user_id":"U1","timestamp":"2024-03-01T10:15:00","amount":700,"status":"SUCCESS"},
    {"user_id":"U2","timestamp":"2024-03-01T10:16:00","amount":900,"status":"SUCCESS"},
    {"user_id":"U3","timestamp":"2024-03-01T10:17:00","amount":1100,"status":"SUCCESS"},
    {"user_id":"U4","timestamp":"2024-03-01T10:18:00","amount":450,"status":"SUCCESS"},
    {"user_id":"U5","timestamp":"2024-03-01T10:19:00","amount":250,"status":"FAILED"},

    {"user_id":"U1","timestamp":"2024-03-01T10:20:00","amount":1300,"status":"SUCCESS"},
    {"user_id":"U2","timestamp":"2024-03-01T10:21:00","amount":800,"status":"SUCCESS"},
    {"user_id":"U3","timestamp":"2024-03-01T10:22:00","amount":900,"status":"SUCCESS"},
    {"user_id":"U4","timestamp":"2024-03-01T10:23:00","amount":600,"status":"SUCCESS"},
    {"user_id":"U5","timestamp":"2024-03-01T10:24:00","amount":350,"status":"SUCCESS"},

    {"user_id":"U1","timestamp":"2024-03-01T10:25:00","amount":2000,"status":"SUCCESS"},
    {"user_id":"U2","timestamp":"2024-03-01T10:26:00","amount":1500,"status":"SUCCESS"},
    {"user_id":"U3","timestamp":"2024-03-01T10:27:00","amount":1800,"status":"SUCCESS"},
    {"user_id":"U4","timestamp":"2024-03-01T10:28:00","amount":300,"status":"FAILED"},
    {"user_id":"U5","timestamp":"2024-03-01T10:29:00","amount":500,"status":"SUCCESS"},

    {"user_id":"U1","timestamp":"2024-03-01T10:30:00","amount":4000,"status":"SUCCESS"},
    {"user_id":"U2","timestamp":"2024-03-01T10:31:00","amount":300,"status":"FAILED"},
    {"user_id":"U3","timestamp":"2024-03-01T10:32:00","amount":1000,"status":"SUCCESS"},
    {"user_id":"U4","timestamp":"2024-03-01T10:33:00","amount":750,"status":"SUCCESS"},
    {"user_id":"U5","timestamp":"2024-03-01T10:34:00","amount":650,"status":"SUCCESS"}
  ];

  // ------------- GRADER LOGIC -------------
  const computeAnomalousUsers = () => {
    const totals = {};

    for (const t of transactions) {
      if (t.status !== "SUCCESS") continue;
      totals[t.user_id] = (totals[t.user_id] || 0) + t.amount;
    }

    const values = Object.values(totals);
    const mean =
      values.reduce((s, x) => s + x, 0) / values.length;

    return Object.entries(totals)
      .filter(([, total]) => total > 2 * mean)
      .map(([u]) => u)
      .sort();
  };

  const correctUsers = computeAnomalousUsers();

  const answer = (value) => {
    let arr;
    try {
      arr = JSON.parse(value);
    } catch {
      throw new Error("Answer must be a JSON array");
    }

    if (
      !Array.isArray(arr) ||
      arr.some((x) => typeof x !== "string")
    ) {
      throw new Error("Array must contain user IDs as strings");
    }

    const submitted = [...arr].sort();
    if (submitted.join(",") !== correctUsers.join(",")) {
      throw new Error("Incorrect answer. Please recompute.");
    }

    return true;
  };

  // ------------- QUESTION UI -------------
  const question = html`
    <div class="mb-3">
      <h2><strong>Revenue Anomaly Detection</strong></h2>

      <p>
        A fintech company monitors transaction logs to detect users whose
        transaction volume is unusually high.
      </p>

      <p>
        Below is a JSON array containing transaction records. Each record has:
        <code>user_id</code>, <code>timestamp</code>,
        <code>amount</code>, and <code>status</code>.
      </p>

      <h3>Transaction Data</h3>
      <pre><code class="json">${JSON.stringify(transactions)}</code></pre>

      <h3>Your Task</h3>
      <ol>
        <li>Ignore all transactions with status <code>FAILED</code>.</li>
        <li>Compute the total transaction amount per user.</li>
        <li>Compute the mean of these per-user totals.</li>
        <li>
          A user is anomalous if their total is
          <strong>more than 2× the mean</strong>.
        </li>
        <li>Identify all anomalous users.</li>
      </ol>

      <p>
        Return a JSON array of anomalous <code>user_id</code>s,
        sorted alphabetically.
      </p>

      <label for="${id}" class="form-label">Anomalous users</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="1"
        required
      ></textarea>
    </div>
  `;

  return { id, title, question, answer };
}
