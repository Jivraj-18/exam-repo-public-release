import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function ({ user, weight = 1.25 }) {
  const id = "q-pandas-aggregation";
  const title = "Pandas: Merge Datasets and Analyze";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  // Generate customer data
  const customerTypes = ["Premium", "Standard", "Basic"];
  const regions = ["North", "South", "East", "West"];

  const numCustomers = 30 + Math.floor(random() * 20); // 30-49 customers
  const customers = [];

  for (let i = 1; i <= numCustomers; i++) {
    customers.push({
      customer_id: `C${String(i).padStart(3, "0")}`,
      customer_type: pick(customerTypes),
      region: pick(regions)
    });
  }

  // Generate orders data
  const numOrders = 100 + Math.floor(random() * 50); // 100-149 orders
  const orders = [];

  for (let i = 1; i <= numOrders; i++) {
    const customer = pick(customers);
    orders.push({
      order_id: `O${String(i).padStart(4, "0")}`,
      customer_id: customer.customer_id,
      amount: Math.round((100 + random() * 900) * 100) / 100 // $100-$1000
    });
  }

  // Create CSV content for customers
  const customersCSV = [["customer_id", "customer_type", "region"]];
  customers.forEach(c => {
    customersCSV.push([c.customer_id, c.customer_type, c.region]);
  });
  const customersCsvContent = customersCSV.map(row => row.join(",")).join("\n");
  const customersBlob = new Blob([customersCsvContent], { type: "text/csv" });

  // Create CSV content for orders
  const ordersCSV = [["order_id", "customer_id", "amount"]];
  orders.forEach(o => {
    ordersCSV.push([o.order_id, o.customer_id, o.amount.toFixed(2)]);
  });
  const ordersCsvContent = ordersCSV.map(row => row.join(",")).join("\n");
  const ordersBlob = new Blob([ordersCsvContent], { type: "text/csv" });

  // Calculate expected answer: total revenue by customer_type
  // First merge orders with customers
  const customerMap = {};
  customers.forEach(c => {
    customerMap[c.customer_id] = c;
  });

  const revenueByType = {};
  orders.forEach(o => {
    const customer = customerMap[o.customer_id];
    if (customer) {
      const type = customer.customer_type;
      revenueByType[type] = (revenueByType[type] || 0) + o.amount;
    }
  });

  // Find customer type with highest revenue
  let maxType = null;
  let maxRevenue = 0;
  for (const [type, revenue] of Object.entries(revenueByType)) {
    if (revenue > maxRevenue) {
      maxRevenue = revenue;
      maxType = type;
    }
  }
  maxRevenue = Math.round(maxRevenue * 100) / 100;

  const answer = (input) => {
    if (!input) throw new Error("Please provide an answer.");

    const normalized = input.trim().toLowerCase();
    const typeMatch = customerTypes.find(t => normalized.includes(t.toLowerCase()));
    const numberMatch = input.match(/[\d,]+\.?\d*/);

    if (!typeMatch) {
      throw new Error(`Customer type not found. Expected one of: ${customerTypes.join(", ")}`);
    }
    if (!numberMatch) {
      throw new Error("Revenue amount not found. Include the total revenue value.");
    }

    const submittedRevenue = parseFloat(numberMatch[0].replace(/,/g, ''));

    if (typeMatch.toLowerCase() !== maxType.toLowerCase()) {
      throw new Error(`Incorrect customer type. Merge the datasets first, then group by customer_type.`);
    }

    // Allow 1% tolerance for floating point
    const tolerance = maxRevenue * 0.01;
    if (Math.abs(submittedRevenue - maxRevenue) > tolerance) {
      throw new Error(`Revenue is incorrect. Expected approximately ${maxRevenue.toFixed(2)}`);
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>ShopAnalytics: Customer Revenue Analysis</h2>
      <p>
        <strong>ShopAnalytics</strong> has two datasets that need to be combined for analysis.
        The <code>customers.csv</code> contains customer information, and <code>orders.csv</code>
        contains order transactions. Your task is to merge these datasets and perform analysis.
      </p>

      <h3>Dataset 1: Customers</h3>
      <ul>
        <li><code>customer_id</code>: Unique customer identifier (e.g., C001)</li>
        <li><code>customer_type</code>: Premium, Standard, or Basic</li>
        <li><code>region</code>: Geographic region</li>
      </ul>

      <h3>Dataset 2: Orders</h3>
      <ul>
        <li><code>order_id</code>: Unique order identifier</li>
        <li><code>customer_id</code>: Links to customers table</li>
        <li><code>amount</code>: Order value in USD</li>
      </ul>

      <h3>Task</h3>
      <ol>
        <li>Load both CSV files into Pandas DataFrames.</li>
        <li><strong>Merge</strong> the orders with customers using <code>customer_id</code> as the key.</li>
        <li>Group by <code>customer_type</code> and calculate <strong>total revenue</strong> (sum of amount).</li>
        <li>Find which customer type generated the <strong>highest total revenue</strong>.</li>
      </ol>

      <h3>Hint</h3>
      <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px;"><code class="language-python">merged = pd.merge(orders, customers, on='customer_id')
result = merged.groupby('customer_type')['amount'].sum()</code></pre>

      <p>
        Download the datasets:
        <button class="btn btn-sm btn-outline-primary me-2" type="button" @click=${() => download(customersBlob, `${id}-customers.csv`)}>
          customers.csv
        </button>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(ordersBlob, `${id}-orders.csv`)}>
          orders.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        Which customer type has the highest total revenue? (Format: Type: Amount, e.g., "Premium: 12345.67")
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., Premium: 12345.67" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution

# /// script
# requires-python = ">=3.12"
# dependencies = ["pandas"]
# ///
import pandas as pd

# Load both datasets
customers = pd.read_csv("q-pandas-aggregation-customers.csv")
orders = pd.read_csv("q-pandas-aggregation-orders.csv")

# Merge orders with customers on customer_id
merged = pd.merge(orders, customers, on='customer_id')

# Group by customer_type and sum the revenue
revenue_by_type = merged.groupby('customer_type')['amount'].sum()

# Find the customer type with highest revenue
max_type = revenue_by_type.idxmax()
max_revenue = revenue_by_type.max()

print(f"{max_type}: {max_revenue:.2f}")

*/
