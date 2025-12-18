export default function duckdbStreamingJoinQuestion({ user, weight }) {
  return {
    id: "q-duckdb-streaming-join",
    title: "DuckDB Streaming Join for Delivery Analysis",
    weight,
    prompt: `
Use DuckDB to join orders.csv and shipments.jsonl on order_id.
- Filter for region="APAC" and status="delivered"
- Compute average delivery time in days
- Return result rounded to 2 decimals
    `,
  };
}