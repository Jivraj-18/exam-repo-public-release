import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1 }) {
  const id = "q-log-security-anomaly";
  const title = "Log Analysis: Brute Force Detection";
  const random = seedrandom(`${user.email}#${id}`);

  const ips = Array.from({ length: 15 }, () => 
    `${Math.floor(random() * 255)}.${Math.floor(random() * 255)}.${Math.floor(random() * 255)}.${Math.floor(random() * 255)}`
  );
  const endpoints = ["/login", "/api/auth", "/admin", "/dashboard", "/reset-password"];
  const methods = ["POST", "GET"];
  const statusCodes = [200, 401, 403, 500];

  const logLines = [];
  const start = new Date("2024-10-01T00:00:00Z");
  
  // Pick a target IP that will be the attacker
  const attackerIp = pick(ips, random);
  const attackerTarget = "/login";
  
  // Generate background noise
  for (let i = 0; i < 800; i++) {
    const ip = pick(ips, random);
    const time = new Date(start.getTime() + i * 1000 * (random() * 60));
    const endpoint = pick(endpoints, random);
    const method = endpoint === "/login" ? "POST" : pick(methods, random);
    
    // Default random status
    let status = pick(statusCodes, random);
    
    // Inject the specific attack pattern for the "answer"
    if (ip === attackerIp && endpoint === attackerTarget) {
        status = 401; // Failed login
    }

    logLines.push(`${time.toISOString()} [${method}] ${endpoint} HTTP/1.1 ${status} ${ip} - "Mozilla/5.0"`);
  }

  const blob = new Blob([logLines.join("\n")], { type: "text/plain" });

  // Calculate the answer: Count 401s for the attacker IP on /login
  const attackCount = logLines.filter(line => 
    line.includes(attackerIp) && 
    line.includes(attackerTarget) && 
    line.includes(" 401 ")
  ).length;

  const answer = async (value) => {
    const numeric = parseInt(value, 10);
    if (!Number.isFinite(numeric)) throw new Error("Enter the count as a number.");
    if (numeric !== attackCount) throw new Error("Incorrect count of failed login attempts for the suspect IP.");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2 id="log-anomaly-detection">Security Audit: Brute Force Detection</h2>
      <p>
        The security team has flagged suspicious activity. A specific IP address: <strong>${attackerIp}</strong> is suspected of attempting a brute force attack on the <strong>${attackerTarget}</strong> endpoint.
      </p>
      <h3>Task</h3>
      <ol>
        <li>Download the server access log.</li>
        <li>Filter the logs for the IP address <code>${attackerIp}</code>.</li>
        <li>Count how many requests to <code>${attackerTarget}</code> resulted in a <strong>401 Unauthorized</strong> status code.</li>
      </ol>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.log`)}>
          ${id}.log
        </button>
      </p>
      <label for="${id}" class="form-label">
        How many failed login attempts (401) came from ${attackerIp}?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}