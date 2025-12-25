import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-bash-log-audit";
  const title = "Bash scripting: Log audit for DataCenterOps";

  const random = seedrandom(`${user.email}#${id}`);

  // Fixed audit window
  const auditDate = "2024-08-12";
  const startTime = "10:00:00";
  const endTime = "11:00:00";

  // Generate deterministic log data
  const levels = ["INFO", "WARN", "ERROR"];
  const components = ["API", "Database", "Scheduler", "Cache", "Auth"];
  const messages = {
    INFO: "Operation completed",
    WARN: "Latency above threshold",
    ERROR: "Unexpected failure",
  };

  const lines = [];
  let correctCount = 0;

  const pad = (n) => String(n).padStart(2, "0");

  for (let h = 9; h <= 12; h++) {
    for (let m = 0; m < 60; m += 5) {
      const time = `${pad(h)}:${pad(m)}:${pad(Math.floor(random() * 60))}`;
      const level = levels[Math.floor(random() * levels.length)];
      const component = components[Math.floor(random() * components.length)];

      const line = `${auditDate} ${time} ${level} ${component} - ${messages[level]}`;
      lines.push(line);

      if (
        level === "ERROR" &&
        time >= startTime &&
        time <= endTime
      ) {
        correctCount++;
      }
    }
  }

  const blob = new Blob([lines.join("\n")], { type: "text/plain" });

  const answer = async (value) => {
    const num = Number(value);

    if (!Number.isInteger(num)) {
      throw new Error("Answer must be a single integer representing the count of ERROR entries.");
    }

    if (num !== correctCount) {
      throw new Error(
        "Incorrect count. Ensure you only count ERROR logs within the specified date and time window."
      );
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Log audit for DataCenterOps</h2>

      <p>
        <strong>DataCenterOps</strong> manages large-scale data centers for cloud service providers.
        Each server continuously writes operational logs that record system events such as startups,
        warnings, and failures.
      </p>

      <p>
        During a scheduled maintenance window, the operations team needs to determine how many
        <strong>critical error events</strong> occurred. Since the logs are large and text-based,
        engineers rely on <strong>Bash scripting</strong> to extract insights quickly.
      </p>

      <h3>Dataset</h3>
      <p>
        You are given a server log file where each line follows this format:
      </p>

      <pre><code>YYYY-MM-DD HH:MM:SS LEVEL Component - Message</code></pre>

      <p>
        Download the log file:
        <button
          class="btn btn-sm btn-outline-primary"
          type="button"
          @click=${() => download(blob, "server-ops.log")}
        >
          server-ops.log
        </button>
      </p>

      <h3>Your Task</h3>
      <p>
        Using a <strong>Bash script or one-liner</strong>, determine:
      </p>

      <p>
        <strong>
          How many <code>ERROR</code> log entries occurred on
          ${auditDate} between ${startTime} and ${endTime} (inclusive)?
        </strong>
      </p>

      <ul>
        <li>Do not count logs outside this time window</li>
        <li>Do not count WARN or INFO entries</li>
        <li>Do not count entries from other dates</li>
      </ul>

      <label for="${id}" class="form-label">
        Enter the total number of ERROR entries:
      </label>

      <input
        class="form-control"
        id="${id}"
        name="${id}"
        required
      />

      <p class="text-muted">
        Submit only the number. Do not include commands or explanations.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
