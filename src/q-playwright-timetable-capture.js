import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 0.75 }) {
  const id = "q-playwright-timetable-capture";
  const title = "Extract Earliest Slot from Rendered Timetable";
  const rng = seedrandom(`${user.email}#${id}`);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const courses = ["Algebra", "Databases", "Networks", "AI", "Rust", "Go", "Cloud"];
  // Create a small HTML table with randomized times
  const slots = [];
  for (const d of days) {
    const n = 2 + Math.floor(rng() * 3);
    for (let i = 0; i < n; i++) {
      const hour = 8 + Math.floor(rng() * 9); // 08..16
      const min = ["00", "15", "30", "45"][Math.floor(rng() * 4)];
      const course = courses[Math.floor(rng() * courses.length)];
      slots.push({ day: d, time: `${hour}:${min}`, name: course });
    }
  }
  // earliest lexicographic by time then day order
  const dayOrder = new Map(days.map((d, i) => [d, i]));
  const earliest = slots
    .slice()
    .sort((a, b) => a.time.localeCompare(b.time) || dayOrder.get(a.day) - dayOrder.get(b.day))[0];

  const htmlTable = `
  <table class="table" id="timetable">
    <thead><tr><th>Day</th><th>Time</th><th>Course</th></tr></thead>
    <tbody>
      ${slots
        .map((s) => `<tr><td>${s.day}</td><td>${s.time}</td><td>${s.name}</td></tr>`)
        .join("\n")}
    </tbody>
  </table>`;

  const answer = (input) => {
    const value = (input || "").trim();
    const expect = `${earliest.day} ${earliest.time} ${earliest.name}`;
    if (value !== expect) throw new Error("Incorrect earliest slot");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        The timetable is rendered client-side. Using automation (e.g., Playwright) you would wait for the table and parse rows.
        From the HTML below, list the <strong>earliest</strong> slot in the format "DAY HH:MM COURSE".
      </p>
      <pre style="white-space: pre-wrap"><code class="language-html">${htmlTable}</code></pre>
      <label for="${id}" class="form-label">Earliest slot:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="Mon 08:00 Algebra" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
