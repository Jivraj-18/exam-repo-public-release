import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 3.0 }) {
  const id = "q-python-async-orchestration";
  const title = "Python: Async Rate-Limited API Orchestration with Fault Tolerance";

  const random = seedrandom(`${user.email}#${id}`);
  
  const apiCount = 5 + Math.floor(random() * 3); // 5-7 APIs
  const rateLimit = 10 + Math.floor(random() * 5); // 10-14 requests/second
  const targetRequests = 100 + Math.floor(random() * 50); // 100-149 requests
  const failureRate = 15 + Math.floor(random() * 10); // 15-24% failure rate
  const maxRetries = 2 + Math.floor(random() * 2); // 2-3 retries
  const timeout = 2.0 + (random() * 1.0); // 2.0-3.0 seconds
  
  const answer = null; // Manual validation required

  const question = html`
    <div class="mb-3">
      <h2>Case Study: Distributed API Aggregation for Real-Time Analytics</h2>
      <p>
        <strong>DataFlow Analytics</strong> needs to aggregate data from ${apiCount} legacy microservices, 
        each with strict rate limits and unpredictable failures. You must implement a fault-tolerant 
        async orchestration system.
      </p>

      <h3>System Requirements</h3>
      <ol>
        <li><strong>Rate limiting</strong>: Maximum ${rateLimit} requests/second across ALL ${apiCount} APIs combined</li>
        <li><strong>Concurrent execution</strong>: Fetch from all ${apiCount} APIs simultaneously</li>
        <li><strong>Total requests</strong>: Make exactly ${targetRequests} requests (distributed across APIs)</li>
        <li><strong>Fault tolerance</strong>: Each API has ~${failureRate}% failure rate, retry up to ${maxRetries} times with exponential backoff</li>
        <li><strong>Timeout handling</strong>: Any request taking >${timeout.toFixed(1)}s must be cancelled and retried</li>
        <li><strong>Circuit breaker</strong>: If an API fails >50% of requests, stop using it for 10 seconds, then retry</li>
        <li><strong>Graceful shutdown</strong>: Handle SIGINT/SIGTERM and complete in-flight requests before exit</li>
        <li><strong>Metrics</strong>: Log final stats: total requests, failures, retries, avg latency per API</li>
      </ol>

      <h3>Mock API Server</h3>
      <p>Create a FastAPI mock server that simulates the ${apiCount} APIs:</p>
      <pre><code class="language-python">from fastapi import FastAPI, HTTPException
import random
import time

app = FastAPI()

@app.get("/api/{api_id}/data/{request_id}")
async def get_data(api_id: int, request_id: int):
    # Simulate random failures (~${failureRate}%)
    if random.random() < 0.${Math.floor(failureRate / 10)}${failureRate % 10}:
        raise HTTPException(status_code=500, detail="Service unavailable")
    
    # Simulate variable latency (0.1 - ${(timeout * 2).toFixed(1)}s)
    await asyncio.sleep(random.uniform(0.1, ${(timeout * 2).toFixed(1)}))
    
    return {
        "api_id": api_id,
        "request_id": request_id,
        "data": f"Data from API {api_id}",
        "timestamp": time.time()
    }</code></pre>

      <h3>Your Orchestrator Implementation</h3>
      <p>Create <code>orchestrator.py</code> with the following structure:</p>
      <pre><code class="language-python">import asyncio
import aiohttp
import time
from collections import defaultdict
import signal
import sys

class CircuitBreaker:
    def __init__(self, failure_threshold=0.5, recovery_time=10):
        self.failure_threshold = failure_threshold
        self.recovery_time = recovery_time
        self.failures = defaultdict(int)
        self.total_requests = defaultdict(int)
        self.blocked_until = defaultdict(float)
    
    def is_blocked(self, api_id):
        # TODO: Implement circuit breaker logic
        pass
    
    def record_success(self, api_id):
        pass
    
    def record_failure(self, api_id):
        pass

class RateLimiter:
    def __init__(self, max_requests_per_second):
        self.max_requests = max_requests_per_second
        self.tokens = max_requests_per_second
        self.last_update = time.monotonic()
    
    async def acquire(self):
        # TODO: Implement token bucket or sliding window
        pass

class APIOrchestrator:
    def __init__(self, num_apis, rate_limit, max_retries, timeout):
        self.num_apis = num_apis
        self.rate_limiter = RateLimiter(rate_limit)
        self.circuit_breaker = CircuitBreaker()
        self.max_retries = max_retries
        self.timeout = timeout
        self.session = None
        self.shutdown_event = asyncio.Event()
        self.metrics = defaultdict(lambda: {
            "requests": 0, 
            "failures": 0, 
            "retries": 0,
            "latencies": []
        })
    
    async def fetch_with_retry(self, api_id, request_id, retry_count=0):
        # TODO: Implement exponential backoff retry logic
        # TODO: Handle timeouts using asyncio.wait_for()
        # TODO: Respect circuit breaker state
        pass
    
    async def run(self, total_requests):
        # TODO: Distribute requests across APIs
        # TODO: Run concurrently with asyncio.gather()
        # TODO: Implement graceful shutdown on SIGINT
        pass
    
    def print_metrics(self):
        # TODO: Print final stats
        pass

async def main():
    orchestrator = APIOrchestrator(
        num_apis=${apiCount},
        rate_limit=${rateLimit},
        max_retries=${maxRetries},
        timeout=${timeout.toFixed(1)}
    )
    
    # Setup signal handlers
    loop = asyncio.get_event_loop()
    for sig in (signal.SIGINT, signal.SIGTERM):
        loop.add_signal_handler(
            sig, 
            lambda: asyncio.create_task(orchestrator.shutdown())
        )
    
    await orchestrator.run(total_requests=${targetRequests})
    orchestrator.print_metrics()

if __name__ == "__main__":
    asyncio.run(main())</code></pre>

      <h3>Validation Criteria</h3>
      <ol>
        <li>Run mock server: <code>uvicorn mock_api:app --port 8000</code></li>
        <li>Run orchestrator: <code>python orchestrator.py</code></li>
        <li>Verify metrics output shows:
          <ul>
            <li>Total requests = ${targetRequests}</li>
            <li>No more than ${rateLimit} requests/second (check timestamps)</li>
            <li>All APIs executed concurrently (check latency overlap)</li>
            <li>Retry logic triggered for failures</li>
            <li>Graceful shutdown on Ctrl+C</li>
          </ul>
        </li>
      </ol>

      <h3>Edge Cases to Handle</h3>
      <ul>
        <li><strong>Race conditions</strong>: Multiple coroutines accessing shared state</li>
        <li><strong>Deadlocks</strong>: Circular waits in semaphore acquisition</li>
        <li><strong>Memory leaks</strong>: Unclosed HTTP sessions</li>
        <li><strong>Zombie coroutines</strong>: Hanging tasks after shutdown signal</li>
        <li><strong>Clock skew</strong>: Rate limiter drift over time</li>
      </ul>

      <h3>Nightmare Bonus Challenges</h3>
      <ul class="text-danger">
        <li>Implement adaptive rate limiting (decrease rate if seeing 429 errors)</li>
        <li>Add request prioritization (some APIs more important than others)</li>
        <li>Implement hedged requests (send duplicate after 90th percentile latency)</li>
        <li>Add distributed tracing with correlation IDs</li>
      </ul>

      <label for="${id}" class="form-label">
        Paste your complete <code>orchestrator.py</code> code:
      </label>
      <textarea class="form-control font-monospace" id="${id}" name="${id}" rows="20" 
                placeholder="import asyncio&#10;import aiohttp&#10;..."></textarea>
      
      <div class="mt-2 text-muted">
        <small>
          Expected output: Complete Python code implementing all requirements<br>
          Time limit: 90-120 minutes<br>
          Evaluation: Manual code review + execution test<br>
          <strong>No LLM can solve this correctly without extensive debugging!</strong>
        </small>
      </div>
    </div>
  `;

  return { id, title, weight, question, answer };
}
