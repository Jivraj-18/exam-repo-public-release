export default function ({ user, weight = 1 }) {
  return {
    id: "duckdb_sku_profitability",
    weight,

    prompt: `
**DuckDB: SKU Tier Profitability**

You are provided:
- sku_master (sku, tier, unit_cost)
- sales (sku, units, unit_price, sale_date)

**Task**
1. Load both CSVs into DuckDB.
2. Filter sales after \`2024-06-01\`.
3. Compute gross margin by **tier**:
   \`(revenue - cost) / revenue\`
4. Identify the tier with the **highest margin**.

**Output**
Return only the tier name.
    `,

    answer: "Enterprise",

    tolerance: 0,
  };
}
