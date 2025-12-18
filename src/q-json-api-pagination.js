export default function ({ user, weight = 1 }) {
  return {
    id: "q1-json-api-pagination",
    weight,
    question: html`
      <h2>Question 1: Scrape JSON API with Pagination (1 mark)</h2>
      
      <h3>Scenario: E-Commerce Price Monitoring for PriceTrack Analytics</h3>
      
      <p>
        <strong>PriceTrack Analytics</strong> is a consumer intelligence platform that helps shoppers find the best deals 
        by monitoring prices across multiple e-commerce websites. The company provides real-time price alerts, historical 
        price trends, and product comparison tools to millions of users worldwide.
      </p>
      
      <h4>Business Challenge</h4>
      <p>
        PriceTrack needs to aggregate product data from various e-commerce platforms to build comprehensive price databases. 
        One of their partner retailers, TechMart, provides a public JSON API for their product catalog. However, the API 
        returns paginated results with a maximum of 20 products per page.
      </p>
      
      <p>
        Manually fetching data from each page is inefficient and doesn't scale. PriceTrack needs an automated solution to:
      </p>
      <ul>
        <li>Fetch all products from the paginated API</li>
        <li>Handle pagination automatically</li>
        <li>Extract specific product attributes</li>
        <li>Calculate aggregate statistics</li>
      </ul>
      
      <h4>API Documentation</h4>
      <p>The TechMart Products API is available at:</p>
      <pre><code>https://api.techmart-demo.com/products?category=electronics&page={page_number}</code></pre>
      
      <p>Response structure:</p>
      <pre><code>{
  "page": 1,
  "total_pages": 5,
  "products": [
    {
      "id": "prod_001",
      "name": "Wireless Headphones",
      "category": "electronics",
      "price": 79.99,
      "rating": 4.5,
      "stock": 150
    },
    ...
  ]
}</code></pre>
      
      <h4>Your Task</h4>
      <p>
        You are a data engineer at PriceTrack Analytics. Your task is to:
      </p>
      <ol>
        <li>Write a Python script to fetch all products from the electronics category across all pages</li>
        <li>The API URL is: <code>https://sanand0.github.io/tdsdata/api/products.json?category=electronics&page={N}</code></li>
        <li>Start from page 1 and continue until you've fetched all pages (check <code>total_pages</code>)</li>
        <li>Calculate the <strong>average price</strong> of all products that have a rating of 4.0 or higher</li>
        <li>Round the result to 2 decimal places</li>
      </ol>
      
      <h4>Implementation Hints</h4>
      <ul>
        <li>Use the <code>requests</code> library to fetch JSON data</li>
        <li>Loop through pages from 1 to <code>total_pages</code></li>
        <li>Filter products with <code>rating >= 4.0</code></li>
        <li>Calculate the average of their prices</li>
      </ul>
      
      <h4>Impact</h4>
      <p>
        By automating paginated API data extraction, PriceTrack Analytics can:
      </p>
      <ul>
        <li><strong>Scale Operations:</strong> Monitor thousands of products across multiple retailers</li>
        <li><strong>Real-Time Updates:</strong> Keep price databases current with minimal latency</li>
        <li><strong>Data Accuracy:</strong> Ensure complete product coverage without manual errors</li>
        <li><strong>Cost Efficiency:</strong> Reduce manual labor and operational costs</li>
      </ul>
      
      <div class="question-input">
        <label for="q1-answer">
          What is the average price of products with rating >= 4.0? (Round to 2 decimal places)
        </label>
        <input
          type="number"
          step="0.01"
          id="q1-answer"
          name="q1-answer"
          placeholder="e.g., 125.67"
          required
        />
      </div>
    `,
    answer: async (formData) => {
      const userAnswer = parseFloat(formData.get("q1-answer"));
      // This is a placeholder - in real implementation, you'd verify against actual API data
      const correctAnswer = 89.45; // Example answer
      return {
        score: Math.abs(userAnswer - correctAnswer) < 0.01 ? 1 : 0,
        feedback:
          Math.abs(userAnswer - correctAnswer) < 0.01
            ? "Correct! You successfully calculated the average price from paginated API data."
            : `Incorrect. Make sure you: 1) Fetched all pages, 2) Filtered products with rating >= 4.0, 3) Calculated the average price correctly.`,
      };
    },
  };
}
