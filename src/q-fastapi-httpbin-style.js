import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

/** Pick a single random element from an array */
const pick = (array, random) => array[Math.floor(random() * array.length)];

export default async function({ user, weight = 2 }) {
  const id = "q-fastapi-httpbin-style";
  const title = "FastAPI: Deploy a Computation API";

  const random = seedrandom(`${user.email}#${id}`);

  // Different computation tasks
  const tasks = [
    {
      id: "sum-range",
      name: "Sum of Range",
      description: "sum of integers from 1 to N",
      paramName: "n",
      generateValue: () => 50 + Math.floor(random() * 150),
      compute: (n) => (n * (n + 1)) / 2,
      endpoint: "/sum",
      example: "GET /sum?n=10 → should return sum of 1+2+...+10 = 55"
    },
    {
      id: "fibonacci",
      name: "Fibonacci Number",
      description: "Nth Fibonacci number (F0=0, F1=1)",
      paramName: "n",
      generateValue: () => 10 + Math.floor(random() * 25),
      compute: (n) => {
        let a = 0, b = 1;
        for (let i = 0; i < n; i++) [a, b] = [b, a + b];
        return a;
      },
      endpoint: "/fibonacci",
      example: "GET /fibonacci?n=10 → should return F10 = 55"
    },
    {
      id: "factorial",
      name: "Factorial",
      description: "factorial of N (N!)",
      paramName: "n",
      generateValue: () => 5 + Math.floor(random() * 10),
      compute: (n) => {
        let result = 1;
        for (let i = 2; i <= n; i++) result *= i;
        return result;
      },
      endpoint: "/factorial",
      example: "GET /factorial?n=5 → should return 5! = 120"
    },
    {
      id: "prime-check",
      name: "Prime Check",
      description: "whether N is a prime number",
      paramName: "n",
      generateValue: () => 50 + Math.floor(random() * 950),
      compute: (n) => {
        if (n < 2) return false;
        for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
        return true;
      },
      endpoint: "/is-prime",
      example: "GET /is-prime?n=17 → should return true"
    }
  ];

  const selectedTask = pick(tasks, random);
  const testValue = selectedTask.generateValue();
  const expectedResult = selectedTask.compute(testValue);

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");

    // Construct the full URL with query parameter
    let targetUrl;
    try {
      targetUrl = new URL(url);
      targetUrl.searchParams.set(selectedTask.paramName, testValue);
    } catch (e) {
      // Handle URL without protocol
      targetUrl = new URL(`https://${url}`);
      targetUrl.searchParams.set(selectedTask.paramName, testValue);
    }

    let resp;
    try {
      resp = await fetch(targetUrl.toString());
    } catch (e) {
      throw new Error(`Could not reach your endpoint. Make sure it's publicly accessible and has CORS enabled.`);
    }

    if (!resp.ok) throw new Error(`Endpoint returned ${resp.status} ${resp.statusText}`);

    const contentType = resp.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error("Response must be JSON (Content-Type: application/json)");
    }

    let data;
    try {
      data = await resp.json();
    } catch (e) {
      throw new Error("Response body is not valid JSON");
    }

    // Validate response structure
    if (typeof data !== "object" || data === null) {
      throw new Error("Response must be a JSON object");
    }

    // Check for email
    if (data.email !== user.email) {
      throw new Error(`Response must include "email": "${user.email}"`);
    }

    // Check for result
    const result = data.result;
    if (result === undefined) {
      throw new Error('Response must include a "result" field');
    }

    // Validate computation
    if (result !== expectedResult) {
      throw new Error(`Incorrect result. For ${selectedTask.paramName}=${testValue}, expected ${expectedResult}, got ${result}`);
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>MicroCalc: Deploy a Computation API</h2>
      
      <p>
        <strong>MicroCalc</strong> is a serverless computation service. Your task is to build and
        deploy a FastAPI application that performs mathematical computations via HTTP endpoints.
      </p>

      <h3>Your Task</h3>
      <p>
        Deploy a FastAPI app with an endpoint that computes the <strong>${selectedTask.description}</strong>.
      </p>

      <h3>Endpoint Specification</h3>
      <ul>
        <li><strong>Method:</strong> GET</li>
        <li><strong>Path:</strong> <code>${selectedTask.endpoint}</code></li>
        <li><strong>Query Parameter:</strong> <code>${selectedTask.paramName}</code> (integer)</li>
        <li><strong>Response:</strong> JSON with <code>result</code> and <code>email</code></li>
      </ul>

      <h4>Example Request</h4>
      <pre class="bg-light p-2"><code>${selectedTask.example}</code></pre>

      <h4>Required Response Format</h4>
      <pre class="bg-dark text-light p-3"><code>{
  "${selectedTask.paramName}": &lt;input_value&gt;,
  "result": &lt;computed_result&gt;,
  "email": "${user.email}"
}</code></pre>

      <h3>FastAPI Code Template</h3>
      <pre class="bg-dark text-light p-3" style="font-size: 11px;"><code># main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("${selectedTask.endpoint}")
async def compute(${selectedTask.paramName}: int):
    # TODO: Implement ${selectedTask.description}
    result = ...
    return {
        "${selectedTask.paramName}": ${selectedTask.paramName},
        "result": result,
        "email": "${user.email}"
    }

# Run with: uvicorn main:app --host 0.0.0.0 --port 8000</code></pre>

      <h3>Deployment Options</h3>
      <ul>
        <li><strong>ngrok:</strong> Run locally + expose with <code>ngrok http 8000</code></li>
        <li><strong>Vercel:</strong> Deploy as serverless function</li>
        <li><strong>Railway/Render:</strong> Container deployment</li>
        <li><strong>Google Colab + ngrok:</strong> Free cloud option</li>
      </ul>

      <label for="${id}" class="form-label">
        Enter your endpoint URL (e.g., <code>https://xxx.ngrok.io${selectedTask.endpoint}</code>)
      </label>
      <input class="form-control" id="${id}" name="${id}" type="url" required 
        placeholder="https://your-domain.ngrok.io${selectedTask.endpoint}" />
      <p class="text-muted">
        We'll call <code>GET ${selectedTask.endpoint}?${selectedTask.paramName}=${testValue}</code> and verify the result.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution:

# main.py
# /// script
# requires-python = ">=3.12"
# dependencies = ["fastapi", "uvicorn"]
# ///

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

# Sum of range 1 to N
@app.get("/sum")
async def sum_range(n: int):
    result = n * (n + 1) // 2
    return {"n": n, "result": result, "email": "your@email.com"}

# Fibonacci
@app.get("/fibonacci")
async def fibonacci(n: int):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return {"n": n, "result": a, "email": "your@email.com"}

# Factorial
@app.get("/factorial")
async def factorial(n: int):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return {"n": n, "result": result, "email": "your@email.com"}

# Prime check
@app.get("/is-prime")
async def is_prime(n: int):
    if n < 2:
        result = False
    else:
        result = all(n % i != 0 for i in range(2, int(n**0.5) + 1))
    return {"n": n, "result": result, "email": "your@email.com"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

# Run locally: uv run main.py
# Expose: ngrok http 8000

*/
