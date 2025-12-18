import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-rest-api-status";
    const title = "REST API HTTP Status Codes";

    const random = seedrandom(`${user.email}#${id}`);

    // Randomize the resource type
    const resources = ["student", "product", "user", "order"];
    const resource = resources[Math.floor(random() * resources.length)];
    const idField = resource === "student" ? "roll number" : "ID";

    const answer = "200,400,404,500"; // Correct combination

    const question = html`
    <div class="mb-3">
      <p>
        You're building a FastAPI application for a ${resource} database. 
        You need to return appropriate HTTP status codes for different scenarios.
      </p>
      <p>Match each scenario with the correct status code:</p>
      <ol>
        <li>${resource.charAt(0).toUpperCase() + resource.slice(1)} found and data returned successfully</li>
        <li>The ${idField} format is invalid (contains special characters)</li>
        <li>${idField} is valid but no ${resource} exists</li>
        <li>Database connection error, server can't process request</li>
      </ol>
      
      <label for="${id}" class="form-label">
        Enter the four status codes separated by commas (e.g., 200,400,404,500):
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., 200,201,404,500" />
      
      <p class="text-muted mt-2">
        <small>Common codes: 200=OK, 201=Created, 400=Bad Request, 404=Not Found, 500=Internal Server Error, 503=Service Unavailable</small>
      </p>
    </div>
  `;

    return { id, title, weight, question, answer };
}
