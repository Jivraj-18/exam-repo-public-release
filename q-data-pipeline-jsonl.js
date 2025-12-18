import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

/** Pick a single random element from an array */
const pick = (array, random) => array[Math.floor(random() * array.length)];

/** Trigger file download in the browser */
function download(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default async function({ user, weight = 1.5 }) {
  const id = "q-data-pipeline-jsonl";
  const title = "Data Pipeline: JSONL Processing";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate IoT sensor data
  const sites = ["Factory-A", "Factory-B", "Warehouse-1", "Warehouse-2", "Lab-Main", "Lab-Annex"];
  const deviceTypes = ["sensor", "thermostat", "pump", "valve", "compressor", "fan"];
  const statusValues = ["active", "idle", "maintenance", "error", "offline"];

  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;
  const randFloat = (min, max, decimals = 2) => {
    const factor = 10 ** decimals;
    return Math.round((min + random() * (max - min)) * factor) / factor;
  };

  const recordCount = 300 + Math.floor(random() * 200);
  const records = [];

  const startDate = new Date("2024-11-01T00:00:00Z");
  const endDate = new Date("2024-12-15T23:59:59Z");

  for (let i = 0; i < recordCount; i++) {
    const site = pick(sites, random);
    const deviceType = pick(deviceTypes, random);
    const deviceId = `${deviceType}-${String(randInt(1, 99)).padStart(3, "0")}`;
    const status = pick(statusValues, random);

    // Generate timestamp
    const timestamp = new Date(startDate.getTime() + random() * (endDate.getTime() - startDate.getTime()));

    // Temperature: 70% Celsius, 30% Fahrenheit
    const tempCelsius = randFloat(15, 85, 2);
    const useFahrenheit = random() < 0.3;
    const tempValue = useFahrenheit ? Math.round(((tempCelsius * 9) / 5 + 32) * 100) / 100 : tempCelsius;
    const tempUnit = useFahrenheit ? "F" : "C";

    const record = {
      site,
      device_id: deviceId,
      device_type: deviceType,
      timestamp: timestamp.toISOString(),
      status,
      readings: {
        temperature: { value: tempValue, unit: tempUnit },
        humidity: randFloat(30, 90, 1),
        pressure: randFloat(980, 1040, 1)
      },
      metadata: {
        firmware: `v${randInt(1, 3)}.${randInt(0, 9)}.${randInt(0, 99)}`,
        batch_id: `B${randInt(1000, 9999)}`
      }
    };

    records.push({
      ...record,
      _tempCelsius: tempCelsius,  // For answer computation
      _skipForAvg: status === "maintenance" || status === "error" || status === "offline"
    });
  }

  // Generate JSONL content (without internal fields)
  const jsonlLines = records.map(r => {
    const { _tempCelsius, _skipForAvg, ...record } = r;
    return JSON.stringify(record);
  });
  const blob = new Blob([jsonlLines.join("\n")], { type: "application/jsonl" });

  // Generate query parameters
  const targetSite = pick(sites, random);
  const targetDeviceType = pick(deviceTypes, random);

  // Generate time window (7-14 days within the range)
  const windowStart = new Date(startDate.getTime() + random() * (endDate.getTime() - startDate.getTime() - 14 * 24 * 60 * 60 * 1000));
  const windowEnd = new Date(windowStart.getTime() + randInt(7, 14) * 24 * 60 * 60 * 1000);

  // Calculate expected answer
  const filteredRecords = records.filter(r => 
    r.site === targetSite &&
    r.device_type === targetDeviceType &&
    !r._skipForAvg &&
    new Date(r.timestamp) >= windowStart &&
    new Date(r.timestamp) <= windowEnd
  );

  let expectedAnswer = 0;
  if (filteredRecords.length > 0) {
    const sum = filteredRecords.reduce((s, r) => s + r._tempCelsius, 0);
    expectedAnswer = Math.round((sum / filteredRecords.length) * 100) / 100;
  }

  const formatDate = (d) => d.toISOString().replace(".000Z", "Z").replace("T", " ");

  const answer = async (value) => {
    const numValue = parseFloat(String(value).replace(/[^0-9.-]/g, ""));
    if (!Number.isFinite(numValue)) throw new Error("Enter the average temperature in °C");

    if (filteredRecords.length === 0) {
      throw new Error("No matching records found - check your filters");
    }

    if (Math.abs(numValue - expectedAnswer) > 0.5) {
      throw new Error(`Incorrect. Expected ~${expectedAnswer}°C. Did you convert F→C and exclude maintenance/error/offline?`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>SensorFlow: IoT Data Pipeline</h2>
      
      <p>
        <strong>SensorFlow</strong> aggregates telemetry from industrial IoT devices. Each device
        emits JSON documents, but legacy devices report temperatures in Fahrenheit while newer ones
        use Celsius. Your task is to build a data pipeline that normalizes and aggregates this data.
      </p>

      <h3>Data Schema</h3>
      <pre class="bg-dark text-light p-3" style="font-size: 11px;"><code>{
  "site": "Factory-A",
  "device_id": "sensor-042",
  "device_type": "sensor",
  "timestamp": "2024-11-15T14:30:00.000Z",
  "status": "active",        // active, idle, maintenance, error, offline
  "readings": {
    "temperature": {"value": 72.5, "unit": "F"},  // or "C"
    "humidity": 45.2,
    "pressure": 1013.5
  },
  "metadata": {...}
}</code></pre>

      <h3>Your Task</h3>
      <ol>
        <li>Download the JSONL file (one JSON object per line)</li>
        <li>Filter records:
          <ul>
            <li>Site: <strong>${targetSite}</strong></li>
            <li>Device type: <strong>${targetDeviceType}</strong></li>
            <li>Time window: <strong>${formatDate(windowStart)}</strong> to <strong>${formatDate(windowEnd)}</strong></li>
            <li>Exclude <code>status</code> = <code>maintenance</code>, <code>error</code>, or <code>offline</code></li>
          </ul>
        </li>
        <li>Convert all temperatures to <strong>Celsius</strong> (F→C: <code>(F - 32) * 5/9</code>)</li>
        <li>Calculate the <strong>average temperature</strong> to 2 decimal places</li>
      </ol>

      <p>
        <button class="btn btn-primary btn-sm" @click=${() => download(blob, `${id}.jsonl`)}>
          Download ${id}.jsonl
        </button>
        <span class="text-muted ms-2">(${recordCount} records)</span>
      </p>

      <h4>Python Solution Approach</h4>
      <pre class="bg-dark text-light p-3" style="font-size: 11px;"><code>import json
from datetime import datetime

# Read JSONL file
with open("${id}.jsonl") as f:
    records = [json.loads(line) for line in f]

# Filter and convert
filtered = []
for r in records:
    # Apply filters: site, device_type, timestamp, status
    # Convert temperature to Celsius if unit is "F"
    # Append to filtered list

# Calculate average
avg = sum(temps) / len(temps)
print(round(avg, 2))</code></pre>

      <label for="${id}" class="form-label">
        Average temperature (°C) for ${targetDeviceType} devices at ${targetSite}?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" step="0.01" required style="max-width: 200px" />
      <p class="text-muted">Round to 2 decimal places. ~${filteredRecords.length} matching records.</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution:

# /// script
# requires-python = ">=3.12"
# dependencies = []
# ///

import json
from datetime import datetime

def process_sensor_data(filename, target_site, target_device_type, start_time, end_time):
    """Process JSONL sensor data and compute average temperature."""
    
    # Parse timestamps
    start_dt = datetime.fromisoformat(start_time.replace("Z", "+00:00"))
    end_dt = datetime.fromisoformat(end_time.replace("Z", "+00:00"))
    
    temps_celsius = []
    
    with open(filename) as f:
        for line in f:
            record = json.loads(line)
            
            # Filter by site
            if record["site"] != target_site:
                continue
            
            # Filter by device type
            if record["device_type"] != target_device_type:
                continue
            
            # Filter by status
            if record["status"] in ("maintenance", "error", "offline"):
                continue
            
            # Filter by time window
            ts = datetime.fromisoformat(record["timestamp"].replace("Z", "+00:00"))
            if ts < start_dt or ts > end_dt:
                continue
            
            # Get temperature and convert to Celsius
            temp_reading = record["readings"]["temperature"]
            temp_value = temp_reading["value"]
            temp_unit = temp_reading["unit"]
            
            if temp_unit == "F":
                temp_celsius = (temp_value - 32) * 5 / 9
            else:
                temp_celsius = temp_value
            
            temps_celsius.append(temp_celsius)
    
    if not temps_celsius:
        return None
    
    avg = sum(temps_celsius) / len(temps_celsius)
    return round(avg, 2)

if __name__ == "__main__":
    # Replace with actual values from the question
    result = process_sensor_data(
        "q-data-pipeline-jsonl.jsonl",
        target_site="Factory-A",
        target_device_type="sensor",
        start_time="2024-11-10T00:00:00Z",
        end_time="2024-11-24T00:00:00Z"
    )
    print(f"Average temperature: {result}°C")

*/
