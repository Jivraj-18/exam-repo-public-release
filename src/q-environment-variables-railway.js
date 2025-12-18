/**
 * Question 3: Environment Variables in Railway Deployment
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
            <li>A <code>/config</code> endpoint that returns your email, API key prefix (first 4 characters of the <code>RAILWAY_API_KEY</code> environment variable value), and deployment ID</li>
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

  // Validation function to check if the Railway deployment URL returns the expected config
  const validate = async (submittedUrl) => {
    try {
      // Ensure the submitted URL points to a valid Railway deployment domain
      const parsedUrl = new URL(submittedUrl);
      const hostname = parsedUrl.hostname.toLowerCase();
      const isRailwayDomain =
        hostname === "railway.app" ||
        hostname.endsWith(".railway.app") ||
        hostname === "up.railway.app" ||
        hostname.endsWith(".up.railway.app");

      if (!isRailwayDomain) {
        throw new Error("The provided URL must be a Railway deployment URL (ending with .railway.app or .up.railway.app).");
      }
      const response = await fetch(submittedUrl);
      if (!response.ok) {
        throw new Error("Unable to fetch the deployment URL. Ensure the service is running.");
      }
      
      const data = await response.json();
      
      // Check for required fields
      if (!data.email || !data.deployment_id || !data.api_key_prefix) {
        throw new Error("Response missing required fields (email, deployment_id, api_key_prefix)");
      }
      
      // Verify email matches
      if (data.email !== email) {
        throw new Error(`Email mismatch. Expected: ${email}, Got: ${data.email}`);
      }
      
      // Verify deployment_id matches
      if (data.deployment_id !== deploymentId) {
        throw new Error(`Deployment ID mismatch. Expected: ${deploymentId}, Got: ${data.deployment_id}`);
      }
      
      // Verify api_key_prefix exists (first 4 chars of RAILWAY_API_KEY)
      if (typeof data.api_key_prefix !== 'string' || data.api_key_prefix.length < 4) {
        throw new Error("API key prefix is invalid or too short");
      }
      
      return true;
    } catch (error) {
      throw new Error("Failed to fetch or parse deployment URL. Please check the URL and ensure it returns valid JSON.");
    }
  };

  const answer = validate;

  return { id, title, weight, question, answer };
}
