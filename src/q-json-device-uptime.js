export default function ({ user, weight }) {
  return {
    id: "json-device-uptime",
    weight,
    title: "JSON: Device uptime roll-up",
    description: `
Each line in the JSONL file represents a heartbeat ping.

Fields:
- device_id
- site
- timestamp
- status (online, offline, maintenance)
- uptime_seconds

Tasks:
- Stream the file (no full load)
- Filter site = DC-East
- device_id starts with edge-
- Date range: 2024-05-01 to 2024-05-15
- Exclude offline and maintenance
- Compute average uptime_seconds

Round to 2 decimals.
    `,
    answer: {
      type: "number",
      tolerance: 0.01,
    },
  };
}
