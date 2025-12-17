import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-fastapi-ratelimit-24f2002696";
  const title = "FastAPI Rate Limiting with Token Bucket";
  const random = seedrandom(`${user.email}#${id}`);
  
  // Generate random constraints
  const requestsPerMinute = 8 + Math.floor(random() * 5); // 8-12
  const burstSize = requestsPerMinute + Math.floor(random() * 3); // +0 to +2
  
  const question = html`
    <div class="mb-3">
      <h4>API Rate Limiting Implementation</h4>
      <p>
        <strong>Scenario:</strong> StreamMetrics API serves real-time analytics data. To prevent abuse 
        and ensure fair resource allocation, implement token bucket rate limiting.
      </p>
      <p>Create a FastAPI application with the following requirements:</p>
      <ol>
        <li>Create a <code>POST /metrics</code> endpoint that accepts JSON: <code>{"client_id": "string", "metric_type": "string"}</code></li>
        <li>
          Implement token bucket rate limiting:
          <ul>
            <li>Allow <strong>${requestsPerMinute} requests per minute</strong> per <code>client_id</code></li>
            <li>Burst capacity: <strong>${burstSize} tokens</strong></li>
          </ul>
        </li>
        <li>
          When rate limit exceeded, return:
          <ul>
            <li>HTTP Status: <code>429</code></li>
            <li>JSON: <code>{"error": "Rate limit exceeded", "retry_after": seconds_remaining}</code></li>
          </ul>
        </li>
        <li>On success, return: <code>{"status": "success", "client_id": "...", "email": "${user.email}"}</code></li>
        <li>Enable CORS for POST requests from any origin</li>
        <li>Include custom header: <code>X-Student-Email: 24f2002696@ds.study.iitm.ac.in</code> in all responses</li>
      </ol>
      <label for="${id}" class="form-label">Enter the full URL of your <code>/metrics</code> endpoint</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
      <p class="text-muted">
        We'll test by sending ${requestsPerMinute + 3} rapid requests from the same client_id to verify rate limiting.
      </p>
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");
    const cleanUrl = url.trim();
    
    const testClientId = "test-client-" + Math.random().toString(36).substring(7);
    const validData = {
      client_id: testClientId,
      metric_type: "page_views"
    };

    // Test 1: First request should succeed
    let response = await fetch(cleanUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validData),
    });

    if (!response.ok) {
      throw new Error(`First request failed with status ${response.status}. Expected 200.`);
    }

    // Check custom header
    const studentEmail = response.headers.get("X-Student-Email");
    if (studentEmail !== "24f2002696@ds.study.iitm.ac.in") {
      throw new Error(`Missing or incorrect X-Student-Email header. Expected: 24f2002696@ds.study.iitm.ac.in`);
    }

    let data = await response.json();
    if (data.status !== "success") {
      throw new Error("Response must have status: 'success' for valid request");
    }
    if (data.email !== user.email) {
      throw new Error(`Response must include your email: ${user.email}`);
    }

    // Test 2: Send multiple requests to trigger rate limit
    let rateLimitHit = false;
    for (let i = 0; i < requestsPerMinute + 5; i++) {
      response = await fetch(cleanUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validData),
      });

      if (response.status === 429) {
        rateLimitHit = true;
        const errorData = await response.json();
        if (!errorData.error || !errorData.retry_after) {
          throw new Error("429 response must include 'error' and 'retry_after' fields");
        }
        break;
      }
    }

    if (!rateLimitHit) {
      throw new Error(`Rate limit not enforced. Expected 429 after ${requestsPerMinute} requests.`);
    }

    // Test 3: Different client_id should not be rate limited
    const differentClientData = {
      client_id: "different-client-" + Math.random().toString(36).substring(7),
      metric_type: "clicks"
    };

    response = await fetch(cleanUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(differentClientData),
    });

    if (response.status !== 200) {
      throw new Error(`Different client_id should not be rate limited. Got status: ${response.status}`);
    }

    return true;
  };

  return { id, title, weight, question, answer };
}

/*
Python solution sketch: app.py

# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "fastapi",
#   "uvicorn",
# ]
# ///

from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time
from collections import defaultdict

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Token bucket implementation
rate_limit_store = defaultdict(lambda: {"tokens": 10, "last_update": time.time()})

class MetricsRequest(BaseModel):
    client_id: str
    metric_type: str

@app.post("/metrics")
async def post_metrics(request: MetricsRequest, response: Response):
    # Add custom header
    response.headers["X-Student-Email"] = "24f2002696@ds.study.iitm.ac.in"
    
    client_id = request.client_id
    current_time = time.time()
    
    # Token bucket logic
    bucket = rate_limit_store[client_id]
    time_passed = current_time - bucket["last_update"]
    
    # Refill tokens (10 per minute = 1 token per 6 seconds)
    tokens_to_add = time_passed / 6.0
    bucket["tokens"] = min(12, bucket["tokens"] + tokens_to_add)  # Max burst capacity
    bucket["last_update"] = current_time
    
    # Check if request can be served
    if bucket["tokens"] < 1:
        retry_after = int((1 - bucket["tokens"]) * 6)
        raise HTTPException(
            status_code=429,
            detail={"error": "Rate limit exceeded", "retry_after": retry_after}
        )
    
    # Consume one token
    bucket["tokens"] -= 1
    
    return {
        "status": "success",
        "client_id": client_id,
        "email": "24f2002696@ds.study.iitm.ac.in"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
*/
