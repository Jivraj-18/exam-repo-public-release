import { html } from "htl";

export default function ({ user, weight = 1 }) {
  const configs = [
    { by: "department", metric: "salary" },
    { by: "city", metric: "revenue" },
    { by: "region", metric: "sales" },
  ];
  const config = configs[user.email.charCodeAt(3) % configs.length];

  return {
    id: "pandas-pipeline",
    weight,
    answer: html`
      <div>
        <h2>Pandas Data Transformation Pipeline</h2>
        <p>Create a data processing pipeline using method chaining.</p>

        <h3>Dataset (sales_data.csv):</h3>
        <pre style="background: #f5f5f5; padding: 10px;">
date,${config.by},product,quantity,${config.metric},status
2024-01-01,North,Widget,10,1000,active
2024-01-02,,Widget,5,500,active
2024-01-03,South,Widget,0,0,cancelled
        </pre>

        <h3>Requirements:</h3>
        <ol>
          <li>Load CSV and convert date to datetime</li>
          <li>Filter out cancelled status</li>
          <li>Fill missing ${config.by} with 'Unknown'</li>
          <li>Remove rows where quantity or ${config.metric} is 0</li>
          <li>Create column: per_unit = ${config.metric} / quantity</li>
          <li>Group by ${config.by}, calculate sum, mean, count</li>
          <li>Sort by total ${config.metric} descending</li>
        </ol>

        <p><strong>Use method chaining (one continuous pipeline)!</strong></p>

        <textarea
          id="pandas-code"
          rows="18"
          cols="90"
          placeholder="import pandas as pd

result = (
    pd.read_csv('sales_data.csv')
    # Continue chaining...
)"
          style="font-family: monospace; width: 100%; padding: 10px;"
        ></textarea>

        <details>
          <summary style="cursor: pointer; color: blue;">Reference Solution</summary>
          <pre style="background: #f5f5f5; padding: 10px;">
import pandas as pd

result = (
    pd.read_csv('sales_data.csv')
    .assign(date=lambda df: pd.to_datetime(df['date']))
    .query("status != 'cancelled'")
    .assign(${config.by}=lambda df: df['${config.by}'].fillna('Unknown'))
    .query("quantity > 0 and ${config.metric} > 0")
    .assign(per_unit=lambda df: df['${config.metric}'] / df['quantity'])
    .groupby('${config.by}')
    .agg({
        '${config.metric}': 'sum',
        'quantity': 'mean',
        'product': 'count'
    })
    .rename(columns={'${config.metric}': 'total_${config.metric}'})
    .sort_values('total_${config.metric}', ascending=False)
    .reset_index()
)
          </pre>
        </details>
      </div>
    `,
    validate: async () => {
      const code = document.getElementById("pandas-code").value.trim();
      if (!code) throw new Error("Provide pandas code");
      
      const required = ["read_csv", "fillna", "groupby", "sort_values"];
      const missing = required.filter(m => !code.includes(m));
      if (missing.length > 0) {
        throw new Error(`Missing methods: ${missing.join(", ")}`);
      }
      
      if (!code.includes("query") && !code.includes("[") && !code.includes("filter")) {
        throw new Error("Must include filtering logic");
      }
      
      return { code, config };
    },
  };
}
