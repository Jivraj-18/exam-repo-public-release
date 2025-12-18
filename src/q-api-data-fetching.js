// Question 1: API Data Fetching and Processing
import { html } from "https://cdn.jsdelivr.net/npm/lit@3/index.js";

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
          "orders": [{"order_id": "ORD001", "amount": 150.50 + (seed % 50), "status": "completed"}]
        }
      ]
    }
  };

  return {
    id: "api-data-fetching",
    weight,
    question: html`
      <h3>API Data Fetching and Transformation</h3>
      <p>Write a Python function <code>process_api_response(api_response)</code> to summarize the data:</p>
      <pre style="background: #f8f9fa; padding: 10px;">${JSON.stringify(sampleApiResponse, null, 2)}</pre>
      <textarea class="form-control" rows="8" name="api_code" placeholder="def process_api_response(api_response): ..."></textarea>
    `,
    answer: (formData) => formData.get("api_code")?.length > 20
  };
}