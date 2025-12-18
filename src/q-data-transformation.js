import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1.25 }) {
  const id = "q-json-transformation";
  const title = "JSON Data Transformation: Multi-Level Nested Analysis";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate COMPLEX nested JSON with 50+ customers
  const cities = ["Seattle", "Portland", "Boston", "Austin", "Denver", "Chicago", "Miami", "Phoenix", "Atlanta", "Dallas"];
  const statuses = ["shipped", "pending", "cancelled", "processing", "delivered"];
  const productTypes = ["Electronics", "Clothing", "Books", "Furniture", "Sports"];
  
  const targetCity = cities[Math.floor(random() * cities.length)];
  const targetStatus = "shipped";
  const targetProductType = productTypes[Math.floor(random() * productTypes.length)];
  const targetMinAmount = 100;

  const customers = [];
  let complexTotal = 0;

  // Generate 50 customers with 5-10 orders each = 250-500 orders total
  for (let i = 1; i <= 50; i++) {
    const city = cities[Math.floor(random() * cities.length)];
    const membershipLevel = random() > 0.5 ? "premium" : "standard";
    
    const orders = [];
    const numOrders = 5 + Math.floor(random() * 6); // 5-10 orders per customer
    
    for (let j = 1; j <= numOrders; j++) {
      const status = statuses[Math.floor(random() * statuses.length)];
      const orderDate = `2024-${String(Math.floor(random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(random() * 28) + 1).padStart(2, '0')}`;
      
      // Each order has 1-3 items
      const items = [];
      const numItems = 1 + Math.floor(random() * 3);
      
      for (let k = 1; k <= numItems; k++) {
        const productType = productTypes[Math.floor(random() * productTypes.length)];
        const price = Math.round((20 + random() * 280) * 100) / 100;
        const quantity = 1 + Math.floor(random() * 3);
        const itemTotal = price * quantity;
        
        items.push({
          item_id: `ITEM${i}${j}${k}`,
          product_type: productType,
          price: price,
          quantity: quantity,
          item_total: Math.round(itemTotal * 100) / 100
        });
      }
      
      const orderTotal = items.reduce((sum, item) => sum + item.item_total, 0);
      
      orders.push({
        order_id: `ORD${i}${j}`,
        order_date: orderDate,
        status: status,
        items: items,
        order_total: Math.round(orderTotal * 100) / 100
      });
      
      // Complex filter: city + status + has items of type + order total >= min
      if (city === targetCity && status === targetStatus && orderTotal >= targetMinAmount) {
        const hasTargetProduct = items.some(item => item.product_type === targetProductType);
        if (hasTargetProduct) {
          complexTotal += orderTotal;
        }
      }
    }
    
    customers.push({
      customer_id: `C${String(i).padStart(3, '0')}`,
      name: `Customer ${i}`,
      city: city,
      membership_level: membershipLevel,
      orders: orders
    });
  }

  const jsonContent = JSON.stringify({ customers: customers }, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });

  const answer = async (response) => {
    if (!response) throw new Error("Enter the total amount");
    
    const value = parseFloat(response.replace(/[^\d.-]/g, ""));
    if (Number.isNaN(value)) throw new Error("Unable to parse the amount");

    const tolerance = 5;
    if (Math.abs(value - complexTotal) > tolerance) {
      throw new Error(
        `Incorrect. Find customers in ${targetCity}, filter orders with status='${targetStatus}' AND order_total>=${targetMinAmount} AND contains items of type '${targetProductType}', then sum order_total.`
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>DataFlow: Complex Multi-Level JSON Analysis</h2>
      <p>
        <strong>DataFlow Systems</strong> processes deeply nested e-commerce data (50 customers, 250+ orders, 500+ items).
        You must navigate 3 levels of nesting and apply multiple filters simultaneously.
      </p>

      <h3>Business Context</h3>
      <p>
        The analytics team needs to identify high-value orders from specific cities that contain certain product types.
        This requires parsing nested JSON with multiple conditions across different nesting levels.
      </p>

      <h3>Data Structure (3 Levels Deep!)</h3>
      <pre><code>{
  "customers": [
    {
      "customer_id": "C001",
      "city": "Seattle",
      "orders": [
        {
          "order_id": "ORD11",
          "status": "shipped",
          "order_total": 250.00,
          "items": [
            {
              "product_type": "Electronics",
              "item_total": 150.00
            }
          ]
        }
      ]
    }
  ]
}</code></pre>

      <h3>Your Task (COMPLEX FILTERS!)</h3>
      <p>Find the sum of <code>order_total</code> for ALL orders that match ALL these criteria:</p>
      <ol>
        <li>Customer <code>city</code> = <strong>"${targetCity}"</strong></li>
        <li>Order <code>status</code> = <strong>"${targetStatus}"</strong></li>
        <li>Order <code>order_total</code> >= <strong>${targetMinAmount}</strong></li>
        <li>Order contains at least one item where <code>product_type</code> = <strong>"${targetProductType}"</strong></li>
      </ol>

      <p>
        Download the JSON data (50 customers, 250+ orders, 500+ items):
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.json`)}>
          ${id}.json
        </button>
      </p>

      <h3>Recommended Approach</h3>
      <ul>
        <li><strong>jq (hardest but fastest):</strong>
          <pre><code>jq '[.customers[] | select(.city=="${targetCity}") | .orders[] | 
select(.status=="${targetStatus}" and .order_total>=${targetMinAmount} and 
(.items[] | .product_type=="${targetProductType}")) | .order_total] | add'</code></pre>
        </li>
        <li><strong>Python (recommended):</strong> Load JSON, nested loops with filters, check items array</li>
        <li><strong>JavaScript:</strong> <code>JSON.parse()</code> + nested <code>.filter()</code> + <code>.some()</code></li>
      </ul>

      <h3>Watch Out For:</h3>
      <ul>
        <li>Must check ALL 4 conditions (city, status, total, product_type)</li>
        <li>Product type is nested inside items array - use <code>.some()</code> or similar</li>
        <li>Don't count orders twice if they have multiple matching items</li>
        <li>50 customers × 5-10 orders × 1-3 items = lots of data!</li>
      </ul>

      <label for="${id}" class="form-label">
        Total order_total for ${targetCity} + ${targetStatus} + >=$${targetMinAmount} + contains ${targetProductType}?
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        placeholder="e.g., 12345.67" 
        required 
      />
      <p class="text-muted">
        Submit as number with 2 decimals (e.g., 12345.67). All 4 conditions must match!
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}