import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 2 }) {
  const id = "q-rest-api-stats";
  const title = "REST API: Advanced Analytics with Validation and CORS";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate comprehensive test data
  const dataSize = Math.floor(random() * 8) + 8; // 8-15 numbers
  const testData = Array.from({ length: dataSize }, () => Math.floor(random() * 200) - 50); // -50 to 149

  // Calculate expected comprehensive statistics
  const sortedData = [...testData].sort((a, b) => a - b);
  const sum = testData.reduce((a, b) => a + b, 0);
  const mean = sum / testData.length;
  const median =
    testData.length % 2 === 0
      ? (sortedData[testData.length / 2 - 1] + sortedData[testData.length / 2]) / 2
      : sortedData[Math.floor(testData.length / 2)];

  const min = Math.min(...testData);
  const max = Math.max(...testData);

  // Standard deviation
  const variance = testData.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / testData.length;
  const stdDev = Math.sqrt(variance);

  // Quartiles
  const q1Index = Math.floor(testData.length * 0.25);
  const q3Index = Math.floor(testData.length * 0.75);
  const q1 = sortedData[q1Index];
  const q3 = sortedData[q3Index];

  const question = html`
    <div class="mb-3">
      <h2>REST API: Advanced Statistical Analysis Endpoint</h2>
      <p>
        Production REST APIs require robust input validation, comprehensive error handling, proper CORS configuration,
        and detailed response structures. This question tests your ability to build a professional-grade API.
      </p>
      <h3>Complex API Requirements</h3>
      <p>Create a FastAPI endpoint <code>POST /analyze</code> that:</p>
      <ol>
        <li>
          <strong>Input Validation:</strong> Accepts JSON with <code>{"data": [numbers...]}</code>
          <ul>
            <li>Rejects empty arrays with 400 Bad Request</li>
            <li>Rejects non-numeric values with 422 Unprocessable Entity</li>
            <li>Rejects arrays longer than 1000 elements</li>
          </ul>
        </li>
        <li>
          <strong>Comprehensive Statistics:</strong> Returns JSON with:
          <ul>
            <li><code>mean</code>: arithmetic average</li>
            <li><code>median</code>: middle value</li>
            <li><code>std_dev</code>: standard deviation</li>
            <li><code>min</code>: minimum value</li>
            <li><code>max</code>: maximum value</li>
            <li><code>q1</code>: first quartile (25th percentile)</li>
            <li><code>q3</code>: third quartile (75th percentile)</li>
            <li><code>count</code>: number of data points</li>
            <li><code>email</code>: your email (${user.email})</li>
          </ul>
        </li>
        <li><strong>CORS:</strong> Allow cross-origin requests from all domains</li>
        <li><strong>Error Handling:</strong> Return appropriate HTTP status codes and error messages</li>
      </ol>
      <h3>Complete Implementation Template</h3>
      <pre><code class="language-python"># /// script
# requires-python = ">=3.11"
# dependencies = ["fastapi", "uvicorn", "pydantic"]
# ///

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator
from typing import List
import math

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class AnalysisRequest(BaseModel):
    data: List[float] = Field(..., min_length=1, max_length=1000)

    @field_validator('data')
    @classmethod
    def validate_numbers(cls, v):
        if not all(isinstance(x, (int, float)) for x in v):
            raise ValueError('All elements must be numeric')
        return v

@app.post("/analyze")
async def analyze_data(request: AnalysisRequest):
    nums = sorted(request.data)
    n = len(nums)

    # Basic stats
    mean = sum(request.data) / n
    median = nums[n // 2] if n % 2 else (nums[n // 2 - 1] + nums[n // 2]) / 2

    # Standard deviation
    variance = sum((x - mean) ** 2 for x in request.data) / n
    std_dev = math.sqrt(variance)

    # Quartiles
    q1_index = n // 4
    q3_index = (3 * n) // 4
    q1 = nums[q1_index]
    q3 = nums[q3_index]

    return {
        "mean": round(mean, 2),
        "median": round(median, 2),
        "std_dev": round(std_dev, 2),
        "min": min(request.data),
        "max": max(request.data),
        "q1": q1,
        "q3": q3,
        "count": n,
        "email": "${user.email}"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)</code></pre>
      <h3>Testing Requirements</h3>
      <p>Your API will be tested with this dataset:</p>
      <pre><code class="language-json">${JSON.stringify({ data: testData }, null, 2)}</code></pre>
      <p><strong>Expected Response Structure:</strong></p>
      <pre><code class="language-json">{
  "mean": ${mean.toFixed(2)},
  "median": ${median.toFixed(2)},
  "std_dev": ${stdDev.toFixed(2)},
  "min": ${min},
  "max": ${max},
  "q1": ${q1},
  "q3": ${q3},
  "count": ${testData.length},
  "email": "${user.email}"
}</code></pre>
      <p class="text-muted">
        <strong>Deployment:</strong> Use Vercel, Railway, Render, or any hosting service. Ensure the endpoint is
        publicly accessible and handles CORS properly.
      </p>
      <label for="${id}" class="form-label">Enter the full URL of your /analyze endpoint</label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="url"
        placeholder="https://your-api.com/analyze"
        required
      />
      <p class="text-muted">Example: https://stats-api-advanced.vercel.app/analyze</p>
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");

    const endpoint = url.trim();

    try {
      new URL(endpoint);
    } catch {
      throw new Error("Invalid URL format");
    }

    // Test the endpoint
    try {
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: testData }),
      });

      if (!resp.ok) {
        throw new Error(`Endpoint returned status ${resp.status}. Expected 200 OK`);
      }

      const contentType = resp.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error("Response must be application/json");
      }

      const data = await resp.json();

      // Validate all required fields
      const required = ["mean", "median", "std_dev", "min", "max", "q1", "q3", "count", "email"];
      for (const field of required) {
        if (!(field in data)) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      // Validate email
      if (data.email !== user.email) {
        throw new Error(`Email must be ${user.email}`);
      }

      // Validate count
      if (data.count !== testData.length) {
        throw new Error(`Count should be ${testData.length}, got ${data.count}`);
      }

      // Validate statistics (with tolerance)
      const checks = [
        { field: "mean", expected: mean, got: data.mean, tolerance: 0.1 },
        { field: "median", expected: median, got: data.median, tolerance: 0.1 },
        { field: "std_dev", expected: stdDev, got: data.std_dev, tolerance: 0.1 },
        { field: "min", expected: min, got: data.min, tolerance: 0 },
        { field: "max", expected: max, got: data.max, tolerance: 0 },
        { field: "q1", expected: q1, got: data.q1, tolerance: 1 },
        { field: "q3", expected: q3, got: data.q3, tolerance: 1 },
      ];

      for (const check of checks) {
        const diff = Math.abs(check.got - check.expected);
        if (diff > check.tolerance) {
          throw new Error(
            `${check.field} should be approximately ${check.expected.toFixed(2)}, got ${check.got}`,
          );
        }
      }

      // Check CORS header
      const corsHeader = resp.headers.get("access-control-allow-origin");
      if (!corsHeader) {
        throw new Error("Response must include Access-Control-Allow-Origin header for CORS");
      }

      // Test error handling with invalid input
      const errorResp = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [] }),
      });

      if (errorResp.ok) {
        throw new Error("API should reject empty arrays with 4xx status code");
      }

      return true;
    } catch (error) {
      if (error.message.includes("fetch") || error.message.includes("Failed to fetch")) {
        throw new Error(`Unable to reach endpoint: ${endpoint}. Ensure it's publicly accessible.`);
      }
      throw error;
    }
  };

  return { id, title, weight, question, answer };
}
