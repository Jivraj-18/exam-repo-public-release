import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 2 }) {
  const id = "q-shell-log-analysis";
  const title = "Shell Pipeline: Server Log Analysis";

  const random = seedrandom(`${user.email}#${id}`);

  const endpoints = ["/api/users", "/api/products", "/api/orders", "/api/checkout", "/api/search"];
  const statusCodes = [200, 201, 400, 401, 404, 500, 503];
  const ips = Array.from({ length: 20 }, (_, i) => `192.168.1.${100 + i}`);

  const targetEndpoint = endpoints[Math.floor(random() * endpoints.length)];
  const targetStatus = statusCodes[Math.floor(random() * statusCodes.length)];

  // Generate log lines
  const logLines = [];
  let expectedCount = 0;

  for (let i = 0; i < 1000; i++) {
    const timestamp = new Date(2024, 11, 18, Math.floor(random() * 24), Math.floor(random() * 60), Math.floor(random() * 60));
    const ip = ips[Math.floor(random() * ips.length)];
    const method = random() > 0.5 ? "GET" : "POST";
    const endpoint = endpoints[Math.floor(random() * endpoints.length)];
    const status = statusCodes[Math.floor(random() * statusCodes.length)];
    const responseTime = Math.floor(random() * 2000) + 50;
    const bytes = Math.floor(random() * 50000) + 100;

    const logLine =
      `${timestamp.toISOString()} ${ip} ${method} ${endpoint} ${status} ${responseTime}ms ${bytes}bytes`;
    logLines.push(logLine);

    if (endpoint === targetEndpoint && status === targetStatus) {
      expectedCount++;
    }
  }

  const logBlob = new Blob([logLines.join("\n")], { type: "text/plain" });

  const answer = async (value) => {
    const parsed = parseInt(String(value).replace(/[^0-9]/g, ""), 10);
    if (isNaN(parsed)) throw new Error("Enter a valid count.");
    if (parsed !== expectedCount) {
      throw new Error(
        `Incorrect count. Use shell tools (grep, awk, cut, wc) to filter logs for endpoint='${targetEndpoint}' and status=${targetStatus}.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>CloudOps: Production Server Log Analysis</h2>
      <p>
        <strong>CloudOps</strong> is a managed infrastructure provider responsible for monitoring thousands of production
        servers. System reliability engineers need to quickly analyze multi-gigabyte log files to identify issues,
        performance bottlenecks, and security threats without waiting for logs to be imported into centralized logging
        systems.
      </p>

      <h3>Scenario</h3>
      <p>
        An e-commerce client reported intermittent checkout failures. The SRE team needs to analyze raw server logs to
        count how many times specific API endpoints returned error status codes. The logs are too large for GUI tools, and
        importing to a database would take hours. The team needs a fast Unix shell pipeline solution.
      </p>

      <h3>The Power of Unix Pipelines</h3>
      <p>
        Unix shell tools (<code>grep</code>, <code>awk</code>, <code>cut</code>, <code>sort</code>, <code>uniq</code>,
        <code>wc</code>) can process gigabytes of text data in seconds by streaming through pipes. Each tool does one
        thing well, and together they form powerful data processing workflows.
      </p>

      <h3>Log Format</h3>
      <p>Each log line follows this format:</p>
      <pre><code>TIMESTAMP IP METHOD ENDPOINT STATUS RESPONSE_TIME BYTES</code></pre>
      <p>Example:</p>
      <pre><code>2024-12-18T14:23:45.123Z 192.168.1.105 POST /api/checkout 500 1234ms 2048bytes</code></pre>

      <h3>Your Task</h3>
      <p>
        Using Unix shell commands, analyze the provided server logs to count occurrences where:
        <ul>
          <li>Endpoint is <code>${targetEndpoint}</code></li>
          <li>Status code is <code>${targetStatus}</code></li>
        </ul>
      </p>

      <h3>Shell Pipeline Examples</h3>
      <pre><code># Count all 500 errors
grep " 500 " server.log | wc -l

# Count POST requests to specific endpoint
grep "POST /api/users" server.log | wc -l

# Extract and count unique IPs
cut -d' ' -f2 server.log | sort | uniq -c

# Average response time for an endpoint
grep "/api/orders" server.log | awk '{print $6}' | sed 's/ms//' | awk '{sum+=$1} END {print sum/NR}'

# Find slow requests (>1000ms)
awk '$6 > 1000' server.log</code></pre>

      <h3>Suggested Approach</h3>
      <ol>
        <li>Use <code>grep</code> to filter lines containing both the endpoint and status code</li>
        <li>Use <code>wc -l</code> to count matching lines</li>
        <li>Or use <code>awk</code> with pattern matching for more precise filtering</li>
      </ol>

      <p>
        Download the server logs:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(logBlob, `${id}.log`)}>
          ${id}.log
        </button>
      </p>

      <label for="${id}" class="form-label">
        How many log entries have endpoint='${targetEndpoint}' AND status=${targetStatus}?
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., 42" required />
      <p class="text-muted">
        Use shell commands like <code>grep "${targetEndpoint}" ${id}.log | grep " ${targetStatus} " | wc -l</code> or
        <code>awk '/$targetEndpoint/ && /$targetStatus/' ${id}.log | wc -l</code>
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
