export default async function ({ user, weight = 1 }) {
  return {
    id: "q-fastapi-cache-variant",
    title: "FastAPI Sensor Analytics with Caching",
    weight,

    prompt: `
Create a FastAPI endpoint /stats that analyzes IoT sensor data.

CSV columns:
timestamp, location, sensor, value

Query parameters (all optional):
location, sensor, start_date, end_date

Return:
{
  "stats": { "count", "avg", "min", "max" }
}

Requirements:
• Enable CORS for all origins
• Implement response caching
• Cached responses must return header: X-Cache: HIT
• Fresh responses must return: X-Cache: MISS
• Cache key must depend on query parameters
    `,

    outputSpec: "FastAPI endpoint URL (e.g. http://127.0.0.1:8000/stats)",

    help: [
      "Use functools.lru_cache or a dictionary cache",
      "Filter CSV rows before aggregation",
      "Average only numeric values"
    ]
  };
}
