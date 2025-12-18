import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default function({ user, weight = 1 }) {
  const id = "q-editor-incident-timeline";
  const title = "Editor: Incident Timeline";

  const random = seedrandom(`${user.email}#${id}`);
  const incidents = Array.from({ length: 12 }, (_, i) => {
    const hour = Math.floor(random() * 10) + 8;
    const minute = Math.floor(random() * 60);
    const second = Math.floor(random() * 60);
    return { hour, minute, second, label: String.fromCharCode(65 + i) };
  }).sort((a, b) => a.hour * 3600 + a.minute * 60 + a.second - (b.hour * 3600 + b.minute * 60 + b.second));

  const startHour = Math.floor(random() * 3) + 9;
  const endHour = startHour + Math.floor(random() * 3) + 3;

  const question = html`
    <div class="mb-3">
      <h3>Editor: Incident Timeline</h3>
      <p>You have a log file with incident timestamps. Use a text editor to analyze the data.</p>
      <pre>${incidents.map(inc => 
        `2025-12-17 ${String(inc.hour).padStart(2, '0')}:${String(inc.minute).padStart(2, '0')}:${String(inc.second).padStart(2, '0')} - Incident ${inc.label}`
      ).join("\n")}</pre>
      <p>Count how many incidents occurred between ${String(startHour).padStart(2, '0')}:00 and ${String(endHour).padStart(2, '0')}:00 (inclusive).</p>
      <label for="${id}" class="form-label">Number of incidents:</label>
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
