import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1 }) {
  const id = "q-shell-log-analysis";
  const title = "Shell: Web Server Log Analysis";

  const random = seedrandom(`${user.email}#${id}`);

  const ips = [
    "192.168.1.100",
    "10.0.0.25",
    "172.16.5.89",
    "203.0.113.42",
    "198.51.100.17",
    "192.0.2.56",
    "203.0.113.89",
    "198.51.100.200",
  ];
  const methods = ["GET", "POST", "PUT", "DELETE"];
  const paths = [
    "/api/users",
    "/api/products",
    "/api/orders",
    "/login",
    "/dashboard",
    "/api/analytics",
    "/static/css/main.css",
    "/static/js/app.js",
    "/favicon.ico",
  ];
  const statusCodes = [200, 201, 204, 400, 401, 403, 404, 500, 502];
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "curl/7.68.0",
    "python-requests/2.28.1",
    "PostmanRuntime/7.32.3",
  ];

  const randomInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;
  
  const logLines = [];
  const recordCount = 800 + randomInt(100, 200); // 800-1000 log entries

  // Generate timestamp
  const startTime = new Date("2024-12-01T00:00:00Z");
  
  for (let i = 0; i < recordCount; i++) {
    const timestamp = new Date(startTime.getTime() + i * 60000 + randomInt(0, 50000));
    const ip = pick(ips, random);
    const method = pick(methods, random);
    const path = pick(paths, random);
    const status = pick(statusCodes, random);
    const size = randomInt(100, 50000);
    const responseTime = randomInt(10, 5000);
    const userAgent = pick(userAgents, random);
    
    // Apache combined log format
    const dateStr = timestamp.toISOString().replace('T', ' ').replace('Z', '');
    const logLine = `${ip} - - [${dateStr}] "${method} ${path} HTTP/1.1" ${status} ${size} "${responseTime}ms" "${userAgent}"`;
    
    logLines.push({ ip, method, path, status, size, responseTime, userAgent, line: logLine });
  }

  // Pick a specific path to query
  const queryPath = pick(paths.filter(p => p.startsWith("/api/")), random);
  
  // Count requests for that path
  const expectedCount = logLines.filter(log => log.path === queryPath).length;

  // Generate log file content
  const logContent = logLines.map(log => log.line).join("\n");
  const blob = new Blob([logContent], { type: "text/plain" });

  const answer = async (response) => {
    if (!response) throw new Error("Enter the number of requests.");
    let value = parseInt(response.replace(/[^\d]/g, ""), 10);
    if (Number.isNaN(value)) throw new Error("Unable to parse the request count.");

    if (value !== expectedCount) {
      throw new Error(
        `The count doesn't match. Use grep to filter lines containing "${queryPath}" and count them with wc -l.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>LogWatch: Shell-Based Web Server Log Analysis</h2>
      <p>
        LogWatch is a DevOps monitoring company that helps clients analyze web server logs to detect anomalies, track
        API usage, and optimize performance. They need you to use <strong>UNIX shell commands</strong> to quickly
        extract insights from log files without writing complex scripts.
      </p>

      <h3>Log Format</h3>
      <p>Apache combined log format:</p>
      <pre><code>IP - - [TIMESTAMP] "METHOD PATH HTTP/1.1" STATUS SIZE "RESPONSE_TIME" "USER_AGENT"</code></pre>

      <h3>Task</h3>
      <ol>
        <li>Download the log file</li>
        <li>Use shell commands to analyze the logs</li>
        <li>Count how many requests were made to the path: <strong>${queryPath}</strong></li>
        <li>Return the exact count</li>
      </ol>

      <h3>Suggested Tools</h3>
      <ul>
        <li><code>grep</code> - Filter lines containing specific text</li>
        <li><code>wc -l</code> - Count lines</li>
        <li><code>awk</code> - Extract specific fields</li>
        <li><code>cut</code> - Cut specific columns</li>
        <li><code>sort</code> and <code>uniq -c</code> - Count unique occurrences</li>
      </ul>

      <p>
        Download the log file:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.log`)}>
          ${id}.log
        </button>
      </p>

      <label for="${id}" class="form-label">
        How many requests were made to ${queryPath}?
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., 42" required />
      <p class="text-muted">
        Hint: Try <code>grep '${queryPath}' ${id}.log | wc -l</code>
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
