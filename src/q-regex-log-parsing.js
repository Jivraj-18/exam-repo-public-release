import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-regex-log-parsing";
  const title = "Parse Server Logs with Regular Expressions";

  // deterministic RNG
  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  const methods = ["GET", "POST", "PUT", "DELETE"];
  const paths = ["/api/users", "/api/products", "/api/orders", "/api/auth", "/api/stats"];
  const statuses = [200, 201, 400, 401, 404, 500];
  const ips = ["192.168.1.10", "10.0.0.25", "172.16.0.5", "192.168.1.20"];

  // generate 30 log entries
  const logs = Array.from({ length: 30 }, () => {
    const timestamp = `2025-12-${String(Math.floor(random() * 28) + 1).padStart(2, '0')}T${
      String(Math.floor(random() * 24)).padStart(2, '0')}:${
      String(Math.floor(random() * 60)).padStart(2, '0')}:${
      String(Math.floor(random() * 60)).padStart(2, '0')}Z`;
    const ip = pick(ips);
    const method = pick(methods);
    const path = pick(paths);
    const status = pick(statuses);
    const duration = Math.floor(random() * 500) + 10;
    return `[${timestamp}] ${ip} ${method} ${path} ${status} ${duration}ms`;
  });

  // count errors (status >= 400)
  const errorCount = logs.filter(log => {
    const match = log.match(/\s(\d{3})\s/);
    return match && parseInt(match[1]) >= 400;
  }).length;

  const logContent = logs.join("\n");

  const answer = (input) => {
    const count = parseInt(input.trim());
    return count === errorCount;
  };

  const question = html`
    <div class="mb-3">
      <p>
        You're analyzing server logs to identify errors. Below are <strong>30</strong> 
        log entries in the format:
      </p>
      <pre><code>[timestamp] ip_address METHOD /path status duration</code></pre>
      <p>
        Count how many log entries have an <strong>error status code</strong> (400 or higher).
        HTTP status codes 400-599 indicate client and server errors.
      </p>
      <pre style="white-space: pre-wrap"><code class="language-text">
${logContent}
      </code></pre>
      <label for="${id}" class="form-label">
        Number of error log entries:
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
