import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-log-parsing";
    const title = "Log Parsing - Count Errors";

    const random = seedrandom(`${user.email}#${id}`);

    const levels = ["INFO", "WARN", "DEBUG"];
    const messages = ["System started", "User logged in", "Cache miss", "DB query", "Request received"];
    const errorMessages = ["Connection timeout", "Null pointer exception", "Disk full", "Access denied"];

    const numLines = 20 + Math.floor(random() * 30); // 20-49 lines
    const logs = [];
    let errorCount = 0;

    for (let i = 0; i < numLines; i++) {
        const timestamp = new Date().toISOString();
        const isError = random() < 0.2; // 20% chance of error

        if (isError) {
            logs.push(`[${timestamp}] ERROR: ${errorMessages[Math.floor(random() * errorMessages.length)]}`);
            errorCount++;
        } else {
            const level = levels[Math.floor(random() * levels.length)];
            const msg = messages[Math.floor(random() * messages.length)];
            logs.push(`[${timestamp}] ${level}: ${msg}`);
        }
    }

    const logContent = logs.join("\n");

    const answer = (input) => {
        const submission = Number(input.trim());
        if (isNaN(submission)) throw new Error("Input is not a number");
        if (submission !== errorCount) return false;
        return true;
    };

    const question = html`
    <div class="mb-3">
      <p>
        Analyze the following log excerpt and count the number of lines containing <strong>ERROR</strong>.
      </p>
      <pre style="white-space: pre-wrap; background-color: #2b2b2b; color: #f8f8f2; padding: 10px; border-radius: 5px; max-height: 300px; overflow-y: auto;"><code>${logContent}</code></pre>
      <label for="${id}" class="form-label">Number of ERROR lines:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

    return { id, title, weight, question, answer };
}
