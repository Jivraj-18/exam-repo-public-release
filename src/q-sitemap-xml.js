import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-sitemap-xml"; // Keep ID
  const title = "Python: Regex Log Parsing";

  const random = seedrandom(`${user.email}#${id}`);
  
  let logContent = "";
  let targetIpCount = 0;
  // Target IP pattern to find: 192.168.1.X
  const targetPattern = /192\.168\.1\.\d+/;

  for (let i = 0; i < 200; i++) {
    // Generate random IPs
    const octet = Math.floor(random() * 255);
    const isTarget = random() > 0.8;
    const ip = isTarget ? `192.168.1.${octet}` : `10.0.0.${octet}`;
    const date = new Date().toISOString();
    logContent += `[${date}] REQUEST from ${ip} status=200\n`;
    
    if (isTarget) targetIpCount++;
  }

  const blob = new Blob([logContent], { type: "text/plain" });

  const answer = async (response) => {
    if (parseInt(response) !== targetIpCount) throw new Error(`Incorrect. Expected ${targetIpCount}.`);
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Security: IP extraction with Regex</h2>
      <p>
        The security team needs to count requests coming from the local subnet <code>192.168.1.X</code>.
      </p>
      <h3>Task</h3>
      <ol>
        <li>Download the log file.</li>
        <li>Use Python (<code>re</code> module) or a text editor with Regex search.</li>
        <li>Count the number of lines containing an IP address starting with <code>192.168.1.</code></li>
      </ol>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, "server.log")}>
          <i class="bi bi-download"></i> Download server.log
        </button>
      </p>
      <label for="${id}" class="form-label">Count of 192.168.1.X IPs:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}