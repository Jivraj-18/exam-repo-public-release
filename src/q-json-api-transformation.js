import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { en, Faker } from "https://cdn.jsdelivr.net/npm/@faker-js/faker@9/+esm";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-json-api-transformation";
  const title = "JSON API Transformation: E-Commerce Order Restructuring";

  const random = seedrandom(`${user.email}#${id}`);
  const faker = new Faker({ locale: [en], seed: Math.round(random() * 1000000) });

  // Generate complex nested order data (legacy API format)
  const orderCount = 8 + Math.floor(random() * 5); // 8-12 orders
  
  const productCategories = ["Electronics", "Clothing", "Books", "Home & Garden", "Sports", "Toys"];
  const paymentMethods = ["credit_card", "debit_card", "paypal", "bank_transfer"];
  const shippingMethods = ["standard", "express", "overnight", "pickup"];
  const orderStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

  const orders = [];
  let totalRevenue = 0;
  let targetCustomerOrders = [];
  let targetCustomerId = null;

  for (let i = 0; i < orderCount; i++) {
    const customerId = `CUS${String(Math.floor(random() * 500) + 1000).padStart(4, "0")}`;
    const orderId = `ORD${String(Date.now() + i).slice(-8)}${String(Math.floor(random() * 1000)).padStart(3, "0")}`;
    const orderDate = new Date(2024, Math.floor(random() * 12), Math.floor(random() * 28) + 1);
    
    // Generate 1-4 items per order
    const itemCount = Math.floor(random() * 4) + 1;
    const items = [];
    let orderTotal = 0;

    for (let j = 0; j < itemCount; j++) {
      const category = productCategories[Math.floor(random() * productCategories.length)];
      const productName = `${faker.commerce.productAdjective()} ${faker.commerce.product()}`;
      const quantity = Math.floor(random() * 3) + 1;
      const unitPrice = parseFloat((random() * 200 + 10).toFixed(2));
      const itemTotal = parseFloat((quantity * unitPrice).toFixed(2));
      
      orderTotal += itemTotal;

      items.push({
        product_id: `PRD${String(Math.floor(random() * 10000)).padStart(5, "0")}`,
        product_name: productName,
        category: category,
        quantity: quantity,
        unit_price: unitPrice,
        subtotal: itemTotal,
        discount_applied: random() > 0.7 ? parseFloat((itemTotal * 0.1).toFixed(2)) : 0
      });
    }

    const shipping = parseFloat((random() * 20 + 5).toFixed(2));
    const tax = parseFloat((orderTotal * 0.08).toFixed(2));
    const totalDiscount = items.reduce((sum, item) => sum + item.discount_applied, 0);
    const finalTotal = parseFloat((orderTotal + shipping + tax - totalDiscount).toFixed(2));

    totalRevenue += finalTotal;

    const order = {
      order_id: orderId,
      customer: {
        customer_id: customerId,
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number(),
        membership_tier: random() > 0.7 ? "premium" : "standard"
      },
      order_details: {
        order_date: orderDate.toISOString().split('T')[0],
        status: orderStatuses[Math.floor(random() * orderStatuses.length)],
        items: items,
        pricing: {
          subtotal: orderTotal,
          tax: tax,
          shipping: shipping,
          discount: totalDiscount,
          total: finalTotal
        }
      },
      payment: {
        method: paymentMethods[Math.floor(random() * paymentMethods.length)],
        transaction_id: `TXN${String(Date.now() + i).slice(-10)}`,
        payment_date: orderDate.toISOString()
      },
      shipping: {
        method: shippingMethods[Math.floor(random() * shippingMethods.length)],
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zip: faker.location.zipCode(),
          country: "USA"
        },
        estimated_delivery: new Date(orderDate.getTime() + (Math.floor(random() * 7) + 3) * 86400000).toISOString().split('T')[0]
      }
    };

    orders.push(order);

    // Select a random customer who has multiple orders for the question
    if (i === Math.floor(orderCount / 2)) {
      targetCustomerId = customerId;
      targetCustomerOrders = [order];
    } else if (customerId === targetCustomerId) {
      targetCustomerOrders.push(order);
    }
  }

  // If target customer doesn't have multiple orders, make one more order for them
  if (targetCustomerOrders.length === 1) {
    const additionalOrder = JSON.parse(JSON.stringify(targetCustomerOrders[0]));
    additionalOrder.order_id = `ORD${String(Date.now() + 999).slice(-8)}${String(Math.floor(random() * 1000)).padStart(3, "0")}`;
    additionalOrder.order_details.order_date = new Date(2024, Math.floor(random() * 12), Math.floor(random() * 28) + 1).toISOString().split('T')[0];
    additionalOrder.order_details.pricing.total = parseFloat((random() * 300 + 50).toFixed(2));
    orders.push(additionalOrder);
    targetCustomerOrders.push(additionalOrder);
  }

  // Calculate expected answer: total spent by target customer
  const expectedTotal = targetCustomerOrders.reduce((sum, order) => sum + order.order_details.pricing.total, 0);

  // Create JSON blob for download
  const jsonContent = JSON.stringify(orders, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });

  const answer = async (response) => {
    if (!response) throw new Error("Please enter the total amount spent by the customer.");
    
    // Clean input and parse as number
    const cleaned = response.replace(/[$,\s]/g, '');
    const value = parseFloat(cleaned);
    
    if (isNaN(value)) {
      throw new Error("Please enter a valid number (e.g., 1234.56 or $1,234.56)");
    }

    // Allow small rounding differences
    if (Math.abs(value - expectedTotal) < 0.01) {
      return true;
    }

    // Provide helpful feedback
    if (Math.abs(value - expectedTotal) < 5) {
      throw new Error(
        `Very close! Check your calculation. You might have rounding errors or included/excluded the wrong fields. ` +
        `Make sure you're summing the 'total' field from order_details.pricing for customer ${targetCustomerId}.`
      );
    } else if (Math.abs(value - expectedTotal) < 50) {
      throw new Error(
        `Your answer is close but not quite right. Double-check: ` +
        `(1) You're filtering by customer_id = "${targetCustomerId}", ` +
        `(2) You're summing order_details.pricing.total (not subtotal), ` +
        `(3) You're including all orders from this customer.`
      );
    } else {
      throw new Error(
        `Incorrect. Filter the orders for customer_id = "${targetCustomerId}", ` +
        `then sum the order_details.pricing.total field across all their orders. ` +
        `Make sure you're navigating the nested JSON structure correctly.`
      );
    }
  };

  const question = html`
    <div class="mb-3">
      <h2>ShopSmart API Migration: Legacy to Modern Format</h2>
      
      <div class="alert alert-info">
        <strong><i class="bi bi-briefcase"></i> Business Context:</strong><br>
        <strong>ShopSmart</strong>, a growing e-commerce platform, is migrating from their legacy order management system 
        to a modern analytics platform. The old API returns deeply nested JSON with customer, order, payment, and shipping 
        data all intertwined. Your task is to extract specific business insights from this complex data structure.
      </div>

      <h3>Scenario</h3>
      <p>
        The finance team needs to calculate <strong>total lifetime value</strong> for specific customers. You've been 
        given a JSON file containing ${orderCount} orders from the past year. Each order has:
      </p>

      <ul>
        <li><strong>Nested customer information</strong> (ID, name, email, membership tier)</li>
        <li><strong>Order details</strong> with multiple items per order</li>
        <li><strong>Complex pricing</strong> (subtotal, tax, shipping, discounts, final total)</li>
        <li><strong>Payment and shipping</strong> information</li>
      </ul>

      <h3>Your Task</h3>
      <ol>
        <li>Download the JSON file containing all orders</li>
        <li>Find all orders for customer with ID: <code class="text-danger">${targetCustomerId}</code></li>
        <li>Extract the <code>total</code> field from <code>order_details.pricing.total</code> for each order</li>
        <li>Sum up the totals to calculate this customer's lifetime spending</li>
        <li>Enter the result (rounded to 2 decimal places)</li>
      </ol>

      <h3>JSON Structure Example</h3>
      <pre><code class="language-json">[
  {
    "order_id": "ORD123456789",
    "customer": {
      "customer_id": "CUS1234",
      "name": "John Doe",
      "email": "john@example.com",
      ...
    },
    "order_details": {
      "order_date": "2024-05-15",
      "status": "delivered",
      "items": [...],
      "pricing": {
        "subtotal": 299.99,
        "tax": 24.00,
        "shipping": 9.99,
        "discount": 30.00,
        "total": 303.98  ← Sum this field
      }
    },
    "payment": {...},
    "shipping": {...}
  },
  ...
]</code></pre>

      <h3>Download Order Data</h3>
      <button class="btn btn-primary mb-3" type="button" @click=${() => download(blob, `${id}_orders.json`)}>
        <i class="bi bi-download"></i> Download Orders JSON (${orderCount} orders)
      </button>

      <div class="alert alert-warning">
        <strong><i class="bi bi-lightbulb"></i> Recommended Approaches:</strong>
        <ul class="mb-0">
          <li><strong>Python:</strong> Use <code>json.load()</code> + list comprehension
            <pre class="mb-0"><code class="language-python">import json
with open('orders.json') as f:
    orders = json.load(f)
    
customer_orders = [o for o in orders if o['customer']['customer_id'] == '${targetCustomerId}']
total = sum(o['order_details']['pricing']['total'] for o in customer_orders)
print(total)</code></pre>
          </li>
          <li><strong>JavaScript/Node:</strong> Use <code>filter()</code> + <code>reduce()</code>
            <pre class="mb-0"><code class="language-javascript">const orders = require('./orders.json');
const total = orders
  .filter(o => o.customer.customer_id === '${targetCustomerId}')
  .reduce((sum, o) => sum + o.order_details.pricing.total, 0);
console.log(total);</code></pre>
          </li>
          <li><strong>jq (command line):</strong>
            <pre class="mb-0"><code class="language-bash">jq '[.[] | select(.customer.customer_id == "${targetCustomerId}") | .order_details.pricing.total] | add' orders.json</code></pre>
          </li>
          <li><strong>Excel/Google Sheets:</strong> Use Power Query to flatten JSON, then SUMIF</li>
        </ul>
      </div>

      <h3>Learning Resources</h3>
      <div class="row mb-3">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">🎥 Working with Nested JSON in Python</h6>
              <p class="card-text small">Learn to navigate complex JSON structures</p>
              <a href="https://www.youtube.com/watch?v=pTT7HMqDnJw" target="_blank" class="btn btn-sm btn-danger">
                <i class="bi bi-youtube"></i> Watch Tutorial
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">🎥 JSON Data Manipulation with jq</h6>
              <p class="card-text small">Master command-line JSON processing</p>
              <a href="https://www.youtube.com/watch?v=FSn_38gDvzM" target="_blank" class="btn btn-sm btn-danger">
                <i class="bi bi-youtube"></i> Watch Tutorial
              </a>
            </div>
          </div>
        </div>
      </div>

      <h3>Submit Answer</h3>
      <label for="${id}" class="form-label">
        <strong>Total amount spent by customer ${targetCustomerId}:</strong>
      </label>
      <div class="input-group mb-2">
        <span class="input-group-text">$</span>
        <input
          class="form-control"
          id="${id}"
          name="${id}"
          type="text"
          placeholder="e.g., 1234.56"
          required
        />
      </div>
      <div class="form-text">
        Enter the sum of order_details.pricing.total for all orders from customer ${targetCustomerId}.
        You can include or omit the dollar sign and commas (e.g., "1234.56" or "$1,234.56").
      </div>
    </div>
  `;

  return { id, title, weight, question, answer };
}
