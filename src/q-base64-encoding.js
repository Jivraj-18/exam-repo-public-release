import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 0.75 }) {
  const id = "q-regex-data-extraction";
  const title = "Extract Data Using Regular Expressions";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  // Generate random log entries with embedded data
  const services = ["auth-service", "api-gateway", "user-service", "payment-service", "order-service"];
  const levels = ["INFO", "DEBUG", "WARN", "ERROR"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const numLogs = 20 + Math.floor(random() * 15); // 20-34 log entries
  const logs = [];

  // Target: count specific error codes
  const targetService = pick(services);
  const targetErrorCode = 400 + Math.floor(random() * 100); // 400-499 error codes

  let targetCount = 0;

  for (let i = 0; i < numLogs; i++) {
    const month = pick(months);
    const day = Math.floor(random() * 28) + 1;
    const hour = Math.floor(random() * 24);
    const minute = Math.floor(random() * 60);
    const second = Math.floor(random() * 60);
    const service = pick(services);
    const level = pick(levels);

    // Generate error code - some will match our target
    let errorCode;
    if (service === targetService && random() < 0.4) {
      errorCode = targetErrorCode;
      targetCount++;
    } else {
      errorCode = 400 + Math.floor(random() * 200); // 400-599
    }

    const requestId = `req-${Math.random().toString(36).substr(2, 8)}`;
    const responseTime = Math.floor(random() * 2000) + 50;

    logs.push(
      `[${month} ${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}] ${level} ${service} - Request ${requestId} completed with status ${errorCode} in ${responseTime}ms`
    );
  }

  const logText = logs.join("\n");

  const answer = (input) => {
    if (!input) throw new Error("Please enter the count.");

    const value = parseInt(input.trim(), 10);
    if (isNaN(value)) throw new Error("Please enter a valid integer.");

    if (value !== targetCount) {
      throw new Error(`Incorrect count. Use regex to find all lines containing '${targetService}' with status ${targetErrorCode}.`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>LogParser: Extract Data with Regular Expressions</h2>
      <p>
        <strong>LogParser Inc.</strong> analyzes server logs to identify issues.
        Your task is to use regular expressions to extract and count specific patterns.
      </p>

      <h3>Log Format</h3>
      <pre style="background: #f5f5f5; padding: 5px; border-radius: 5px; font-size: 12px;"><code>[Mon DD HH:MM:SS] LEVEL service-name - Request req-id completed with status CODE in TIMEms</code></pre>

      <h3>Sample Log Entries</h3>
      <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px; max-height: 200px; overflow-y: auto; font-size: 11px; white-space: pre-wrap;"><code>${logText}</code></pre>

      <h3>Task</h3>
      <p>Using <strong>regular expressions</strong> in Python, count how many log entries match:</p>
      <ul>
        <li>Service: <code>${targetService}</code></li>
        <li>Status code: <code>${targetErrorCode}</code></li>
      </ul>

      <h3>Python Hint</h3>
      <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px;"><code class="language-python">import re

pattern = r'${targetService}.*status ${targetErrorCode}'
matches = re.findall(pattern, log_text)
print(len(matches))</code></pre>

      <label for="${id}" class="form-label">
        How many log entries are from <code>${targetService}</code> with status <code>${targetErrorCode}</code>?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution

# /// script
# requires-python = ">=3.12"
# ///
import re

log_text = """
[paste the log entries here]
"""

# Replace with actual values from your question
service = "auth-service"  # Use the service shown in the question
status_code = 404  # Use the status code shown in the question

# Pattern to match the specific service and status code
pattern = rf'{service}.*status {status_code}'

matches = re.findall(pattern, log_text)
print(f"Count: {len(matches)}")

# Alternative approach using grep:
# grep -c "auth-service.*status 404" logs.txt

*/
