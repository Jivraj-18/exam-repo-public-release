import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function ({ user, weight = 1 }) {
  const questionId = "html-table-parsing";
  
  const sampleHTML = `<table>
  <thead>
    <tr>
      <th>Product</th>
      <th>Price</th>
      <th>Rating</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Laptop</td>
      <td>$1,200.50</td>
      <td>4.5</td>
    </tr>
    <tr>
      <td>Mouse</td>
      <td>$25.99</td>
      <td>4.2</td>
    </tr>
    <tr>
      <td>Keyboard</td>
      <td>$75.00</td>
      <td>4.7</td>
    </tr>
  </tbody>
</table>`;
  
  return {
    id: questionId,
    weight,
    question: html`
      <h3>Parse Product Table from HTML</h3>
      <p>
        Parse the following HTML table and extract product information into a structured format.
      </p>
      
      <h4>Input HTML:</h4>
      <pre><code>${sampleHTML}</code></pre>

      <h4>Requirements:</h4>
      <ol>
        <li>Use BeautifulSoup to parse the HTML table</li>
        <li>Extract product name, price (as float, without $ and commas), and rating (as float)</li>
        <li>Return a list of dictionaries with keys: <code>product</code>, <code>price</code>, <code>rating</code></li>
        <li>Calculate and add <code>avg_rating</code> as an additional key in the result</li>
      </ol>

      <h4>Expected Output Format:</h4>
      <pre><code>[
  {"product": "Laptop", "price": 1200.50, "rating": 4.5},
  {"product": "Mouse", "price": 25.99, "rating": 4.2},
  {"product": "Keyboard", "price": 75.00, "rating": 4.7}
]
# And also return avg_rating: 4.47 (rounded to 2 decimals)</code></pre>

      <h4>Your Solution:</h4>
      <p>Write your Python code below:</p>
      <textarea 
        id="${questionId}-answer" 
        rows="20" 
        style="width: 100%; font-family: monospace;"
        placeholder="from bs4 import BeautifulSoup

html_content = '''${sampleHTML.replace(/'/g, "\\'")}'''

# Your code here
"></textarea>
    `,
    answer: async () => {
      const code = document.getElementById(`${questionId}-answer`).value;
      return { code };
    },
    help: [
      html`
        <h4>BeautifulSoup Tips</h4>
        <ul>
          <li>Use <code>soup.find('table')</code> to locate the table</li>
          <li>Use <code>table.find_all('tr')</code> to get all rows</li>
          <li>Use <code>.text.strip()</code> to extract text from cells</li>
          <li>Use <code>string.replace('$', '').replace(',', '')</code> to clean price</li>
        </ul>
      `,
    ],
  };
}