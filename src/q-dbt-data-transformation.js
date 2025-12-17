import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-dbt-user-activity-transformation";
  const title = "Data Transformation with dbt";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  const users = ["u1", "u2", "u3", "u4", "u5"];
  const pages = ["home", "search", "profile", "checkout"];
  const actions = ["view", "click"];

  // raw event-level data (similar to logs / staging models in dbt)
  const events = Array.from({ length: 20 }, () => ({
    user_id: pick(users),
    page: pick(pages),
    action: pick(actions),
    duration_seconds: Math.floor(random() * 300) + 10,
  }));

  /**
   * Transformation goal (dbt-style):
   * - Filter only "view" actions
   * - Aggregate total time spent per user
   * - Round totals to nearest integer
   */
  const expected = {};
  for (const e of events) {
    if (e.action === "view") {
      expected[e.user_id] =
        (expected[e.user_id] || 0) + e.duration_seconds;
    }
  }

  Object.keys(expected).forEach(
    (k) => (expected[k] = Math.round(expected[k]))
  );

  const answer = (input) => {
    const parsed = JSON.parse(input);
    return Object.keys(expected).every(
      (u) => parsed[u] === expected[u]
    );
  };

  const question = html`
    <div class="mb-3">
      <p>
        You are building a <strong>dbt model</strong> on top of raw user
        activity logs.
      </p>

      <p><strong>Task:</strong></p>
      <ol>
        <li>Keep only rows where <code>action = "view"</code></li>
        <li>Group by <code>user_id</code></li>
        <li>Compute <strong>total time spent</strong> (sum of
          <code>duration_seconds</code>)</li>
        <li>Round totals to the nearest integer</li>
      </ol>

      <pre style="white-space: pre-wrap"><code class="language-json">
${JSON.stringify(events, null, 2)}
      </code></pre>

      <label for="${id}" class="form-label">
        Enter a JSON object mapping <code>user_id → total_time</code>
      </label>

      <input class="form-control" id="${id}" name="${id}" />

      <p class="text-muted">
        Example: <code>{"u1": 542, "u3": 129}</code>
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
