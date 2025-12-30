import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-regex-log-parser";
  const title = "Regular Expression: Web Server Log Analysis";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate log entries with various IP addresses and status codes
  const statusCodes = [200, 201, 301, 400, 404, 500];
  const paths = ["/api/users", "/api/products", "/home", "/about", "/contact", "/login"];
  const methods = ["GET", "POST", "PUT", "DELETE"];

  const logEntries = [];
  let targetCount = 0;
  const targetStatus = statusCodes[Math.floor(random() * statusCodes.length)];

  // Generate 80 log entries
  for (let i = 0; i < 80; i++) {
    const ip = `${Math.floor(random() * 256)}.${Math.floor(random() * 256)}.${Math.floor(random() * 256)}.${
      Math.floor(random() * 256)
    }`;
    const timestamp = `2024-12-${String(Math.floor(random() * 28) + 1).padStart(2, "0")}T${
      String(Math.floor(random() * 24)).padStart(2, "0")
    }:${String(Math.floor(random() * 60)).padStart(2, "0")}:${String(Math.floor(random() * 60)).padStart(2, "0")}`;
    const method = methods[Math.floor(random() * methods.length)];
    const path = paths[Math.floor(random() * paths.length)];
    const status = statusCodes[Math.floor(random() * statusCodes.length)];
    const bytes = Math.floor(random() * 50000) + 1000;

    logEntries.push(`${ip} - - [${timestamp}] "${method} ${path} HTTP/1.1" ${status} ${bytes}`);

    if (status === targetStatus) {
      targetCount++;
    }
  }

  const logText = logEntries.join("\n");

  const answer = (input) => {
    const value = parseInt(input.trim());
    if (Number.isNaN(value)) {
      throw new Error("Please enter a valid integer count.");
    }
    if (value !== targetCount) {
      throw new Error(
        `Incorrect count. Use a regex pattern to match lines with status code ${targetStatus}. Make sure you're counting all occurrences.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Web Server Log Analysis with Regular Expressions</h2>
      <p>
        You're a DevOps engineer investigating server issues. You have a web server access log in the standard Apache
        Combined Log Format. Your task is to count how many requests returned a specific HTTP status code.
      </p>

      <h3>Log Format</h3>
      <p>Each line follows this pattern:</p>
      <pre><code>IP_ADDRESS - - [TIMESTAMP] "METHOD PATH HTTP/1.1" STATUS BYTES</code></pre>

      <h3>Task</h3>
      <ol>
        <li>Use regular expressions to parse the log entries below.</li>
        <li>Count how many requests returned HTTP status code <strong>${targetStatus}</strong>.</li>
        <li>Enter the count below.</li>
      </ol>

      <p>
        You can use tools like Python's <code>re</code> module, JavaScript's regex, or command-line tools like
        <code>grep</code>.
      </p>

      <pre style="white-space: pre-wrap; max-height: 400px; overflow-y: auto; background: #f5f5f5; padding: 10px;"><code>
${logText}
      </code></pre>

      <label for="${id}" class="form-label">
        How many requests returned status code ${targetStatus}?
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. 42" required />
      <p class="text-muted">
        Hint: Look for the status code after the HTTP method and path. Pattern: <code>" \\d{3} \\d+$</code>
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Recommended approach (Python):

import re

log_data = '''PASTE_LOG_DATA_HERE'''
pattern = r'" (\d{3}) \d+$'
matches = re.findall(pattern, log_data, re.MULTILINE)
count = sum(1 for status in matches if status == 'TARGET_STATUS')
print(count)

# Or using grep:
# grep -oP '" TARGET_STATUS \d+$' logfile.txt | wc -l

*/
