/**
 * Question 6: Environment Variables in Railway Deployment
 * Topic: Platform Deployment with Environment Configuration
 * Marks: 1.0
 * GA: GA2 (Deployment Tools)
 */

import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.0 }) {
  const id = "q-environment-variables-railway";
  const title = "Environment Variables in Railway Deployment";
  const email = `${user.studentId}@ds.study.iitm.ac.in`;
  const deploymentId = `GA2-${user.studentId}`;

  const question = html`
    <div class="mb-3">
      <p>
        <strong>Case Study:</strong> SecureAPI needs to deploy a FastAPI service that connects to external services 
        using API keys stored securely as environment variables.
      </p>
      <p>
        Create a FastAPI application and deploy it to Railway with the following requirements:
      </p>
      <ol>
        <li>Create a FastAPI app (<code>main.py</code>) with:
          <ul>
            <li>A <code>/health</code> endpoint returning <code>{"status": "healthy"}</code></li>
            <li>A <code>/config</code> endpoint that returns your email, API key prefix (first 4 chars), and deployment ID</li>
          </ul>
        </li>
        <li>Deploy to Railway and set environment variables:
          <ul>
            <li><code>RAILWAY_API_KEY</code>: Any value (e.g., <code>RAK-abc123def456</code>)</li>
            <li><code>DEPLOYMENT_ID</code>: <code>${deploymentId}</code></li>
          </ul>
        </li>
        <li>Ensure CORS is enabled for GET requests</li>
      </ol>
      <p>
        <strong>Expected /config response:</strong>
      </p>
      <pre><code>{
  "email": "${email}",
  "api_key_prefix": "RAK-",
  "deployment_id": "${deploymentId}"
}</code></pre>
      <label for="${id}" class="form-label">Your Railway Deployment URL (the /config endpoint):</label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        type="url"
        placeholder="https://your-app.railway.app/config"
        required
      />
    </div>
  `;

  const answer = email;

  return { id, title, weight, question, answer };
}
