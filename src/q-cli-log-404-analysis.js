import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-cli-log-404-analysis";
  const title = "CLI Forensics: Identifying the 404 Flooder";

  const random = seedrandom(`${user.email}#${id}`);

  // Pool of suspicious IPs
  const suspiciousIPs = ["203.0.113.55", "88.10.20.30", "198.51.100.42", "192.0.2.15"];
  const legitimateIPs = ["10.0.1.5", "192.168.0.101", "172.16.0.20"];

  // Randomly select the offending IP that will have most 404s
  const offendingIP = suspiciousIPs[Math.floor(random() * suspiciousIPs.length)];

  // Suspicious URLs typically scanned by bots
  const scanURLs = [
    "/admin.php",
    "/wp-login.php",
    "/backup.zip",
    "/.env",
    "/phpmyadmin",
    "/config.php",
    "/wp-admin",
  ];

  const legitimateURLs = ["/index.html", "/about", "/contact", "/style.css", "/api/data", "/images/logo.png"];

  // Generate log entries
  const logEntries = [];

  // Add 4-5 entries for the offending IP with 404 status
  const offendingCount = 4 + Math.floor(random() * 2); // 4 or 5
  for (let i = 0; i < offendingCount; i++) {
    const url = scanURLs[Math.floor(random() * scanURLs.length)];
    const timestamp = `18/Dec/2025:${14 + Math.floor(random() * 2)}:${String(Math.floor(random() * 60)).padStart(
      2,
      "0",
    )}:${String(Math.floor(random() * 60)).padStart(2, "0")}`;
    logEntries.push(
      `${offendingIP} - - [${timestamp}] "GET ${url} HTTP/1.1" 404 180 "-" "Mozilla/5.0 (compatible; Scanner/1.0)"`,
    );
  }

  // Add some legitimate traffic with 200 status
  for (let i = 0; i < 3; i++) {
    const ip = legitimateIPs[Math.floor(random() * legitimateIPs.length)];
    const url = legitimateURLs[Math.floor(random() * legitimateURLs.length)];
    const timestamp = `18/Dec/2025:${14 + Math.floor(random() * 2)}:${String(Math.floor(random() * 60)).padStart(
      2,
      "0",
    )}:${String(Math.floor(random() * 60)).padStart(2, "0")}`;
    logEntries.push(
      `${ip} - - [${timestamp}] "GET ${url} HTTP/1.1" 200 ${512 + Math.floor(random() * 1500)} "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"`,
    );
  }

  // Add 1-2 entries for other suspicious IPs with fewer 404s
  const otherSuspicious = suspiciousIPs.filter((ip) => ip !== offendingIP);
  for (let i = 0; i < 2; i++) {
    const ip = otherSuspicious[Math.floor(random() * otherSuspicious.length)];
    const url = scanURLs[Math.floor(random() * scanURLs.length)];
    const timestamp = `18/Dec/2025:${14 + Math.floor(random() * 2)}:${String(Math.floor(random() * 60)).padStart(
      2,
      "0",
    )}:${String(Math.floor(random() * 60)).padStart(2, "0")}`;
    logEntries.push(
      `${ip} - - [${timestamp}] "GET ${url} HTTP/1.1" 404 180 "-" "Mozilla/5.0 (compatible; Bot/2.0)"`,
    );
  }

  // Add some 403 Forbidden entries
  for (let i = 0; i < 1; i++) {
    const ip = legitimateIPs[Math.floor(random() * legitimateIPs.length)];
    const url = "/restricted";
    const timestamp = `18/Dec/2025:${14 + Math.floor(random() * 2)}:${String(Math.floor(random() * 60)).padStart(
      2,
      "0",
    )}:${String(Math.floor(random() * 60)).padStart(2, "0")}`;
    logEntries.push(
      `${ip} - - [${timestamp}] "GET ${url} HTTP/1.1" 403 450 "-" "Mozilla/5.0 (X11; Linux x86_64)"`,
    );
  }

  // Shuffle log entries to make it less obvious
  for (let i = logEntries.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [logEntries[i], logEntries[j]] = [logEntries[j], logEntries[i]];
  }

  const answer = (userInput) => {
    const trimmedInput = userInput.trim();
    if (trimmedInput !== offendingIP) {
      throw new Error(
        `Incorrect IP address. Analyze the logs to find which IP has the most 404 (Not Found) responses. Hint: Use grep to filter 404 responses, then count by IP.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>CLI Forensics: Identifying the "404" Flooder</h2>
      <p>
        <strong>SecureNet Operations</strong> is a DevOps team managing web infrastructure for multiple clients. You
        receive an alert that one of your Nginx web servers is returning an unusually high number of
        <code>404 Not Found</code> errors, consuming server resources and triggering security alerts.
      </p>
      <p>
        You suspect a bot is scanning your site for non-existent vulnerabilities (like
        <code>/admin.php</code>, <code>/wp-login.php</code>, etc.). Your task is to identify which specific IP address
        is generating the most <code>404</code> errors so you can block it at the firewall.
      </p>

      <h3>The Web Server Access Log</h3>
      <p>Below is a sample from your Nginx access log:</p>
      <pre
        style="background-color: #f5f5f5; padding: 10px; border: 1px solid #ddd; overflow-x: auto; font-size: 0.85em;"
      ><code>${logEntries.join("\n")}</code></pre>

      <h3>Your Task</h3>
      <p>
        Analyze the log entries above to identify which IP address generated the <strong>highest number</strong> of
        <code>404 Not Found</code> responses. Do not count <code>200 OK</code> or <code>403 Forbidden</code> responses.
      </p>
      <p>
        <strong>Hint:</strong> In a Unix/Linux environment, you could use a command pipeline like:
        <code>grep " 404 " logfile | awk '{print $1}' | sort | uniq -c | sort -rn</code>
      </p>

      <label for="${id}" class="form-label">
        Which IP address generated the most 404 responses? (Enter the IP address only)
      </label>
      <input class="form-control" id="${id}" name="${id}" type="text" required placeholder="e.g., 192.168.1.100" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
