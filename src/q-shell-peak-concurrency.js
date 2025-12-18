import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default function({ user, weight = 1 }) {
  const id = "q-shell-peak-concurrency";
  const title = "Shell: Peak Concurrency";

  const random = seedrandom(`${user.email}#${id}`);
  const events = [];
  let time = 600;
  const baseConnects = Math.floor(random() * 5) + 8;
  
  for (let i = 0; i < baseConnects; i++) {
    time += Math.floor(random() * 10) + 3;
    events.push({ time, type: "CONNECT" });
  }
  
  for (let i = 0; i < baseConnects; i++) {
    time += Math.floor(random() * 8) + 2;
    events.push({ time, type: "DISCONNECT" });
  }
  
  events.sort((a, b) => a.time - b.time);

  const question = html`
    <div class="mb-3">
      <h3>Shell: Peak Concurrency</h3>
      <p>Analyze this server log to find the peak number of concurrent connections.</p>
      <p>Log format: Each line shows CONNECT or DISCONNECT events with timestamps:</p>
      <pre>${events.map(e => {
        const hours = Math.floor(e.time / 60);
        const mins = e.time % 60;
        return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${e.type}`;
      }).join("\n")}</pre>
      <p>Use shell commands to determine the maximum number of simultaneous connections at any point.</p>
      <label for="${id}" class="form-label">Peak concurrent connections:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return {
    id,
    title,
    weight,
    question,
    answer: { type: "integer" },
  };
}
