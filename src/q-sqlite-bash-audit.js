import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-sqlite-bash-audit";
  const title = "SQLite & Terminal: Security Audit Log Analysis";

  const random = seedrandom(`${user.email}#${id}`);
  
  // Randomly generate a "suspicious" threshold for the task
  const errorThreshold = Math.floor(random() * 5) + 3; // 3 to 7
  const targetService = ["auth-gateway", "api-server", "db-proxy", "ssh-daemon"][Math.floor(random() * 4)];

  // Synthetic Data Generation
  const logs = [];
  const services = ["auth-gateway", "api-server", "db-proxy", "ssh-daemon", "web-frontend"];
  const errorCodes = [401, 403, 500, 503];
  
  let targetServiceErrorCount = 0;

  for (let i = 0; i < 200; i++) {
    const service = services[Math.floor(random() * services.length)];
    const status = random() > 0.8 ? errorCodes[Math.floor(random() * errorCodes.length)] : 200;
    const timestamp = new Date(2025, 0, 1, 0, i).toISOString();
    
    logs.push({ timestamp, service, status });

    if (service === targetService && status >= 400) {
      targetServiceErrorCount++;
    }
  }

  // Generate a CSV blob for the user to load into SQLite via Terminal
  const csvContent = "timestamp,service,status\n" + logs.map(l => `${l.timestamp},${l.service},${l.status}`).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  const answer = async (value) => {
    const numeric = parseInt(String(value).trim(), 10);
    if (isNaN(numeric)) throw new Error("Please enter a valid integer.");
    if (numeric !== targetServiceErrorCount) throw new Error("The error count does not match the database records.");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Security Audit: ${targetService}</h2>
      <p>
        Your infrastructure team has provided a raw CSV log of service requests. You need to use the 
        <strong>Terminal</strong> and <strong>SQLite</strong> to determine the severity of a potential 
        brute-force or failure event.
      </p>

      <h3>Scenario</h3>
      <p>
        A security alert was triggered for the <strong>${targetService}</strong>. You must import the 
        provided CSV into a temporary SQLite database and calculate the total number of 
        <strong>error responses</strong> (status codes &ge; 400) specifically for that service.
      </p>

      <h3>Requirements</h3>
      <ol>
        <li>Download the <code>audit_logs.csv</code> file below.</li>
        <li>
          Use the <code>sqlite3</code> CLI to import the data:
          <pre class="bg-light p-2"><code>sqlite3 audit.db
.mode csv
.import audit_logs.csv logs</code></pre>
        </li>
        <li>
          Write a SQL query to count records where <code>service</code> is <strong>"${targetService}"</strong> 
          and <code>status</code> is 400 or higher.
        </li>
        <li>Enter the resulting count in the box below.</li>
      </ol>

      <div class="my-3">
        <button class="btn btn-primary" type="button" @click=${() => download(blob, `audit_logs.csv`)}>
          Download audit_logs.csv
        </button>
      </div>

      <label for="${id}" class="form-label">
        How many error entries (status &ge; 400) exist for the <strong>${targetService}</strong>?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
      
      <p class="text-muted mt-2">
        <small>Hint: <code>SELECT COUNT(*) FROM logs WHERE service = '${targetService}' AND status >= 400;</code></small>
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}