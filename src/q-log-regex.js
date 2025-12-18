import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-log-regex";
    const title = "Regex: CyberSec Ops Intrusion Detection";

    const random = seedrandom(`${user.email}#${id}`);

    const events = [
        { type: "SSH_AUTH_SUCCESS", pattern: "Accepted password for root" },
        { type: "SSH_AUTH_FAIL", pattern: "Failed password for invalid user" },
        { type: "HTTP_request", pattern: "GET /index.html 200" },
        { type: "DB_CONNECTION", pattern: "Postgres connection established" }
    ];

    const logs = [];
    const suspiciousIPs = [];

    for (let i = 0; i < 15; i++) {
        const event = events[Math.floor(random() * events.length)];
        const ip = `192.168.${Math.floor(random() * 255)}.${Math.floor(random() * 255)}`;
        const timestamp = new Date().toISOString();

        logs.push(`${timestamp} [${event.type}] source_ip=${ip} msg="${event.pattern}"`);

        if (event.type === "SSH_AUTH_FAIL") {
            suspiciousIPs.push(ip);
        }
    }

    const answer = (input) => {
        let userList;
        try {
            userList = JSON.parse(input);
        } catch {
            throw new Error("Input must be valid JSON.");
        }
        if (!Array.isArray(userList)) throw new Error("Input must be an array.");

        userList.sort();
        suspiciousIPs.sort();

        if (JSON.stringify(userList) !== JSON.stringify(suspiciousIPs)) {
            throw new Error(`Extraction mismatch. Expected ${suspiciousIPs.length} IPs, got ${userList.length}. Check your Regex pattern.`);
        }
        return true;
    };

    const question = html`
    <div class="mb-3">
      <h2>CyberSec Ops: Intrusion Detection</h2>
      <h3>Context</h3>
      <p>
        <strong>SecurNet</strong> monitors server logs for potential brute-force attacks. 
        A critical indicator of compromise is repeated <strong>SSH authentication failures</strong>. 
        Security analysts need a way to rapidly extract the source IP addresses of these failed attempts 
        from raw log files.
      </p>
      <h3>Your Task</h3>
      <p>
        Analyze the raw log dump below. identifying all entries with type <code>SSH_AUTH_FAIL</code>. 
        Extract the <strong>IP address</strong> (value of <code>source_ip</code>) from these specific lines.
      </p>
      <h3>Raw Logs</h3>
      <pre style="background: #2d2d2d; color: #f8f8f2; padding: 10px; font-family: monospace; white-space: pre-wrap;">${logs.join("\n")}</pre>
      
      <p>Submit the list of suspicious IP addresses as a JSON array of strings.</p>
      <label for="${id}" class="form-label">Suspicious IPs</label>
      <input class="form-control" id="${id}" name="${id}" placeholder='["192.168.1.5", ...]' required />
    </div>
  `;

    return { id, title, weight, question, answer };
}
