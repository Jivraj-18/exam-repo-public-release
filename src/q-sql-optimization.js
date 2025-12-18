import { html } from "htl";

export default function ({ user, weight = 1 }) {
  const thresholds = [5000, 10000, 15000];
  const minOrders = thresholds[user.email.charCodeAt(2) % thresholds.length];

  return {
    id: "sql-optimization",
    weight,
    answer: html`
      <div>
        <h2>SQL Query Optimization</h2>
        <p>This query is slow on a large e-commerce database:</p>
        
        <pre style="background: #ffe6e6; padding: 10px;">
SELECT c.email, COUNT(o.order_id) as total_orders
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= '2024-01-01'
  AND o.status = 'completed'
  AND c.country = 'India'
GROUP BY c.customer_id, c.email
HAVING COUNT(o.order_id) > ${minOrders}
ORDER BY total_orders DESC;
        </pre>

        <h3>Task 1: Write CREATE INDEX statements to optimize this query</h3>
        <textarea
          id="indexes"
          rows="10"
          cols="80"
          placeholder="CREATE INDEX idx_name ON table(columns)..."
          style="font-family: monospace; width: 100%; padding: 10px;"
        ></textarea>

        <h3>Task 2: Explain why each index helps</h3>
        <textarea
          id="explanation"
          rows="8"
          cols="80"
          placeholder="Explain how indexes improve performance..."
          style="font-family: monospace; width: 100%; padding: 10px;"
        ></textarea>

        <details>
          <summary style="cursor: pointer; color: blue;">Reference Solution</summary>
          <pre style="background: #f5f5f5; padding: 10px;">
-- Index for country filtering
CREATE INDEX idx_customers_country ON customers(country);

-- Composite index for date and status filtering
CREATE INDEX idx_orders_date_status ON orders(order_date, status);

-- Foreign key index for efficient joins
CREATE INDEX idx_orders_customer_id ON orders(customer_id);

Explanation:
- idx_customers_country: Avoids full table scan when filtering by country
- idx_orders_date_status: Speeds up WHERE clause on both date and status
- idx_orders_customer_id: Optimizes JOIN between customers and orders
          </pre>
        </details>
      </div>
    `,
    validate: async () => {
      const indexes = document.getElementById("indexes").value.trim();
      const explanation = document.getElementById("explanation").value.trim();
      
      if (!indexes) throw new Error("Provide index statements");
      if (!explanation) throw new Error("Provide explanation");
      
      if (!indexes.toUpperCase().includes("CREATE INDEX")) {
        throw new Error("Must include CREATE INDEX statements");
      }
      
      const hasRelevantIndexes = 
        (indexes.includes("country") || indexes.includes("customer")) &&
        (indexes.includes("order_date") || indexes.includes("status"));
      
      if (!hasRelevantIndexes) {
        throw new Error("Indexes should target key columns: country, order_date, status, customer_id");
      }
      
      return { indexes, explanation, minOrders };
    },
  };
}
