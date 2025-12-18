import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-timeseries-anomaly";
  const title = "Data Analysis: Anomaly Detection";
  const random = seedrandom(`${user.email}#${id}`);

  // Generate random walk
  let value = 50;
  const data = [];
  const start = 1700000000;
  let anomalyTimestamp = 0;
  let anomalyIndex = -1;

  for (let i = 0; i < 200; i++) {
    const timestamp = start + i * 60;
    // Normal noise
    value += (random() - 0.5) * 5;
    
    // Inject anomaly at random point after index 100
    if (anomalyIndex === -1 && i > 100 && random() > 0.9) {
      value += 40; // Massive spike
      anomalyIndex = i;
      anomalyTimestamp = timestamp;
    }
    
    data.push(`${timestamp},${value.toFixed(2)}`);
    // Revert spike to keep series relatively stable
    if (i === anomalyIndex) value -= 40; 
  }

  // If no anomaly generated (rare), force one at end
  if (anomalyIndex === -1) {
    anomalyIndex = 199;
    anomalyTimestamp = start + 199 * 60;
    data[199] = `${anomalyTimestamp},150.00`;
  }

  const blob = new Blob(["timestamp,cpu_usage\n" + data.join("\n")], { type: "text/csv" });

  const answer = async (response) => {
    const input = parseInt(response.trim());
    if (input !== anomalyTimestamp) throw new Error("Incorrect timestamp. Did you look for the largest sudden spike?");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Case Study: Server Health Monitoring</h2>
      <p>
        OpsTeam needs to identify the exact second a CPU spike occurred to correlate it with deployment logs.
      </p>
      <p>
        The CSV file contains a time series of CPU usage. It follows a random walk pattern with normal noise, but there is <strong>one specific point</strong> where the value spikes significantly (an outlier) compared to its immediate neighbors.
      </p>
      <h3>Task</h3>
      <ol>
        <li>Download the CSV.</li>
        <li>Implement a simple anomaly detection logic (e.g., Z-Score or simply finding the maximum absolute difference from the moving average).</li>
        <li>Identify the <strong>Unix Timestamp</strong> of the first major anomaly.</li>
      </ol>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `cpu_metrics.csv`)}>
          Download cpu_metrics.csv
        </button>
      </p>

      <label for="${id}" class="form-label">Timestamp of Anomaly</label>
      <input class="form-control" id="${id}" name="${id}" type="number" required placeholder="e.g. 1700006000" />
    </div>
  `;

  return { id, title, weight, question, answer };
}


/* Solution

# /// script
# requires-python = ">=3.13"
# dependencies = [
#     "csv"
# ]
# ///

import csv

filename = "cpu_metrics.csv"
max_diff = 0
anomaly_timestamp = 0
prev_value = None

try:
    with open(filename, "r") as f:
        reader = csv.reader(f)
        next(reader) # Skip header
        
        for row in reader:
            timestamp = int(row[0])
            value = float(row[1])
            
            if prev_value is not None:
                # Calculate the sudden jump (absolute difference)
                diff = abs(value - prev_value)
                if diff > max_diff:
                    max_diff = diff
                    # The anomaly is the current point causing the spike
                    anomaly_timestamp = timestamp
            
            prev_value = value

    print(f"Anomaly detected at Timestamp: {anomaly_timestamp}")

except FileNotFoundError:
    print("Please download 'cpu_metrics.csv' first.")
*/