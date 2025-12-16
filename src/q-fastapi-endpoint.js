import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1.5 }) {
  const id = "q-fastapi-endpoint";
  const title = "FastAPI: Product Inventory API";

  const random = seedrandom(`${user.email}#${id}`);

  const products = [
    "Laptop", "Smartphone", "Tablet", "Headphones", "Monitor",
    "Keyboard", "Mouse", "Webcam", "Microphone", "Speaker",
  ];

  const categories = ["Electronics", "Accessories", "Computing", "Audio"];
  
  const randomInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  // Generate product catalog
  const catalog = [];
  for (let i = 1; i <= 8; i++) {
    catalog.push({
      id: i,
      name: pick(products),
      category: pick(categories),
      price: randomInt(50, 1500),
      stock: randomInt(0, 100),
    });
  }

  // Pick a specific product to query
  const queryProduct = catalog[randomInt(0, catalog.length - 1)];
  const expectedResponse = {
    id: queryProduct.id,
    name: queryProduct.name,
    category: queryProduct.category,
    price: queryProduct.price,
    stock: queryProduct.stock,
  };

  const answer = async (response) => {
    const url = response.trim();
    
    // Validate URL format
    if (!url.match(/^https?:\/\/.+/)) {
      throw new Error("Please provide a valid HTTP URL (e.g., https://yourapp.com/products/1)");
    }

    // Extract endpoint path
    let apiUrl;
    try {
      apiUrl = new URL(url);
    } catch {
      throw new Error("Invalid URL format");
    }

    // Check if it's the products endpoint
    if (!apiUrl.pathname.includes("/products/")) {
      throw new Error("URL should point to /products/{id} endpoint");
    }

    // Try to fetch the product
    let productData;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}. Ensure your FastAPI server is running and accessible.`);
      }
      productData = await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch from API: ${error.message}`);
    }

    // Validate response structure
    if (!productData.id || !productData.name || productData.price === undefined) {
      throw new Error("Response should include id, name, category, price, and stock fields");
    }

    // Check if it includes the expected data (at least one product from catalog)
    const matchesAnyProduct = catalog.some(p => 
      productData.id === p.id &&
      productData.name === p.name &&
      productData.price === p.price
    );

    if (!matchesAnyProduct) {
      throw new Error("The product data doesn't match the expected catalog. Ensure you're using the provided product data.");
    }

    // Check for email in response or accessible via root endpoint
    const rootUrl = `${apiUrl.protocol}//${apiUrl.host}/`;
    try {
      const rootResponse = await fetch(rootUrl);
      if (rootResponse.ok) {
        const rootText = await rootResponse.text();
        if (!rootText.includes(user.email)) {
          throw new Error(`Root endpoint (/) should return a message including your email: ${user.email}`);
        }
      }
    } catch {
      // Root endpoint check optional
    }

    return true;
  };

  const catalogTable = catalog.map(p => 
    `  ${p.id.toString().padEnd(4)} ${p.name.padEnd(15)} ${p.category.padEnd(12)} $${p.price.toString().padStart(6)}  ${p.stock.toString().padStart(3)}`
  ).join("\n");

  const question = html`
    <div class="mb-3">
      <h2>InventoryAPI: Product Catalog with FastAPI</h2>
      <p>
        InventoryAPI is a backend service provider that helps e-commerce companies build fast, modern APIs for their
        product catalogs. They use <strong>FastAPI</strong> to create high-performance REST APIs with automatic
        documentation, data validation, and type hints.
      </p>

      <h3>Product Catalog</h3>
      <pre><code>ID   Name            Category     Price   Stock
${catalogTable}</code></pre>

      <h3>Task</h3>
      <p>Create a FastAPI application with the following endpoints:</p>
      <ol>
        <li>
          <code>GET /</code> - Returns a welcome message including your email: <code>${user.email}</code>
        </li>
        <li>
          <code>GET /products</code> - Returns the list of all products (use the catalog above)
        </li>
        <li>
          <code>GET /products/{product_id}</code> - Returns a specific product by ID
        </li>
        <li>Return 404 if product not found</li>
      </ol>

      <h3>Requirements</h3>
      <ul>
        <li>Use FastAPI framework</li>
        <li>Products should have: <code>id</code>, <code>name</code>, <code>category</code>, <code>price</code>, <code>stock</code></li>
        <li>Deploy to a public URL (use ngrok, Cloudflare Tunnel, or a hosting service)</li>
        <li>Or use GitHub Codespaces / Replit with port forwarding</li>
        <li>Ensure the API is accessible via HTTPS (for validation)</li>
      </ul>

      <h3>Helpful Hints</h3>
      <ul>
        <li>Use <code>FastAPI()</code> to create an app instance</li>
        <li>Define endpoints with <code>@app.get()</code> decorators</li>
        <li>Use path parameters like <code>/products/{product_id}</code></li>
        <li>Return dictionaries or lists - FastAPI auto-converts to JSON</li>
        <li>Raise <code>HTTPException(status_code=404)</code> for not found errors</li>
        <li>Run with: <code>uv run --with fastapi,uvicorn python server.py</code></li>
      </ul>

      <h3>Deployment Options</h3>
      <ul>
        <li><strong>ngrok</strong>: <code>ngrok http 8000</code> (creates public HTTPS URL)</li>
        <li><strong>Cloudflare Tunnel</strong>: <code>cloudflared tunnel --url localhost:8000</code></li>
        <li><strong>GitHub Codespaces</strong>: Port forwarding automatically provides public URL</li>
        <li><strong>Replit</strong>: Automatic public URL when you run the app</li>
      </ul>

      <label for="${id}" class="form-label">
        Enter your API endpoint URL for product ${queryProduct.id} (e.g., https://yourapp.com/products/${queryProduct.id}):
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        placeholder="https://yourapp.com/products/${queryProduct.id}"
        required
      />
      <p class="text-muted">
        The URL should return product data with id, name, category, price, and stock fields. Make sure your API is
        running and publicly accessible.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
