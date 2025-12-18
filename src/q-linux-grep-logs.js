import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-linux-grep-logs";
    const title = "Linux: Count Log Entries";

    const random = seedrandom(`${user.email}#${id}`);

    const levels = ["INFO", "WARN", "CRITICAL", "DEBUG"];
    const messages = ["Server started", "Disk full", "Connection timeout", "User logged in", "Cache miss", "Database error"];

    const lineCount = 50 + Math.floor(random() * 50); // 50-100 lines
    const logs = Array.from({ length: lineCount }, () => {
        const level = levels[Math.floor(random() * levels.length)];
        const msg = messages[Math.floor(random() * messages.length)];
        return `[2025-01-01 10:00:00] ${level}: ${msg}`;
    });

    const targetLevel = "CRITICAL";
    const answer = logs.filter(line => line.includes(targetLevel)).length;

    const question = html`
    <div class="mb-3">
      <p>
        You have a log file named <code>server.log</code> with the content shown below.
        Use <code>grep</code> or simply count manually to find the answer.
      </p>
      <p><strong>Question:</strong> How many lines in this file contain the string <code>"${targetLevel}"</code>?</p>
      
      <pre style="max-height: 300px; overflow-y: auto; background: #f8f9fa; padding: 10px; border: 1px solid #ddd;"><code>${logs.join("\n")}</code></pre>

      <label for="${id}" class="form-label">Number of matching lines:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
