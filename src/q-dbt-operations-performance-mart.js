export default function ({ user, weight = 1.0 }) {
  return {
    id: "dbt-operations-performance-mart",
    title: "Data Transformation with dbt: Operations Performance Mart",
    weight,

    description: `
Orbit Ops uses **dbt** to publish operational dashboards for leadership.
You are tasked with building an **intermediate dbt model** that powers
support dashboards focused on **first contact resolution**.

Upstream staging models (e.g., stg_shipments, stg_returns, stg_contacts)
are already available with clean column names.

Your dbt model must:
• Use {{ config(...) }} to declare materialization and freshness metadata
• Reference upstream models using {{ ref() }} (and {{ source() }} if required)
• Filter data to the **last 14 days** relative to current_date
• Aggregate metrics at a **daily grain**
• Compute business-ready metrics related to **first contact resolution**
  (include logic referencing "contact" or similar domain fields)
• Handle NULLs using coalesce / ifnull
• Return columns ordered by date and ready for BI consumption

You may assume a Snowflake- or BigQuery-compatible SQL dialect.

Paste ONLY the dbt SQL model (including Jinja templating).
Do not include explanations or comments outside SQL/Jinja.
`,

    input: {
      type: "none"
    },

    expectedOutput: {
      type: "string",
      description: "A valid dbt SQL model using Jinja templating"
    },

    grading: {
      type: "rubric",
      criteria: [
        "Uses config() with materialization settings",
        "References upstream models using ref()",
        "Filters data to last 14 days dynamically",
        "Aggregates metrics at daily grain",
        "Includes first contact resolution business logic",
        "Handles NULL values appropriately",
        "Output is BI-ready and ordered by date"
      ]
    }
  };
}
