import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1.25 }) {
  const id = "q-python-nested-json-events";
  const title = "Python: Nested JSON Event Analysis";

  const rng = seedrandom(`${user.email}#${id}`);

  // ---------- Data Generation ----------
  const users = ["U1", "U2", "U3", "U4", "U5"];
  const eventTypes = ["view", "click", "purchase"];

  const sessions = [];

  let expectedCount = 0;

  for (const userId of users) {
    const sessionCount = 2 + Math.floor(rng() * 3); // 2–4 sessions
    const userSessions = [];

    for (let s = 0; s < sessionCount; s++) {
      const eventCount = 3 + Math.floor(rng() * 4); // 3–6 events
      const events = [];

      let hasPurchase = false;

      for (let e = 0; e < eventCount; e++) {
        const type = eventTypes[Math.floor(rng() * eventTypes.length)];
        const value = Math.floor(5 + rng() * 120);

        if (type === "purchase" && value >= 50) {
          hasPurchase = true;
        }

        events.push({
          type,
          value,
          ts: new Date(Date.now() + rng() * 1e7).toISOString(),
        });
      }

      // Only count sessions with at least one qualifying purchase
      if (hasPurchase) expectedCount++;

      userSessions.push({
        session_id: `${userId}-S${s + 1}`,
        events,
      });
    }

    sessions.push({
      user_id: userId,
      sessions: userSessions,
    });
  }

  const jsonData = JSON.stringify({ users: sessions }, null, 2);

  // ---------- Answer Validation ----------
  const answer = async (response) => {
    if (!response) throw new Error("Enter the session count.");

    const value = parseInt(response.trim(), 10);
    if (Number.isNaN(value)) throw new Error("Enter a valid integer.");

    if (value !== expectedCount) {
      throw new Error(
        "Count the number of sessions that contain at least one purchase event with value ≥ 50."
      );
    }
    return true;
  };

  // ---------- Question UI ----------
  const question = html`
    <div class="mb-3">
      <h2>ShopTrack: Session Event Inspection</h2>

      <p>
        ShopTrack records user activity as nested JSON. Analysts frequently
        inspect <strong>session-level behavior</strong> derived from event
        streams.
      </p>

      <h3>Task</h3>
      <ol>
        <li>Load the nested JSON into Python.</li>
        <li>Flatten users → sessions → events.</li>
        <li>
          Identify sessions containing at least one
          <code>purchase</code> event with <code>value ≥ 50</code>.
        </li>
        <li>
          Return the <strong>number of such sessions</strong>.
        </li>
      </ol>

      <details class="mb-3">
        <summary>Nested JSON Input</summary>
        <pre>${jsonData}</pre>
      </details>

      <label for="${id}" class="form-label">
        How many sessions contain a qualifying purchase?
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        placeholder="e.g. 7"
        required
      />

      <p class="text-muted">
        Hint: Use <code>json_normalize</code> and <code>explode</code> to flatten
        the structure.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
