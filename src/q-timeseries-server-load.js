import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-timeseries-server-load";
  const title = "Time Series: Peak Load Hour";

  const random = seedrandom(`${user.email}#${id}`);

  const rows = [["timestamp", "cpu_usage_percent"]];
  const data = [];
  
  // Generate 24 hours of data, minute by minute
  const start = new Date("2024-01-01T00:00:00Z");
  
  // Pick a random "peak" hour (e.g., 14:00)
  const peakHour = Math.floor(random() * 24);
  
  const hourlyAverages = new Array(24).fill(0);
  const hourlyCounts = new Array(24).fill(0);

  for (let i = 0; i < 1440; i++) { // 24 * 60 minutes
    const current = new Date(start.getTime() + i * 60000);
    const hour = current.getUTCHours();
    
    // Base load + random noise + surge during peak hour
    let load = 20 + Math.floor(random() * 30);
    if (hour === peakHour) {
      load += 40; // Massive spike
    } else if (hour === (peakHour + 1) % 24 || hour === (peakHour - 1 + 24) % 24) {
      load += 20; // Shoulder spike
    }

    // Cap at 100
    load = Math.min(100, load);

    rows.push([current.toISOString(), load]);
    
    hourlyAverages[hour] += load;
    hourlyCounts[hour]++;
  }

  const blob = new Blob([rows.map(r => r.join(",")).join("\n")], { type: "text/csv" });

  // Verify answer calculation
  let maxAvg = -1;
  let maxHour = -1;
  
  for(let h=0; h<24; h++) {
    const avg = hourlyAverages[h] / hourlyCounts[h];
    if (avg > maxAvg) {
        maxAvg = avg;
        maxHour = h;
    }
  }

  const answer = async (value) => {
    const input = parseInt(value, 10);
    if (input !== maxHour) throw new Error("Incorrect peak hour.");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2 id="server-load">DevOps: Peak CPU Analysis</h2>
      <p>
        The infrastructure team wants to identify the hour of the day with the highest average CPU load to schedule backups.
      </p>
      <h3>Task</h3>
      <ol>
        <li>Download the CPU metrics (minute-level granularity).</li>
        <li>Group the data by the <strong>hour</strong> of the timestamp (UTC).</li>
        <li>Calculate the average <code>cpu_usage_percent</code> for each hour.</li>
        <li>Identify the hour (0-23) with the highest average.</li>
      </ol>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>
      <label for="${id}" class="form-label">
        Which hour (0-23) had the highest average CPU load?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" min="0" max="23" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}