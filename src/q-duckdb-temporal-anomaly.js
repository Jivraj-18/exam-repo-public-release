import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 2.5 }) {
  const id = "q-duckdb-temporal-anomaly";
  const title = "DuckDB: Temporal Anomaly Detection with Timezone Hell";

  const random = seedrandom(`${user.email}#${id}`);
  
  // Generate complex dataset with timezone inconsistencies
  const sensors = ['SENSOR-A', 'SENSOR-B', 'SENSOR-C', 'SENSOR-D'];
  const locations = ['US/Pacific', 'US/Eastern', 'Europe/London', 'Asia/Tokyo'];
  const data = [];
  
  let anomalyCount = 0;
  const anomalyThreshold = 35.0 + (random() * 5); // 35-40 degrees
  const windowMinutes = 30 + Math.floor(random() * 30); // 30-59 minutes
  
  // Generate normal data
  for (let day = 1; day <= 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of [0, 15, 30, 45]) {
        const sensorIdx = Math.floor(random() * sensors.length);
        const sensor = sensors[sensorIdx];
        const timezone = locations[sensorIdx];
        
        // Create timestamps in different formats (nightmare!)
        let timestamp;
        const format = Math.floor(random() * 4);
        if (format === 0) {
          // ISO with timezone
          timestamp = `2024-01-0${day}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00${timezone === 'US/Pacific' ? '-08:00' : timezone === 'US/Eastern' ? '-05:00' : timezone === 'Europe/London' ? '+00:00' : '+09:00'}`;
        } else if (format === 1) {
          // Unix timestamp
          timestamp = Math.floor(new Date(`2024-01-0${day}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00Z`).getTime() / 1000);
        } else if (format === 2) {
          // US format: MM/DD/YYYY HH:MM:SS
          timestamp = `01/0${day}/2024 ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;
        } else {
          // European format: DD-MM-YYYY HH:MM:SS
          timestamp = `0${day}-01-2024 ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;
        }
        
        const temp = 20 + (random() * 10); // Normal: 20-30 degrees
        data.push({
          sensor_id: sensor,
          timestamp: timestamp,
          temperature_celsius: parseFloat(temp.toFixed(2)),
          timezone: timezone,
          quality_flag: random() > 0.1 ? 'GOOD' : 'QUESTIONABLE'
        });
      }
    }
  }
  
  // Inject anomalies (sudden temperature spikes)
  const anomalyStart = 2 + Math.floor(random() * 3); // Day 2-4
  const anomalyHour = 8 + Math.floor(random() * 8); // 8-15
  const anomalySensor = sensors[Math.floor(random() * sensors.length)];
  const anomalyTimezone = locations[sensors.indexOf(anomalySensor)];
  
  for (let offset = 0; offset < windowMinutes; offset += 15) {
    const hour = anomalyHour + Math.floor(offset / 60);
    const minute = offset % 60;
    
    const timestamp = `2024-01-0${anomalyStart}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00${anomalyTimezone === 'US/Pacific' ? '-08:00' : anomalyTimezone === 'US/Eastern' ? '-05:00' : anomalyTimezone === 'Europe/London' ? '+00:00' : '+09:00'}`;
    
    const temp = anomalyThreshold + (random() * 5); // Above threshold
    anomalyCount++;
    
    data.push({
      sensor_id: anomalySensor,
      timestamp: timestamp,
      temperature_celsius: parseFloat(temp.toFixed(2)),
      timezone: anomalyTimezone,
      quality_flag: 'GOOD'
    });
  }
  
  // Shuffle data
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
  
  // Create CSV
  const csv = [
    'sensor_id,timestamp,temperature_celsius,timezone,quality_flag',
    ...data.map(row => 
      `${row.sensor_id},${row.timestamp},${row.temperature_celsius},${row.timezone},${row.quality_flag}`
    )
  ].join('\n');
  
  const answer = anomalyCount.toString();

  const question = html`
    <div class="mb-3">
      <h2>Case Study: Industrial IoT Sensor Anomaly Detection</h2>
      <p>
        <strong>IndustrialIoT Corp</strong> monitors temperature sensors across global facilities. 
        An anomaly is defined as: <strong>≥3 consecutive readings above ${anomalyThreshold.toFixed(1)}°C 
        within a ${windowMinutes}-minute window from the same sensor</strong>.
      </p>

      <h3>Data Challenges</h3>
      <ul>
        <li><strong>Mixed timestamp formats</strong>: ISO 8601, Unix epoch, US (MM/DD/YYYY), European (DD-MM-YYYY)</li>
        <li><strong>Multiple timezones</strong>: Pacific, Eastern, UTC, Tokyo (with DST complications)</li>
        <li><strong>Data quality flags</strong>: Only count readings marked as 'GOOD'</li>
        <li><strong>Sensor drift</strong>: Temperature readings have microsecond-level jitter</li>
        <li><strong>Out-of-order data</strong>: Timestamps are NOT sorted</li>
      </ul>

      <h3>Your Task</h3>
      <p>Using <strong>DuckDB</strong>, write a query that:</p>
      <ol>
        <li>Normalizes all timestamps to UTC (handle all 4 format types)</li>
        <li>Filters for quality_flag = 'GOOD' readings only</li>
        <li>Identifies sequences of ≥3 consecutive readings above ${anomalyThreshold.toFixed(1)}°C within ${windowMinutes} minutes</li>
        <li>Counts the TOTAL number of anomalous readings across all sensors</li>
      </ol>

      <h3>Download Dataset</h3>
      <p>
        <button class="btn btn-primary btn-sm" onclick="
          const csv = \`${csv.replace(/`/g, '\\`')}\`;
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'sensor_readings.csv';
          a.click();
        ">Download sensor_readings.csv</button>
      </p>

      <h3>Sample DuckDB Query Structure</h3>
      <pre><code class="language-sql">WITH normalized_timestamps AS (
  SELECT 
    sensor_id,
    CASE 
      WHEN timestamp LIKE '%-%-%T%:%:%'   -- ISO format
      WHEN timestamp ~ '^[0-9]+$'         -- Unix epoch
      WHEN timestamp LIKE '%/%/%'         -- US format
      ELSE ...                             -- European format
    END AS utc_timestamp,
    temperature_celsius,
    quality_flag
  FROM read_csv('sensor_readings.csv')
),
windowed_data AS (
  SELECT *,
    LAG(temperature_celsius, 1) OVER w AS prev_temp_1,
    LAG(temperature_celsius, 2) OVER w AS prev_temp_2,
    LAG(utc_timestamp, 2) OVER w AS window_start
  FROM normalized_timestamps
  WHERE quality_flag = 'GOOD'
  WINDOW w AS (PARTITION BY sensor_id ORDER BY utc_timestamp)
),
anomalies AS (
  -- Your logic here to identify anomaly sequences
  ...
)
SELECT COUNT(*) FROM anomalies;</code></pre>

      <h3>Critical Hints</h3>
      <ul>
        <li>DuckDB's <code>TRY_CAST</code> and <code>strptime</code> functions handle mixed formats</li>
        <li>Use <code>EPOCH</code> and <code>AT TIME ZONE</code> for timezone conversions</li>
        <li>Window functions with <code>LAG/LEAD</code> help detect consecutive patterns</li>
        <li><code>TIMESTAMP_DIFF</code> calculates time gaps between readings</li>
        <li>Remember: UTC conversion is critical - same timestamp in different zones ≠ same moment</li>
      </ul>

      <h3>Validation</h3>
      <p>Run your query in DuckDB CLI and paste the result:</p>
      <pre><code class="language-bash">duckdb -c "$(cat your_query.sql)"</code></pre>

      <label for="${id}" class="form-label">
        Total number of anomalous temperature readings:
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
      
      <div class="mt-2 text-muted">
        <small>
          Expected format: Single integer<br>
          Time limit: 45-60 minutes recommended<br>
          Difficulty: Requires deep understanding of DuckDB temporal functions
        </small>
      </div>
    </div>
  `;

  return { id, title, weight, question, answer };
}
