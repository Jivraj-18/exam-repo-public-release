import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1.5 }) {
  const id = "q-duckdb-flight-analysis";
  const title = "DuckDB: Flight Delay Analysis";

  const random = seedrandom(`${user.email}#${id}`);

  const airports = ["ATL", "ORD", "DFW", "DEN", "LAX", "JFK", "SFO", "LAS", "SEA", "PHX", "IAH", "MIA"];
  const airlines = ["AA", "DL", "UA", "WN", "B6", "AS", "NK", "F9"];
  const months = ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06"];

  const randomInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;
  const randomFloat = (min, max, decimals = 2) => {
    const factor = 10 ** decimals;
    return Math.round((min + random() * (max - min)) * factor) / factor;
  };

  const flights = [];
  const recordCount = 450 + randomInt(50, 100); // 450-550 flights

  // Generate flight data
  for (let i = 0; i < recordCount; i++) {
    const origin = pick(airports, random);
    let dest = pick(airports, random);
    while (dest === origin) dest = pick(airports, random);

    const month = pick(months, random);
    const day = String(randomInt(1, 28)).padStart(2, "0");
    const flightDate = `${month}-${day}`;
    
    const airline = pick(airlines, random);
    const flightNum = `${airline}${randomInt(100, 9999)}`;
    
    // Delay in minutes (can be negative for early arrivals)
    const delay = randomInt(-15, 90);
    const distance = randomInt(200, 2500);
    const cancelled = random() < 0.03 ? 1 : 0;

    flights.push({
      flight_number: flightNum,
      flight_date: flightDate,
      airline,
      origin,
      destination: dest,
      distance_miles: distance,
      delay_minutes: cancelled ? null : delay,
      cancelled,
    });
  }

  // Pick a specific route for the question
  const queryOrigin = pick(airports, random);
  let queryDest = pick(airports, random);
  while (queryDest === queryOrigin) queryDest = pick(airports, random);

  // Filter flights for this route that aren't cancelled
  const relevantFlights = flights.filter(
    (f) => f.origin === queryOrigin && f.destination === queryDest && f.cancelled === 0,
  );

  // Calculate expected average delay
  const expectedDelay = relevantFlights.length > 0
    ? relevantFlights.reduce((sum, f) => sum + f.delay_minutes, 0) / relevantFlights.length
    : 0;

  // Generate CSV content
  const headers = [
    "flight_number",
    "flight_date",
    "airline",
    "origin",
    "destination",
    "distance_miles",
    "delay_minutes",
    "cancelled",
  ];
  const rows = [headers];
  
  flights.forEach((f) => {
    rows.push([
      f.flight_number,
      f.flight_date,
      f.airline,
      f.origin,
      f.destination,
      f.distance_miles,
      f.delay_minutes !== null ? f.delay_minutes : "",
      f.cancelled,
    ]);
  });

  const csvContent = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  const answer = async (response) => {
    if (!response) throw new Error("Enter the average delay in minutes.");
    let value = parseFloat(response.replace(/[^\d.-]/g, ""));
    if (Number.isNaN(value)) throw new Error("Unable to parse the average delay.");

    const tolerance = 0.5;
    if (Math.abs(value - expectedDelay) > tolerance) {
      throw new Error(
        `The average delay doesn't match. Filter flights from ${queryOrigin} to ${queryDest}, exclude cancelled flights, and calculate the mean of delay_minutes.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>SkyMetrics: Flight Delay Analysis with DuckDB</h2>
      <p>
        SkyMetrics is an aviation analytics company that helps airlines optimize their operations. They need to analyze
        flight delay patterns to identify problematic routes and improve on-time performance. The company wants to use
        <strong>DuckDB</strong> for fast SQL queries on their flight data without loading everything into memory.
      </p>

      <h3>Dataset Schema</h3>
      <ul>
        <li><code>flight_number</code>: Flight identifier (airline code + number)</li>
        <li><code>flight_date</code>: Date of flight (YYYY-MM-DD)</li>
        <li><code>airline</code>: Two-letter airline code</li>
        <li><code>origin</code>: Origin airport code</li>
        <li><code>destination</code>: Destination airport code</li>
        <li><code>distance_miles</code>: Flight distance in miles</li>
        <li><code>delay_minutes</code>: Arrival delay in minutes (negative = early, empty = cancelled)</li>
        <li><code>cancelled</code>: 1 if cancelled, 0 if operated</li>
      </ul>

      <h3>Task</h3>
      <ol>
        <li>Install DuckDB: <code>pip install duckdb</code> or use <code>uv</code></li>
        <li>Load the CSV file using DuckDB</li>
        <li>
          Write a SQL query to find the <strong>average delay</strong> for flights from
          <strong>${queryOrigin}</strong> to <strong>${queryDest}</strong>
        </li>
        <li>Exclude cancelled flights (where <code>cancelled = 1</code>)</li>
        <li>Return the average delay rounded to 2 decimal places</li>
      </ol>

      <p>
        Download the flight data:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        What is the average delay in minutes for flights from ${queryOrigin} to ${queryDest}?
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., 15.75" required />
      <p class="text-muted">
        Use DuckDB's <code>read_csv_auto()</code> function and SQL aggregation. Round to 2 decimal places.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
