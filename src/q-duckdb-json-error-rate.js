export default async function ({ user, weight = 1 }) {
  return {
    id: "duckdb_json_error_rate",
    weight,

    help: [
      `
DuckDB + JSON — API Error Rate Analysis

Orbit Commerce collects API gateway logs in JSON Lines (JSONL) format.
Each line represents one request and includes nested metadata about
response status and latency.

A sample record looks like this:

{
  "timestamp": "2024-05-14T09:41:22Z",
  "service": "checkout",
  "region": "aps1",
  "http": {
    "method": "POST",
    "status": 502,
    "latency_ms": 812
  }
}

Table source: JSONL file read via DuckDB

Task:

1. Read the JSONL file using read_json_auto.
2. Filter records to:
   - service = 'checkout'
   - region = 'aps1'
3. Treat any HTTP status code >= 500 as an error.
4. Compute:
   - total request count
   - error request count
5. Calculate the error rate:
   error_rate = error_requests / total_requests

Assume the filtered dataset contains:
- 240 total requests
- 18 error responses
      `,
    ],

    question: `
What is the error rate?
(Round your answer to two decimal places.)
    `,

    type: "number",
    answer: 0.08,
  };
}
