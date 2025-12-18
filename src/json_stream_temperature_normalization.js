export default {
  id: "json-stream-temperature-normalization",

  title: "JSON Streaming and Temperature Normalization",

  marks: 1,

  difficulty: "medium",

  description: `
NimbusGrid operates a network of smart energy meters across industrial plants.
Each device emits telemetry events every minute in JSON Lines (JSONL) format.

Due to a firmware transition:
- Older devices report temperature in Fahrenheit
- Newer devices report temperature in Celsius
- Some records are logged during maintenance windows and must be excluded

The dataset is large and must be processed using streaming techniques.
  `,

  dataset: {
    description: "Telemetry events from smart energy meters in JSONL format",
    format: "jsonl",
    deterministic: true,
    sampleRecord: {
      timestamp: "2024-07-02T11:43:19.221Z",
      site: "Plant-East",
      device_id: "meter-AX42",
      status: "active",
      metrics: {
        temperature: 86.9,
        unit: "F"
      }
    }
  },

  requirements: [
    "Process the JSONL file using a streaming approach (do not load fully into memory)",
    "Filter records where site is Plant-East",
    "Only include devices whose device_id starts with meter-",
    "Restrict timestamps to between 2024-07-01T00:00:00Z and 2024-07-05T23:59:59Z (inclusive)",
    "Exclude records where status is not active",
    "Convert all temperature values to Celsius",
    "Compute the average temperature",
    "Round the result to two decimal places"
  ],

  submission: {
    type: "number",
    format: "decimal",
    precision: 2,
    example: 27.38
  },

  evaluation: {
    criteria: [
      "Correct filtering logic",
      "Proper temperature unit normalization",
      "Correct handling of time window",
      "Accurate aggregation and rounding"
    ]
  },

  allowedTools: [
    "jq",
    "Python (ijson, pandas)",
    "DuckDB JSON functions",
    "Any streaming-capable JSON parser"
  ]
};
