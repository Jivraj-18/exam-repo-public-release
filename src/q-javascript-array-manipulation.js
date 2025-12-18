/**
 * Question 3: JavaScript Array Manipulation with Node.js
 * Topic: JavaScript/Node.js Data Processing
 * Marks: 0.6
 * GA: GA1 (Development Tools)
 */

import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 0.6 }) {
  const id = "q-javascript-array-manipulation";
  const title = "JavaScript Array Manipulation with Node.js";

  const question = html`
    <div class="mb-3">
      <p>
        <strong>Case Study:</strong> DataMart's inventory system exports product data as JSON arrays. 
        Process this data to find products for a flash sale promotion.
      </p>
      <p>
        Given the product data below, use Node.js to:
      </p>
      <ol>
        <li>Filter products where <code>stock > 50</code> AND <code>price < 150</code></li>
        <li>Sort by <code>category</code> (A→Z), then by <code>price</code> (lowest→highest)</li>
        <li>Extract only the <code>name</code> field from the top 10 products</li>
        <li>Join all names with a comma (no spaces) and compute the SHA256 hash using Node's built-in <code>crypto</code> module (no external libraries)</li>
      </ol>
      <p>
        <strong>Product Data:</strong>
      </p>
      <pre><code>[{"name": "Widget Pro", "category": "Electronics", "price": 99.99, "stock": 75},
 {"name": "Home Kit", "category": "Home", "price": 45.50, "stock": 120},
 {"name": "Gadget Max", "category": "Electronics", "price": 149.99, "stock": 60},
 {"name": "Smart Tool", "category": "Tools", "price": 89.00, "stock": 40},
 {"name": "Eco Device", "category": "Home", "price": 134.50, "stock": 85},
 {"name": "Mini Widget", "category": "Electronics", "price": 55.25, "stock": 150},
 {"name": "Pro Set", "category": "Tools", "price": 120.00, "stock": 95},
 {"name": "Ultra Kit", "category": "Home", "price": 78.90, "stock": 110},
 {"name": "Deluxe Tool", "category": "Electronics", "price": 142.00, "stock": 70},
 {"name": "Smart Gadget", "category": "Tools", "price": 105.50, "stock": 55},
 {"name": "Basic Set", "category": "Home", "price": 32.00, "stock": 200},
 {"name": "Advanced Kit", "category": "Electronics", "price": 160.00, "stock": 80},
 {"name": "Clearance Bundle", "category": "Z-Misc", "price": 49.99, "stock": 75}]</code></pre>
      <label for="${id}" class="form-label">SHA256 hash of comma-separated names:</label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        type="text"
        placeholder="a1b2c3d4e5f6... (64 character hash)"
        pattern="[a-f0-9]{64}"
        required
      />
    </div>
  `;

  const answer = "e75890749d4e2eecdae5873582668e7c8ca6db213c6990d4d8ee569a831f2d53";

  return { id, title, weight, question, answer };
}
