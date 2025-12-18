import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.25 }) {
  const id = "q-sql-clv-segment";
  const title = "SQL: High-Value Customer Identification";

  const answer = "Premium";

  const question = html`
    <div class="mb-3">
      <h5>VaultCommerce: Customer Lifetime Value Analysis</h5>
      <p>
        VaultCommerce segments customers into Bronze, Silver, Gold, and Premium tiers 
        based on purchase history. Marketing needs to know which segment has the highest 
        average order frequency (orders per customer) to design targeted retention campaigns.
      </p>
      
      <h6>Database Schema</h6>
      <ul>
        <li><code>customers</code>: customer_id, name, email, segment, signup_date</li>
        <li><code>orders</code>: order_id, customer_id, order_date, total_amount, status</li>
      </ul>

      <h6>SQL Requirements</h6>
      <ol>
        <li>Filter orders to status = 'completed' only</li>
        <li>Join customers and orders tables</li>
        <li>Calculate orders per customer by segment: COUNT(orders) / COUNT(DISTINCT customer_id)</li>
        <li>Group by segment and order by average frequency descending</li>
        <li>Return the segment name with highest order frequency</li>
      </ol>

      <pre class="bg-light p-2"><code>-- Load database
sqlite3 vaultcommerce.db < q-sql-clv-segment.sql</code></pre>

      <label for="${id}" class="form-label">
        Which customer segment has the highest order frequency?
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        placeholder="Segment name"
      />
      <small class="form-text text-muted">
        Use COUNT(order_id) and COUNT(DISTINCT customer_id) with GROUP BY segment
      </small>
    </div>
  `;

  return { id, title, weight, question, answer };
}