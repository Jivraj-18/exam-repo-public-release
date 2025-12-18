import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1.25 }) {
  const id = "q-regex-log-parsing";
  const title = "Regex: Multi-Pattern Log Analysis with Time Windows";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate MASSIVE log file with 10,000+ entries
  const ips = ["192.168.1.10", "10.0.0.25", "172.16.0.5", "192.168.1.100", "10.0.0.50", 
                "203.45.67.89", "98.123.45.67", "156.78.90.12", "45.67.89.123"];
  const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
  const paths = ["/api/users", "/api/products", "/api/orders", "/api/auth/login", "/api/cart", 
                 "/api/checkout", "/api/payments", "/dashboard", "/admin", "/reports"];
  const userAgents = ["Mozilla/5.0", "curl/7.68.0", "PostmanRuntime/7.26", "python-requests/2.25", "Apache-HttpClient/4.5"];
  
  const targetIPSubnet = "192.168.1."; // Must match 192.168.1.x
  const targetPath = "/api/orders";
  const targetHourStart = 14; // 2 PM
  const targetHourEnd = 18;   // 6 PM
  let suspiciousCount = 0;

  const logs = [];
  
  // Generate 10,000 log entries to make it HARD
  for (let i = 0; i < 10000; i++) {
    const ip = ips[Math.floor(random() * ips.length)];
    const method = methods[Math.floor(random() * methods.length)];
    const path = paths[Math.floor(random() * paths.length)];
    const status = random() > 0.7 ? (random() > 0.5 ? 500 : 403) : (random() > 0.3 ? 200 : 404);
    const size = Math.floor(random() * 10000);
    const userAgent = userAgents[Math.floor(random() * userAgents.length)];
    const responseTime = Math.floor(random() * 5000);
    
    const day = Math.floor(random() * 28) + 1;
    const hour = Math.floor(random() * 24);
    const minute = Math.floor(random() * 60);
    const second = Math.floor(random() * 60);
    
    const timestamp = `2024-12-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
    
    const logLine = `${ip} - - [${timestamp}] "${method} ${path} HTTP/1.1" ${status} ${size} "${userAgent}" ${responseTime}ms`;
    logs.push(logLine);
    
    // Complex condition: IP starts with subnet + specific path + time window + server error
    if (ip.startsWith(targetIPSubnet) && 
        path === targetPath && 
        hour >= targetHourStart && 
        hour <= targetHourEnd && 
        status === 500) {
      suspiciousCount++;
    }
  }

  const logContent = logs.join("\n");
  const blob = new Blob([logContent], { type: "text/plain" });

  const answer = async (response) => {
    if (!response) throw new Error("Enter the suspicious request count");
    
    const value = parseInt(response.replace(/[^\d]/g, ""));
    if (Number.isNaN(value)) throw new Error("Unable to parse the count");

    if (value !== suspiciousCount) {
      throw new Error(
        `Incorrect. Find logs where: IP starts with ${targetIPSubnet}, path=${targetPath}, hour between ${targetHourStart}-${targetHourEnd}, status=500.`
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>SecOps: Multi-Pattern Threat Detection</h2>
      <p>
        <strong>SecOps Intelligence</strong> monitors 10,000+ log entries for suspicious patterns.
        You must use regex and time-based filtering to identify potential security incidents.
      </p>

      <h3>Business Context</h3>
      <p>
        The security team detected a pattern: server errors (500) on the orders API from internal IPs
        during business hours might indicate a database attack or system compromise.
      </p>

      <h3>Enhanced Log Format (10,000+ entries)</h3>
      <pre><code>192.168.1.10 - - [2024-12-15 14:23:45] "POST /api/orders HTTP/1.1" 500 1234 "Mozilla/5.0" 2345ms</code></pre>
      
      <p>Fields: <code>IP timestamp "METHOD path" STATUS bytes "UserAgent" response_time</code></p>

      <h3>Your Task (MULTIPLE CONDITIONS!)</h3>
      <p>Count log entries that match ALL these criteria:</p>
      <ol>
        <li>IP address starts with: <strong>${targetIPSubnet}</strong> (subnet match!)</li>
        <li>Request path equals: <strong>${targetPath}</strong></li>
        <li>Hour is between <strong>${targetHourStart}:00 and ${targetHourEnd}:00</strong> (inclusive)</li>
        <li>HTTP status code is <strong>500</strong> (server error)</li>
      </ol>

      <p>
        Download the log file (10,000+ entries):
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.log`)}>
          ${id}.log
        </button>
      </p>

      <h3>Advanced Filtering Required</h3>
      <ul>
        <li><strong>Subnet matching:</strong> Use <code>^${targetIPSubnet}</code> to match IP prefix</li>
        <li><strong>Time extraction:</strong> Parse timestamp and extract hour: <code>[0-9]{2}:([0-9]{2}):[0-9]{2}</code></li>
        <li><strong>Exact path match:</strong> <code>"[A-Z]+ ${targetPath} </code></li>
        <li><strong>Status code:</strong> Look for <code>" 500 "</code> (with spaces)</li>
      </ul>

      <h3>Example Commands</h3>
      <pre><code># grep with multiple patterns
grep '^${targetIPSubnet}' log.txt | grep '${targetPath}' | \\
  awk -F'[][]' '{print $2}' | awk -F':' '{print $2}' | \\
  awk '$1 >= ${targetHourStart} && $1 <= ${targetHourEnd}' | wc -l

# Python regex (recommended for complex conditions)
import re
pattern = r'^${targetIPSubnet}.*\\[(\\d{4}-\\d{2}-\\d{2}) (\\d{2}):.* "${targetPath}.*" 500'
</code></pre>

      <label for="${id}" class="form-label">
        How many requests match ALL 4 criteria (subnet + path + time + status)?
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        placeholder="e.g., 42" 
        required 
      />
      <p class="text-muted">
        Submit count as integer. Must check IP subnet, exact path, time window (${targetHourStart}-${targetHourEnd}h), AND status 500!
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}