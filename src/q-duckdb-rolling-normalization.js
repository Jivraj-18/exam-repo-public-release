export default function ({ user, weight = 1 }) {
  return {
    id: "duckdb_rolling_normalization",
    title: "DuckDB: Temporal Join with Rolling Normalization",
    question: `
Orbit Metrics tracks feature usage alongside pricing changes.

### Tables

**feature_events**
- user_id
- feature
- event_date
- events_count

**pricing_changes**
- effective_date
- price_multiplier

### Task (DuckDB SQL)

1. Focus on feature = \`collaboration\`
2. Join pricing so each event_date uses the **latest effective price**
3. Compute **normalized usage** = events_count / price_multiplier
4. Calculate a **7-day rolling average** of normalized usage
5. Find the **maximum positive deviation** of daily normalized usage
   from its rolling average

### Deliverable
Enter the numeric deviation rounded to **3 decimals**.
    `,
    answer: 0.317,
    weight,
  };
}
