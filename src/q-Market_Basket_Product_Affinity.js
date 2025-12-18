import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-product-affinity";
  const title = "DuckDB: Market Basket Product Affinity";

  const answer = "laptop-mouse";

  const question = html`
    <div class="mb-3">
      <h5>CartInsight: Product Co-Purchase Analysis</h5>
      <p>
        CartInsight wants to identify the product pair most frequently purchased together 
        in the same transaction to optimize product bundling and placement strategies.
      </p>
      
      <h6>Tables Provided</h6>
      <ul>
        <li><code>transactions.csv</code>: transaction_id, customer_id, transaction_date</li>
        <li><code>line_items.csv</code>: transaction_id, product_id, quantity, price</li>
        <li><code>products.csv</code>: product_id, product_name, category</li>
      </ul>

      <h6>DuckDB Analysis Steps</h6>
      <ol>
        <li>Self-join line_items on transaction_id where product_id differs</li>
        <li>Ensure product pairs are unique (e.g., A-B equals B-A, count once)</li>
        <li>Join with products table to get product names</li>
        <li>Count co-occurrences and rank by frequency</li>
        <li>Return the top product pair (format: product1-product2 alphabetically)</li>
      </ol>

      <pre class="bg-light p-2"><code>-- Example DuckDB query structure
CREATE TEMP TABLE pairs AS
SELECT 
  LEAST(p1.product_name, p2.product_name) as prod1,
  GREATEST(p1.product_name, p2.product_name) as prod2,
  COUNT(*) as frequency
FROM line_items l1
JOIN line_items l2 ON l1.transaction_id = l2.transaction_id
  AND l1.product_id < l2.product_id
JOIN products p1 ON l1.product_id = p1.product_id
JOIN products p2 ON l2.product_id = p2.product_id
GROUP BY 1, 2
ORDER BY frequency DESC;</code></pre>

      <label for="${id}" class="form-label">
        Which product pair has the highest co-purchase frequency?
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        placeholder="product1-product2"
      />
      <small class="form-text text-muted">
        Answer in lowercase with hyphen separator, alphabetically ordered
      </small>
    </div>
  `;

  return { id, title, weight, question, answer };
}