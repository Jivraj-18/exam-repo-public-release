import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { compareJSON } from "./utils/compare.js";

export default async function({ user, weight = 1 }) {
  const id = "q-scrape-amazon-products";
  const title = "Scrape Amazon products";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate a minimum and maximum price for filtering
  let minPrice = 0, maxPrice = 0;
  while (maxPrice - minPrice < 10) {
    minPrice = Math.floor(random() * 50) + 10; // 10-59 USD
    maxPrice = Math.floor(random() * 50) + 10; // 10-59 USD
    if (minPrice > maxPrice) [maxPrice, minPrice] = [minPrice, maxPrice];
  }

  let searchResults;
  const answer = async (json) => {
    if (!searchResults) {
      const response = await fetch(`/proxy/https://www.amazon.com/s?k=laptops&rh=p_36%3A${minPrice}00-${maxPrice}00`);
      if (response.ok) searchResults = await response.text();
      else {
        throw new Error(
          `Unable to fetch Amazon data. Response: ${response.status} ${response.statusText}`
        );
      }
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(searchResults, "text/html");
    const products = doc.querySelectorAll(".s-result-item");
    const expected = [...products].map((product) => {
      const idAttr = product.getAttribute("data-asin");
      if (!idAttr) return null; // skip items without ASIN
      const title = product.querySelector("h2 a span")?.textContent || "";
      const priceWhole = product.querySelector(".a-price-whole")?.textContent || "0";
      const priceFraction = product.querySelector(".a-price-fraction")?.textContent || "0";
      const price = `${priceWhole}.${priceFraction}`;
      const rating = product.querySelector(".a-icon-star-small span")?.textContent?.split(" ")[0] || "";
      return { id: idAttr, title, price, rating };
    }).filter(Boolean).slice(0, 25);

    compareJSON(expected, JSON.parse(json), { verbose: true });
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Amazon Product Data Extraction</h2>
      <p>
        You are tasked with extracting structured data about Amazon products within a specified price range.
        This data will help a data analytics team analyze market pricing and product popularity trends.
      </p>
      <p>
        Using Amazon's search page, retrieve products priced between <code>${minPrice} USD</code> and <code>${maxPrice} USD</code>.
        For each product, you need to collect:
      </p>
      <ul>
        <li><code>id</code>: The Amazon ASIN</li>
        <li><code>title</code>: Product title</li>
        <li><code>price</code>: Product price as a string with decimal</li>
        <li><code>rating</code>: Average rating (if available)</li>
      </ul>
      <p>Limit to the first 25 products returned.</p>
      <p>Output the data as a JSON array in the following format:</p>
      <pre><code class="json">[
  { "id": "B08XYZ1234", "title": "Laptop Model A", "price": "599.99", "rating": "4.5" },
  { "id": "B07ABC5678", "title": "Laptop Model B", "price": "499.50", "rating": "4.0" }
]</code></pre>
      <label for="${id}" class="form-label">Enter your JSON data:</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="5" required></textarea>
      <p class="text-muted">
        Amazon search results may vary by region. Ensure your scraper correctly selects the first 25 products
        matching the price range.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* 
Solution hint: In browser console visit:
https://www.amazon.com/s?k=laptops&rh=p_36%3A${minPrice}00-${maxPrice}00

Then run:

copy([...document.querySelectorAll(".s-result-item")]
  .map(product => {
    const id = product.getAttribute("data-asin");
    if (!id) return null;
    const title = product.querySelector("h2 a span")?.textContent || "";
    const priceWhole = product.querySelector(".a-price-whole")?.textContent || "0";
    const priceFraction = product.querySelector(".a-price-fraction")?.textContent || "0";
    const price = `${priceWhole}.${priceFraction}`;
    const rating = product.querySelector(".a-icon-star-small span")?.textContent?.split(" ")[0] || "";
    return { id, title, price, rating };
  }).filter(Boolean).slice(0,25)
)
*/
