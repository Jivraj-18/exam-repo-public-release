import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-multiformat-diagnostics";
  const title = "DuckDB – Multi-Format Data Quality Metrics";

  const answer = async (sql) => {
    sql = sql.trim();

    // Very light validation – must start with SELECT and contain UNION ALL  
    // (Manual SQL review is required – like all DuckDB questions)
    const upper = sql.toUpperCase();

    if (!upper.startsWith("SELECT")) {
      throw new Error("Your answer must begin with a SELECT query");
    }

    if (!upper.includes("UNION ALL")) {
      throw new Error("Your query must read and combine all three source tables using UNION ALL.");
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>DuckDB Multi-Format Diagnostics for NovaRetail</h2>

      <p>
        NovaRetail integrates order data from 3 different file sources:
        CSV, JSON, and Parquet. These have been loaded into DuckDB tables:
      </p>

      <pre>
csv_orders(order_id, customer, order_date, product, amount, region)
json_orders(order_id, customer, order_date, product, amount, region)
parquet_orders(order_id, customer, order_date, product, amount, region)
      </pre>

      <p>
        Product names contain inconsistent formatting:
        case differences, leading/trailing spaces, and duplicate spacing.
        Some rows contain NULL customers, and regional coverage differs across formats.
      </p>

      <h3>Your Task</h3>

      <p>
        Write a DuckDB SQL query that combines all three tables using
        <strong>UNION ALL</strong> and returns exactly one row with these four columns:
      </p>

      <ul>
        <li>
          <strong>product_count:</strong> number of unique cleaned product names.
          Cleaning logic:
          lower(), trim(), and collapse duplicate spaces using regexp_replace().
        </li>

        <li>
          <strong>region_count:</strong> distinct regions across all data.
        </li>

        <li>
          <strong>unknown_customers:</strong> count of rows where customer IS NULL.
        </li>

        <li>
          <strong>us_value_share:</strong>
          sum(amount WHERE region='US') ÷ sum(amount overall).
        </li>
      </ul>

      <p>
        Ignore rows where <code>amount</code> IS NULL. Cleaning must be applied before
        product distinct counting. You may use any number of CTEs.
      </p>

      <p>
        Enter your DuckDB SQL query below:
      </p>

      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="10"
        required
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
