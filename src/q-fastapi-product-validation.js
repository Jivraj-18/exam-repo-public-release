import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function ({ user, weight = 1 }) {
  const questionId = "fastapi-product-validation";
  
  return {
    id: questionId,
    weight,
    question: html`
      <h3>FastAPI Product Validation API</h3>
      <p>
        Create a FastAPI endpoint that accepts product information and validates it using Pydantic models.
      </p>
      
      <h4>Requirements:</h4>
      <ol>
        <li>Create a POST endpoint at <code>/product/validate</code></li>
        <li>Accept JSON with fields: <code>name</code> (string), <code>price</code> (positive float), <code>category</code> (one of: "electronics", "clothing", "food"), <code>stock</code> (non-negative integer)</li>
        <li>Return enriched product data with additional field <code>tax</code> (10% of price) and <code>status</code> ("in_stock" if stock > 0, else "out_of_stock")</li>
        <li>Handle validation errors with proper HTTP status codes</li>
      </ol>

      <h4>Example Request:</h4>
      <pre><code>{
  "name": "Laptop",
  "price": 50000.0,
  "category": "electronics",
  "stock": 5
}</code></pre>

      <h4>Example Response:</h4>
      <pre><code>{
  "name": "Laptop",
  "price": 50000.0,
  "category": "electronics",
  "stock": 5,
  "tax": 5000.0,
  "status": "in_stock"
}</code></pre>

      <h4>Your Solution:</h4>
      <p>Write your FastAPI code below:</p>
      <textarea 
        id="${questionId}-answer" 
        rows="20" 
        style="width: 100%; font-family: monospace;"
        placeholder="from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
..."></textarea>
    `,
    answer: async () => {
      const code = document.getElementById(`${questionId}-answer`).value;
      return { code };
    },
    help: [
      html`
        <h4>Pydantic Validation Tips</h4>
        <ul>
          <li>Use <code>Field(gt=0)</code> for positive numbers</li>
          <li>Use <code>Field(ge=0)</code> for non-negative numbers</li>
          <li>Use <code>Literal["option1", "option2"]</code> for enum-like validation</li>
        </ul>
      `,
    ],
  };
}