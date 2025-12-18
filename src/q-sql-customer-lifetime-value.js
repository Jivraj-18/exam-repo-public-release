import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1.25 }) {
  const id = "q-sql-customer-lifetime-value";
  const title = "SQL: Customer Lifetime Value Ranking";

  const random = seedrandom(`${user.email}#${id}`);

  const regions = ["North", "South", "East", "West"];
  const customers = 120 + Math.floor(random() * 80); // 120-199 customers

  const customerData = [];
  const orderData = [];

  let customersData = [];
  let ordersData = [];

  const randomNormal = () => {
    const u1 = Math.max(random(), Number.EPSILON);
    const u2 = random();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  };

  // Generate customers
  for (let i = 1; i <= customers; i++) {
    const region = regions[Math.floor(random() * regions.length)];
    const signupDate = `2023-${String(Math.floor(random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(random() * 28) + 1).padStart(2, "0")}`;

    customersData.push({
      customer_id: `CUST${String(i).padStart(5, "0")}`,
      region,
      signup_date: signupDate,
    });
  }

  // Generate orders
  const customerLifetimeValues = {};
  for (const customer of customersData) {
    const orderCount = Math.max(1, Math.round(Math.abs(randomNormal() * 4 + 6))); // 1-12 orders
    let customerRevenue = 0;

    for (let o = 0; o < orderCount; o++) {
      const orderValue = 40 + Math.abs(randomNormal() * 150 + 120); // $40-400 average
      const orderDate = `2024-${String(Math.floor(random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(random() * 28) + 1).padStart(2, "0")}`;

      ordersData.push({
        order_id: `ORD${String(orderData.length + 1).padStart(7, "0")}`,
        customer_id: customer.customer_id,
        order_date: orderDate,
        order_value: Math.round(orderValue * 100) / 100,
      });

      customerRevenue += orderValue;
    }

    customerLifetimeValues[customer.customer_id] = Math.round(customerRevenue * 100) / 100;
  }

  // Find top customer by LTV
  let topCustomerId = "";
  let topLTV = 0;
  for (const [customerId, ltv] of Object.entries(customerLifetimeValues)) {
    if (ltv > topLTV) {
      topLTV = ltv;
      topCustomerId = customerId;
    }
  }

  const topCustomerRegion = customersData.find((c) => c.customer_id === topCustomerId)?.region;

  // Create CSV files
  const customersCSV = [
    ["customer_id", "region", "signup_date"],
    ...customersData.map((c) => [c.customer_id, c.region, c.signup_date]),
  ]
    .map((row) => row.join(","))
    .join("\n");

  const ordersCSV = [
    ["order_id", "customer_id", "order_date", "order_value"],
    ...ordersData.map((o) => [o.order_id, o.customer_id, o.order_date, o.order_value.toFixed(2)]),
  ]
    .map((row) => row.join(","))
    .join("\n");

  const customersBlob = new Blob([customersCSV], { type: "text/csv" });
  const ordersBlob = new Blob([ordersCSV], { type: "text/csv" });

  const answer = async (response) => {
    if (!response) throw new Error("Enter the customer ID with the highest lifetime value.");
    const input = response.trim();

    if (input !== topCustomerId) {
      throw new Error(
        `Recalculate customer lifetime value. Use SQL: SELECT customer_id, SUM(order_value) as ltv FROM orders GROUP BY customer_id ORDER BY ltv DESC LIMIT 1. The top customer is ${topCustomerId} (${topCustomerRegion} region, LTV: $${topLTV}).`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>MetaCore: SQL Customer Lifetime Value Analysis</h2>
      <p>
        MetaCore needs to identify the single highest-value customer for strategic account management. Write a SQL
        query to calculate lifetime value (sum of all order values per customer) and rank customers.
      </p>

      <h3>Schema Overview</h3>
      <p><strong>customers table:</strong> customer_id, region, signup_date</p>
      <p><strong>orders table:</strong> order_id, customer_id, order_date, order_value</p>

      <h3>Your Task</h3>
      <ol>
        <li>Load both CSVs into your SQL engine (SQLite, DuckDB, or PostgreSQL).</li>
        <li>
          Write a query to calculate total order value (lifetime value) grouped by
          <code>customer_id</code>.
        </li>
        <li>Identify the customer with the maximum lifetime value across all orders.</li>
        <li>Return the customer_id of the top customer.</li>
      </ol>

      <p>
        Download the customer and order data:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(customersBlob, `${id}-customers.csv`)}>
          ${id}-customers.csv
        </button>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(ordersBlob, `${id}-orders.csv`)}>
          ${id}-orders.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        Which customer has the highest lifetime value (sum of all orders)?
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. CUST00042" required />
      <p class="text-muted">
        Use SQL aggregation: <code>SELECT customer_id, SUM(order_value) as ltv FROM orders GROUP BY customer_id ORDER BY ltv DESC LIMIT 1</code>
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Recommended SQL workflow:

-- SQLite
sqlite3 q-sql-customer-lifetime-value.db
CREATE TABLE customers AS SELECT * FROM read_csv_auto('q-sql-customer-lifetime-value-customers.csv');
CREATE TABLE orders AS SELECT * FROM read_csv_auto('q-sql-customer-lifetime-value-orders.csv');

SELECT customer_id, SUM(order_value) as lifetime_value
FROM orders
GROUP BY customer_id
ORDER BY lifetime_value DESC
LIMIT 1;

*/
