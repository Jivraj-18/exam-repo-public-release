
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-server-log-analysis";
  const title = "Server Log Analysis (Regex)";

  const random = seedrandom(`${user.email}#${id}`);
  // 4 Attacking IPs, 2 Innocent IPs
  const badIPs = ["192.168.1.1", "10.0.0.5", "172.16.0.3", "192.168.1.50"];
  const goodIPs = ["8.8.8.8", "4.4.4.4"];
  
  // Shuffle badIPs to ensure different ones are the "heavy hitters" each time
  badIPs.sort(() => random() - 0.5);
  
  // Weights for Bad IPs: [Most active, Active, Borderline, Quiet]
  // This ensures not ALL IPs cross the threshold of 40
  // With ~420 bad logs: 0.55(~230), 0.35(~147), 0.08(~33), 0.02(~8)
  // Result: Usually 2 IPs will be flagged, sometimes 3 if random variance is high.
  const weights = [0.55, 0.35, 0.08, 0.02]; 
  const cumWeights = [];
  let sum = 0;
  for(let w of weights) { sum += w; cumWeights.push(sum); }

  // Generate 600 lines
  const logs = Array.from({ length: 600 }, (_, i) => {
    const date = new Date(1672531200000 + i * 1000).toISOString();
    
    // 70% Malicious (Bad IPs), 30% Innocent (Good IPs + Decoys)
    if (random() > 0.3) {
       // Weighted selection of Bad IP
       const r = random();
       let ipIndex = 0;
       for(let j=0; j<cumWeights.length; j++) {
         if(r < cumWeights[j]) { ipIndex = j; break; }
       }
       const ip = badIPs[ipIndex];

       const badTemplates = [
         () => `[${date}] [ALERT] Suspicious activity detected from ${ip} (Potential Botnet)`,
         () => `[${date}] [WARN] Invalid auth token presented by client: ${ip}`,
         () => `[${date}] [ERROR] SQL Injection attempt blocked from source: ${ip}`
       ];
       return badTemplates[Math.floor(random() * badTemplates.length)]();
    } else {
       const ip = goodIPs[Math.floor(random() * goodIPs.length)];
       const goodTemplates = [
         () => `[${date}] [INFO] User session established for ${ip}`,
         () => `[${date}] [INFO] Health check from ${ip} passed`,
         // Decoys: Version Numbers mimicking IPs
         () => `[${date}] [WARN] Client is using deprecated library v${Math.floor(random()*10)}.${Math.floor(random()*10)}.${Math.floor(random()*10)}.${Math.floor(random()*10)}`
       ];
       return goodTemplates[Math.floor(random() * goodTemplates.length)]();
    }
  }).join("\n");

  // Parse logs: Extract IP (Regex) -> Count
  const counts = {};
  logs.split("\n").forEach(l => {
    // Only count "Bad" logs (ALERT, WARN, ERROR)
    if(l.includes("[ALERT]") || l.includes("[WARN]") || l.includes("[ERROR]")) {
      // Strict Regex: Look for IP pattern, BUT exclude if preceded by 'v' (Version number)
      // Note: JS doesn't support lookbehind in all environments, so we filter logic manually or use specific boundaries
      // Attempt to extract strictly IPs associated with 'from', 'client:', 'source:'
      // Or just a general IP regex and then filter out known decoys
      
      // So the CORRECT regex `\b\d{1,3}...\b` naturally excludes `v1.2.3.4`.
      // The NAIVE regex `\d+\.\d+\.\d+\.\d+` (without \b) WOULD match `1.2.3.4` inside `v1.2.3.4`.
      
      // Let's rely on that nuance!
      const allMatches = l.match(/\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/); 
      if(allMatches) {
        const ip = allMatches[1];
        counts[ip] = (counts[ip] || 0) + 1;
      }
    }
  });

  // IPs with > 40 malicious events
  const expected = Object.entries(counts)
    .filter(([ip, count]) => count > 40)
    .map(([ip]) => ip)
    .sort();

  const blob = new Blob([logs], { type: "text/plain" });

  const answer = (input) => {
    try {
      let userAns = JSON.parse(input);
      // Handle { "ips": [...] } or similar wrapper objects
      if (!Array.isArray(userAns) && typeof userAns === 'object' && userAns !== null) {
        const arrays = Object.values(userAns).filter(Array.isArray);
        if (arrays.length === 1) userAns = arrays[0];
      }
      
      if (!Array.isArray(userAns)) return false;
      return JSON.stringify(userAns.sort()) === JSON.stringify(expected);
    } catch(e) { return false; }
  };

  const question = html`
    <div class="mb-3">
      <h4>Case Study: Botnet Attack Detection (Regex)</h4>
      <p>
        You are a <strong>Cyber Security Analyst</strong> tracking a distributed botnet. 
        Your firewall logs contain a mix of valid security alerts and unrelated system errors involving library version numbers.
      </p>
      <p>
        <strong>Challenge:</strong> Some log messages contain version numbers (e.g., <code>v10.2.4.1</code>) that look like IPs. 
        Your Regex must be precise enough to extract <strong>only</strong> the Host IPs and ignore these version artifacts.
      </p>
      
      <h3>Task</h3>
      <ol>
        <li>Download the security log file below.</li>
        <li>Extract IPs **only** from lines tagged <code>[ALERT]</code>, <code>[WARN]</code>, or <code>[ERROR]</code>. (Ignore <code>[INFO]</code> tags).</li>
        <li><strong>Exclude</strong> any version numbers (which appear prefixed with 'v', e.g., 'v1.2.3.4').</li>
        <li>Count the total malicious events per Valid Host IP.</li>
        <li>Identify IPs responsible for <strong>more than 40</strong> malicious events.</li>
        <li>Return the list of Botnet IPs as a sorted JSON array.</li>
      </ol>
      
      <p>
        Download Security Log:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.log`)}>
          ${id}.log
        </button>
      </p>

      <label for="${id}" class="form-label">Botnet IPs (JSON Array):</label>
      <input type="text" class="form-control" name="${id}" id="${id}">
      <p class="text-muted">
        Use shell tools such as <code>grep</code>, <code>awk</code>, <code>cut</code>, and <code>wc</code>.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/*
  Solution using grep (Regex):
  
  # 1. Filter for Malicious Tags ([ALERT], [WARN], [ERROR])
  # 2. Extract IPs using Regex with Word Boundaries (\b) to exclude version numbers (v1.2.3.4)
  # 3. Sort and Count
  # 4. Filter > 40
  
  grep -E "\[ALERT\]|\[WARN\]|\[ERROR\]" q-server-log-analysis.log \
    | grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b" \
    | sort \
    | uniq -c \
    | awk '$1 > 40 {print $2}' \
    | sort
*/
