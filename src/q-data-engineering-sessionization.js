import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1.25 }) {
  const id = "q-session-gaps";
  const title = "User Session Reconstruction";
  const random = seedrandom(`${user.email}#${id}`);

  // Generate a sorted stream of event timestamps (minutes from start)
  let t = 0;
  const events = [];
  for (let i = 0; i < 30; i++) {
    // Random jumps: small (active) or large (new session)
    const jump = random() > 0.8 ? Math.floor(random() * 100) + 31 : Math.floor(random() * 10) + 1;
    t += jump;
    events.push(t);
  }

  // Logic: Break into sessions. A new session starts if (current_time - prev_time) > 30 mins.
  // Calculate session duration (end - start) and event count for each session.
  // Session 1 always starts at events[0].
  
  const sessions = [];
  let currentSession = { start: events[0], end: events[0], count: 1 };
  
  for (let i = 1; i < events.length; i++) {
    if (events[i] - events[i-1] > 30) {
      // Close current
      sessions.push({ ...currentSession, duration: currentSession.end - currentSession.start });
      // Start new
      currentSession = { start: events[i], end: events[i], count: 1 };
    } else {
      // Extend current
      currentSession.end = events[i];
      currentSession.count++;
    }
  }
  // Push last
  sessions.push({ ...currentSession, duration: currentSession.end - currentSession.start });

  const answer = (input) => {
    const arr = JSON.parse(input);
    if (arr.length !== sessions.length) throw new Error("Session count mismatch");
    return JSON.stringify(arr) === JSON.stringify(sessions);
  };

  const question = html`
    <div class="mb-3">
      <p>
        Reconstruct user sessions from the event timestamps below (values are minutes from T0).
      </p>
      <ul>
        <li>A new session begins if the time gap between two consecutive events is <strong>&gt; 30 minutes</strong>.</li>
        <li>For each session, calculate: <code>start</code> (time of first event), <code>duration</code> (last event - first event), and <code>count</code> (number of events).</li>
      </ul>
      <pre style="white-space: pre-wrap;"><code class="language-json">${JSON.stringify(events)}</code></pre>
      <label for="${id}" class="form-label">Sessions JSON <code>[{start, duration, count}, ...]</code>:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}