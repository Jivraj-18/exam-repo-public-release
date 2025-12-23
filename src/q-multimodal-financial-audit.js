import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-multimodal-financial-audit";
  const title = "Advanced Forensic Data Analysis: The Global Shell Audit";
  const random = seedrandom(`${user.email}#${id}`);

  // Scenario constants
  const targetRegion = ["Southeast Asia", "Eastern Europe", "Caribbean", "Sub-Saharan Africa"][Math.floor(random() * 4)];
  const anomalyThreshold = (random() * 0.15 + 0.10).toFixed(2); // 10% - 25%
  const targetYear = 2024;

  // Data Generation: Synthetic Financial & Geospatial Logs
  const records = [];
  const entities = ["Titan-Corp", "Vanguard-LLC", "Apex-Holdings", "Zenith-Global"];
  const selectedEntity = entities[Math.floor(random() * entities.length)];
  
  let suspiciousCount = 0;
  for (let i = 0; i < 500; i++) {
    const entity = entities[Math.floor(random() * entities.length)];
    const amount = Math.floor(random() * 1000000) + 50000;
    const isAnomaly = random() < parseFloat(anomalyThreshold);
    
    // Geographical drift: Anomalies happen outside expected lat/long bounds
    const lat = entity === selectedEntity && isAnomaly ? (random() * 20 + 50) : (random() * 10 - 5);
    const lon = entity === selectedEntity && isAnomaly ? (random() * 20 + 100) : (random() * 10 + 20);
    
    records.push({
      timestamp: new Date(targetYear, 0, i % 365).toISOString(),
      entity,
      amount,
      latitude: lat.toFixed(4),
      longitude: lon.toFixed(4),
      description_b64: btoa(`Transaction for service ${i} - code: ${isAnomaly ? 'ERR_09' : 'OK_200'}`)
    });

    if (entity === selectedEntity && isAnomaly) suspiciousCount++;
  }

  const csvContent = "timestamp,entity,amount,latitude,longitude,description_b64\n" + 
    records.map(r => `${r.timestamp},${r.entity},${r.amount},${r.latitude},${r.longitude},${r.description_b64}`).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  const question = html`
    <div class="mb-3">
      <h2>Scenario: Forensic Multi-Vector Analysis</h2>
      <p>
        As a lead analyst at **Sentinel Invest**, you've received a high-risk CSV log containing financial movements 
        for several shell entities. Your task is to identify specific "Geospatial-Financial Anomalies" that 
        indicate money laundering.
      </p>

      <h3>Task Requirements</h3>
      <ol>
        <li>Download the <code>audit_raw.csv</code> dataset.</li>
        <li><strong>Text Decoding:</strong> The <code>description_b64</code> column is Base64 encoded. You must 
            decode it to identify records containing the flag <strong>"ERR_09"</strong>.</li>
        <li><strong>Geospatial Filter:</strong> Identify transactions for <strong>${selectedEntity}</strong> that 
            occurred at latitudes <strong>above 45.0</strong> (indicating off-shore activity).</li>
        <li><strong>Financial Aggregation:</strong> Using <strong>Python (Pandas)</strong> or <strong>SQL (DuckDB)</strong>, 
            calculate the total count of these specific high-risk transactions.</li>
      </ol>

      <div class="my-3">
        <button class="btn btn-danger" type="button" @click=${() => download(blob, `audit_raw.csv`)}>
          Download audit_raw.csv
        </button>
      </div>

      <label for="${id}" class="form-label">
        How many transactions for <strong>${selectedEntity}</strong> contain the "ERR_09" flag 
        AND occurred above 45.0 Latitude?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
      
      <p class="text-muted mt-2">
        <small>Hint: You'll need to use <code>base64</code> decoding in Python or a custom SQL function 
        to read the descriptions.</small>
      </p>
    </div>
  `;

  const answer = async (value) => {
    const numeric = parseInt(value, 10);
    if (numeric !== suspiciousCount) throw new Error("The count does not match the forensic evidence. Re-check your filters.");
    return true;
  };

  return { id, title, weight, question, answer };
}