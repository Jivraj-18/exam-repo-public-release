export default function ({ user, weight }) {
  return {
    id: "orbit-ops-returns-dbt",
    title: "Returns Throughput Analytics (dbt)",
    weight,

    prompt: `
Build a dbt intermediate model for Orbit Ops returns analytics.

Requirements:
• Use {{ config(...) }} with materialization and operations tag
• Reference upstream models using {{ ref() }}
• Filter last 45 days using current_date
• Weekly aggregation using date_trunc
• Metrics:
  - Total returns
  - Avg processing_hours
  - Avg processing_hours excluding restock reasons
• Ignore NULL or negative processing_hours
• Use coalesce for safety
• Business-friendly column aliases
• Chronological ordering

Warehouse: Snowflake / BigQuery compatible

Submission:
Paste the full dbt SQL model.
    `,

    type: "code",
    answer: null,
  };
}
