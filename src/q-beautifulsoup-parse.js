import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;

const generateProducts = (random, count) => {
  const names = ["Laptop", "Phone", "Tablet", "Camera", "Headphones", "Speaker", "Watch", "Monitor", "Keyboard", "Mouse"];
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push({
      name: pick(names, random) + " " + pick(["Pro", "Max", "Plus", "Ultra", "Lite"], random),
      price: randInt(random, 1000, 50000),
      rating: (randInt(random, 30, 50) / 10).toFixed(1),
      inStock: random() > 0.3,
    });
  }
  return products;
};

const generateHTML = (products) => {
  const rows = products.map((p) => `
    <tr class="product-row">
      <td class="product-name">${p.name}</td>
      <td class="product-price" data-price="${p.price}">₹${p.price}</td>
      <td class="product-rating">${p.rating}</td>
      <td class="stock-status">${p.inStock ? "In Stock" : "Out of Stock"}</td>
    </tr>
  `).join("");

  return `
<!DOCTYPE html>
<html>
<head><title>Products</title></head>
<body>
  <div id="product-list">
    <h1>Product Catalog</h1>
    <table id="products-table">
      <thead>
        <tr><th>Name</th><th>Price</th><th>Rating</th><th>Availability</th></tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  </div>
</body>
</html>`;
};

const taskFactories = [
  (random, products, htmlContent) => {
    const count = products.length;
    return {
      id: "count-products",
      selector: "tr.product-row",
      operation: "count",
      expected: count,
      description: `count total number of products (rows with class "product-row")`,
    };
  },
  (random, products, htmlContent) => {
    const inStock = products.filter((p) => p.inStock).length;
    return {
      id: "count-in-stock",
      selector: "td.stock-status",
      operation: "count_text",
      filterText: "In Stock",
      expected: inStock,
      description: `count products that are "In Stock"`,
    };
  },
  (random, products, htmlContent) => {
    const total = products.reduce((sum, p) => sum + p.price, 0);
    return {
      id: "sum-prices",
      selector: "td.product-price",
      attribute: "data-price",
      operation: "sum_attr",
      expected: total,
      description: `sum all product prices (from data-price attribute)`,
    };
  },
  (random, products, htmlContent) => {
    const maxPrice = Math.max(...products.map((p) => p.price));
    return {
      id: "max-price",
      selector: "td.product-price",
      attribute: "data-price",
      operation: "max_attr",
      expected: maxPrice,
      description: `find the highest product price (from data-price attribute)`,
    };
  },
  (random, products, htmlContent) => {
    const avgRating = Math.round((products.reduce((sum, p) => sum + parseFloat(p.rating), 0) / products.length) * 100) / 100;
    return {
      id: "avg-rating",
      selector: "td.product-rating",
      operation: "avg_text",
      expected: avgRating,
      description: `calculate average product rating`,
    };
  },
  (random, products, htmlContent) => {
    const outOfStock = products.filter((p) => !p.inStock).length;
    return {
      id: "count-out-stock",
      selector: "td.stock-status",
      operation: "count_text",
      filterText: "Out of Stock",
      expected: outOfStock,
      description: `count products that are "Out of Stock"`,
    };
  },
];

export default async function ({ user, weight = 1 }) {
  const id = "q-beautifulsoup-parse";
  const title = "BeautifulSoup HTML Parsing";
  const random = seedrandom(`${user.email}#${id}`);

  const productCount = randInt(random, 8, 15);
  const products = generateProducts(random, productCount);
  const htmlContent = generateHTML(products);
  const task = pick(taskFactories, random)(random, products, htmlContent);

  const question = html`
    <div class="mb-3">
      <h4>BeautifulSoup HTML Parsing</h4>
      <p>
        <strong>Scenario:</strong> You have an HTML page with product data and need to extract information using BeautifulSoup.
        Build a FastAPI endpoint that parses HTML and returns the requested data.
      </p>
      <ol>
        <li>Implement a FastAPI app with a <code>POST /parse</code> route.</li>
        <li>Accept JSON: <code>{ "html": "...", "task": "..." }</code></li>
        <li>Use BeautifulSoup to parse the HTML and extract the requested information.</li>
        <li>Respond with: <code>{ "result": value, "email": "${user.email}" }</code></li>
        <li>Enable CORS for cross-origin requests.</li>
      </ol>
      <p>For grading, we will send this HTML (showing first few products):</p>
      <pre class="bg-light p-2" style="font-size: 0.75em; max-height: 150px; overflow: auto;">${htmlContent.substring(0, 800)}...</pre>
      <p>
        Task: <strong>${task.description}</strong><br />
        Task ID: <code>${task.id}</code>
      </p>
      <label for="${id}" class="form-label">Enter the base URL of your API</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");

    const endpoint = url.replace(/\/$/, "") + "/parse";
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html: htmlContent, task: task.id }),
    });

    if (!resp.ok) throw new Error(`Endpoint returned ${resp.status}`);

    let respData;
    try {
      respData = await resp.json();
    } catch {
      throw new Error("Invalid JSON response");
    }

    if (respData.email !== user.email) throw new Error("Email must match");

    const result = Number(respData.result);
    const expected = Number(task.expected);
    if (Math.abs(result - expected) > 0.1) {
      throw new Error(`Expected ${expected}, got ${result}`);
    }

    return true;
  };

  return { id, title, weight, question, answer };
}

/*
Python solution sketch: main.py

# /// script
# requires-python = ">=3.12"
# dependencies = ["fastapi", "uvicorn", "beautifulsoup4"]
# ///

from bs4 import BeautifulSoup
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class ParseInput(BaseModel):
    html: str
    task: str

@app.post("/parse")
async def parse_html(data: ParseInput):
    soup = BeautifulSoup(data.html, "html.parser")
    result = 0
    
    if data.task == "count-products":
        result = len(soup.select("tr.product-row"))
    
    elif data.task == "count-in-stock":
        cells = soup.select("td.stock-status")
        result = sum(1 for c in cells if "In Stock" in c.text)
    
    elif data.task == "count-out-stock":
        cells = soup.select("td.stock-status")
        result = sum(1 for c in cells if "Out of Stock" in c.text)
    
    elif data.task == "sum-prices":
        cells = soup.select("td.product-price")
        result = sum(int(c["data-price"]) for c in cells)
    
    elif data.task == "max-price":
        cells = soup.select("td.product-price")
        result = max(int(c["data-price"]) for c in cells)
    
    elif data.task == "avg-rating":
        cells = soup.select("td.product-rating")
        ratings = [float(c.text) for c in cells]
        result = round(sum(ratings) / len(ratings), 2)
    
    return {"result": result, "email": "YOUR_EMAIL@ds.study.iitm.ac.in"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
*/