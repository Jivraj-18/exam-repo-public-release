import { html } from "htl";

export default function ({ user, weight = 1 }) {
  const limits = [
    { requests: 100, window: 60 },
    { requests: 50, window: 30 },
    { requests: 200, window: 120 },
  ];
  const config = limits[user.email.charCodeAt(4) % limits.length];

  return {
    id: "api-rate-limiting",
    weight,
    answer: html`
      <div>
        <h2>API Rate Limiting Implementation</h2>
        <p>
          Implement rate limiting: <strong>${config.requests} requests</strong> per
          <strong>${config.window} seconds</strong> per API key.
        </p>

        <h3>Task 1: Choose and describe ONE rate limiting algorithm</h3>
        <p>Options: Token Bucket, Sliding Window, Fixed Window Counter</p>
        <textarea
          id="algorithm"
          rows="6"
          cols="80"
          placeholder="Describe your chosen algorithm..."
          style="font-family: monospace; width: 100%; padding: 10px;"
        ></textarea>

        <h3>Task 2: Implement rate limiting middleware</h3>
        <p>Use Python (FastAPI/Flask) or Node.js (Express) with Redis</p>
        <textarea
          id="implementation"
          rows="20"
          cols="80"
          placeholder="Write your implementation..."
          style="font-family: monospace; width: 100%; padding: 10px;"
        ></textarea>

        <details>
          <summary style="cursor: pointer; color: blue;">Python FastAPI Solution</summary>
          <pre style="background: #f5f5f5; padding: 10px;">
from fastapi import FastAPI, HTTPException, Header
import redis
import time

app = FastAPI()
redis_client = redis.Redis(decode_responses=True)

RATE_LIMIT = ${config.requests}
WINDOW = ${config.window}

async def rate_limit(api_key: str = Header(None)):
    if not api_key:
        raise HTTPException(401, "API key required")
    
    key = f"rate:{api_key}"
    current = time.time()
    window_start = current - WINDOW
    
    pipe = redis_client.pipeline()
    pipe.zremrangebyscore(key, 0, window_start)
    pipe.zcard(key)
    pipe.zadd(key, {str(current): current})
    pipe.expire(key, WINDOW)
    
    results = pipe.execute()
    count = results[1]
    
    if count > RATE_LIMIT:
        raise HTTPException(429, "Rate limit exceeded")
    
    return True

@app.get("/api/data", dependencies=[Depends(rate_limit)])
async def get_data():
    return {"data": "success"}
          </pre>
        </details>

        <details>
          <summary style="cursor: pointer; color: blue;">Node.js Express Solution</summary>
          <pre style="background: #f5f5f5; padding: 10px;">
const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient();
client.connect();

const RATE_LIMIT = ${config.requests};
const WINDOW = ${config.window};

async function rateLimiter(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        return res.status(401).json({error: 'API key required'});
    }
    
    const key = \`rate:\${apiKey}\`;
    const now = Date.now();
    const windowStart = now - (WINDOW * 1000);
    
    const multi = client.multi();
    multi.zRemRangeByScore(key, 0, windowStart);
    multi.zCard(key);
    multi.zAdd(key, {score: now, value: \`\${now}\`});
    multi.expire(key, WINDOW);
    
    const results = await multi.exec();
    const count = results[1];
    
    if (count > RATE_LIMIT) {
        return res.status(429).json({error: 'Rate limit exceeded'});
    }
    
    next();
}

app.use(rateLimiter);
app.get('/api/data', (req, res) => res.json({data: 'success'}));
          </pre>
        </details>
      </div>
    `,
    validate: async () => {
      const algorithm = document.getElementById("algorithm").value.trim();
      const implementation = document.getElementById("implementation").value.trim();
      
      if (!algorithm) throw new Error("Describe rate limiting algorithm");
      if (!implementation) throw new Error("Provide implementation code");
      
      const lower = implementation.toLowerCase();
      let score = 0;
      if (lower.includes("redis")) score++;
      if (lower.includes("429")) score++;
      if (lower.includes("time") || lower.includes("window")) score++;
      
      if (score < 2) {
        throw new Error("Implementation should include: Redis, HTTP 429, time-based logic");
      }
      
      return { algorithm, implementation, config };
    },
  };
}
