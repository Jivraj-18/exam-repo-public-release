import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-sorter";
  const title = "JSON Data Processing: Sort Products Endpoint";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  // Randomly select which field to sort by
  const sortFields = ["price", "rating", "stock"];
  const sortBy = pick(sortFields);

  // Generate test products
  const productNames = [
    "Wireless Mouse",
    "Mechanical Keyboard",
    "USB Hub",
    "Monitor Stand",
    "Webcam HD",
    "Desk Lamp",
    "Headphones",
    "Laptop Stand",
    "Cable Organizer",
    "Phone Charger",
  ];

  const testProducts = productNames.map((name) => ({
    name,
    price: Math.round((10 + random() * 190) * 100) / 100,
    rating: Math.round((1 + random() * 4) * 10) / 10,
    stock: Math.floor(random() * 500),
  }));

  // Expected sorted result (descending order by the selected field)
  const expectedSorted = [...testProducts].sort((a, b) => b[sortBy] - a[sortBy]);

  const answer = async (url) => {
    url = url.trim();
    if (!url) throw new Error("Please provide the URL of your /sort-products endpoint");

    // Ensure URL ends with /sort-products
    const endpoint = url.endsWith("/sort-products") ? url : `${url.replace(/\/$/, "")}/sort-products`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: testProducts, sort_by: sortBy }),
    });

    if (!response.ok) {
      throw new Error(`Endpoint returned ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    // Validate the response is an array
    if (!Array.isArray(result.sorted) && !Array.isArray(result)) {
      throw new Error("Response must contain an array of sorted products (either as 'sorted' key or direct array)");
    }

    const sortedProducts = result.sorted || result;

    if (sortedProducts.length !== expectedSorted.length) {
      throw new Error(`Expected ${expectedSorted.length} products, got ${sortedProducts.length}`);
    }

    // Verify sorting is correct (descending by the selected field)
    for (let i = 0; i < sortedProducts.length - 1; i++) {
      if (sortedProducts[i][sortBy] < sortedProducts[i + 1][sortBy]) {
        throw new Error(`Products are not sorted correctly by ${sortBy} in descending order`);
      }
    }

    // Verify all original products are present
    const originalNames = new Set(testProducts.map((p) => p.name));
    const resultNames = new Set(sortedProducts.map((p) => p.name));
    if (originalNames.size !== resultNames.size) {
      throw new Error("Some products are missing or duplicated in the response");
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Product Catalog Sorting API</h2>
      <p>
        <strong>ShopSmart Analytics</strong> needs an API endpoint to dynamically sort their product catalog. Your task
        is to create a POST endpoint that accepts a list of products and returns them sorted.
      </p>

      <h3>Requirements</h3>
      <ol>
        <li>
          Create a <strong>POST</strong> endpoint at <code>/sort-products</code>
        </li>
        <li>
          The endpoint receives JSON with:
          <ul>
            <li><code>products</code>: Array of product objects with <code>name</code>, <code>price</code>, <code>rating</code>, and <code>stock</code></li>
            <li><code>sort_by</code>: The field to sort by (will be <code>"${sortBy}"</code> for this test)</li>
          </ul>
        </li>
        <li>Return the products sorted by <code>${sortBy}</code> in <strong>descending order</strong></li>
        <li>Response format: <code>{"sorted": [...]}</code> or just the array directly</li>
      </ol>

      <h3>Test Data</h3>
      <p>Your endpoint will receive this product list:</p>
      <pre style="white-space: pre-wrap; max-height: 200px; overflow-y: auto;"><code class="language-json">${JSON.stringify(testProducts, null, 2)}</code></pre>

      <h3>Expected Behavior</h3>
      <p>Sort by: <strong><code>${sortBy}</code></strong> (descending - highest first)</p>

      <label for="${id}" class="form-label">Enter your API base URL (e.g., https://your-server.com):</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="https://your-api-url.com" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
