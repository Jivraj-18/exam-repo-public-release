// Question 1: API Data Fetching and Processing
import { html } from "lit";

export default function ({ user, weight = 1 }) {
  const email = user?.email || "student@example.com";
  const rollNumber = email.split("@")[0];
  const seed = rollNumber.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  
  const sampleApiResponse = {
    "status": "success",
    "data": {
      "users": [
        {
          "id": (seed % 1000) + 1,
          "name": "Alice Johnson",
          "email": "alice@example.com",
          "age": 25 + (seed % 20),
          "orders": [
            {"order_id": "ORD001", "amount": 150.50 + (seed % 50), "status": "completed"},
            {"order_id": "ORD002", "amount": 200.00 + (seed % 100), "status": "pending"}
          ]
        },
        {
          "id": (seed % 1000) + 2,
          "name": "Bob Smith",
          "email": "bob@example.com",
          "age": 30 + (seed % 15),
          "orders": [
            {"order_id": "ORD003", "amount": 300.75 + (seed % 75), "status": "completed"}
          ]
        },
        {
          "id": (seed % 1000) + 3,
          "name": "Charlie Brown",
          "email": "charlie@example.com",
          "age": 22 + (seed % 10),
          "orders": []
        }
      ],
      "timestamp": "2024-12-17T10:30:00Z"
    }
  };

  return {
    id: "api-data-fetching",
    title: "API Data Processing",
    weight,
    question: html`
      <h3>API Data Fetching and Transformation</h3>
      <p>Write a Python function <code>process_api_response(api_response)</code> to summarize the data below:</p>
      <pre style="background: #f8f9fa; padding: 10px; border: 1px solid #ddd;">${JSON.stringify(sampleApiResponse, null, 2)}</pre>
      <textarea class="form-control" rows="10" name="api_code" placeholder="def process_api_response(api_response): ..."></textarea>
    `,
    answer: (formData) => formData.get("api_code")?.length > 20
  };
}