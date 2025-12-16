import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function ({ user, weight = 1 }) {
  const questionId = "duckdb-sales-analysis";
  
  const sampleCSV = `order_id,customer_name,product,quantity,price,date
1,John Doe,Laptop,1,50000,2024-01-15
2,Jane Smith,Mouse,2,500,2024-01-16
3,John Doe,Keyboard,1,1500,2024-01-17
4,Bob Johnson,Laptop,1,50000,2024-01-18
5,Jane Smith,Monitor,1,15000,2024-01-19
6,John Doe,Mouse,3,500,2024-01-20`;
  
  return {
    id: questionId,
    weight,
    question: html`
      <h3>DuckDB Sales Data Analysis</h3>
      <p>
        You have a messy sales dataset. Use DuckDB to clean and analyze it.
      </p>
      
      <h4>Input CSV (sales.csv):</h4>
      <pre><code>${sampleCSV}</code></pre>

      <h4>Requirements:</h4>
      <ol>
        <li>Load the CSV into DuckDB</li>
        <li>Calculate total revenue per customer (quantity × price)</li>
        <li>Find the top 3 customers by total revenue</li>
        <li>Return results as a list of dictionaries with: <code>customer_name</code>, <code>total_revenue</code>, <code>order_count</code></li>
        <li>Sort by total_revenue in descending order</li>
      </ol>

      <h4>Expected Output Format:</h4>
      <pre><code>[
  {"customer_name": "John Doe", "total_revenue": 52000, "order_count": 3},
  {"customer_name": "Bob Johnson", "total_revenue": 50000, "order_count": 1},
  {"customer_name": "Jane Smith", "total_revenue": 16000, "order_count": 2}
]</code></pre>

      <h4>Your Solution:</h4>
      <p>Write your Python code with DuckDB below:</p>
      <textarea 
        id="${questionId}-answer" 
        rows="20" 
        style="width: 100%; font-family: monospace;"
        placeholder="import duckdb
import pandas as pd

# Assume CSV is saved as 'sales.csv'
# Your code here
"></textarea>
    `,
    answer: async () => {
      const code = document.getElementById(`${questionId}-answer`).value;
      return { code };
    },
    help: [
      html`
        <h4>DuckDB Tips</h4>
        <ul>
          <li>Use <code>duckdb.connect()</code> to create an in-memory database</li>
          <li>Use <code>read_csv_auto('sales.csv')</code> to load CSV</li>
          <li>Calculate revenue: <code>quantity * price</code></li>
          <li>Use <code>GROUP BY</code> and <code>SUM()</code> for aggregation</li>
          <li>Use <code>ORDER BY ... DESC LIMIT 3</code> for top 3</li>
        </ul>
      `,
    ],
  };
}