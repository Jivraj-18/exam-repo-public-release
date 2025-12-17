// Question 2: Web scraping with CSS selectors
export async function question2({ user, weight = 0.75 }) {
  const id = "q-css-selector-scrape";
  const title = "CSS Selector Web Scraping (0.75 marks)";

  const answer = "847";

  const question = html`
    <div class="mb-3">
      <h4>Product Price Aggregation</h4>
      <p>
        <strong>Scenario:</strong> PriceTracker Pro needs to monitor competitor pricing. 
        You're tasked with extracting product prices from a sample e-commerce page.
      </p>
      <p>
        <strong>Your Task:</strong><br/>
        Visit <code>https://example-ecommerce.demo/products/electronics</code><br/>
        1. Use browser DevTools (F12) to inspect the page<br/>
        2. Find all products with class <code>.product-item</code><br/>
        3. Extract prices from elements with class <code>.price-value</code><br/>
        4. Sum all prices for products in the "Laptops" category (data-category="laptops")<br/>
        5. Round to nearest integer
      </p>
      <p>
        <strong>Hint:</strong> Use <code>document.querySelectorAll()</code> in the browser console
      </p>
      <label for="${id}" class="form-label">Total price sum:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
