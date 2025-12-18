// Module 2 (Deployment) + Module 5 (Data Sourcing): Vercel Edge Runtime with CORS preflight + streaming
// Weight: 4.5 marks
// Tests: Edge Runtime constraints, ReadableStream API, rate limit detection, CORS preflight optimization

import { html } from 'https://cdn.jsdelivr.net/npm/lit-html@3/+esm';
import seedrandom from 'https://cdn.jsdelivr.net/npm/seedrandom@3/+esm';

export default async function ({ user, weight }) {
  const rng = seedrandom(user.email);
  
  // Generate personalized scraping challenge
  const apis = [
    { rate: 10, header: 'X-RateLimit-Reset', base: 60 },
    { rate: 15, header: 'X-Rate-Limit-Reset', base: 60 },
    { rate: 20, header: 'x-ratelimit-reset', base: 60 }
  ];
  const api = apis[Math.floor(rng() * apis.length)];
  const totalRequests = 100 + Math.floor(rng() * 50); // 100-149 requests
  
  // Calculate minimum wait time needed
  const batches = Math.ceil(totalRequests / api.rate);
  const waitSeconds = (batches - 1) * api.base; // Wait between batches

  return {
    id: 'vercel-edge-streaming',
    title: 'Vercel Edge Runtime with Rate Limiting',
    weight,
    question: html`
      <p>Deploy a Vercel Edge function that streams API responses while respecting rate limits.</p>
      
      <h3>Critical Challenge</h3>
      <p>You need to fetch ${totalRequests} items, but the API:</p>
      <ul>
        <li>Allows only <strong>${api.rate} requests per minute</strong></li>
        <li>Returns <code>429 Too Many Requests</code> when limit exceeded</li>
        <li>Provides reset time in header <code>${api.header}</code> (Unix timestamp in seconds)</li>
        <li><strong>Edge Runtime has 30-second execution timeout</strong></li>
        <li>CORS preflight (OPTIONS) must be <100ms</li>
      </ul>
      
      <h3>Requirements</h3>
      
      <h4>Part A: Edge Runtime Setup (1.0 mark)</h4>
      <p>Create <code>/api/stream.js</code> with:</p>
      <pre><code>export const config = { runtime: 'edge' };</code></pre>
      <p>Handle CORS preflight - return <code>204 No Content</code> for OPTIONS requests.</p>
      
      <h4>Part B: Rate Limit Detection (1.5 marks)</h4>
      <p>Detect when you hit ${api.rate} requests:</p>
      <pre><code>if (response.status === 429) {
  const resetTime = parseInt(response.headers.get('${api.header}'));
  const waitMs = (resetTime * 1000) - Date.now();
  // Track cumulative wait time
}</code></pre>
      
      <h4>Part C: Streaming with Timeout Handling (2.0 marks)</h4>
      <p>Since Edge Runtime times out at 30s:</p>
      <ul>
        <li>Use <code>ReadableStream</code> to stream results as JSON</li>
        <li>Track start time: <code>const start = Date.now()</code></li>
        <li>If <code>(Date.now() - start) > 25000</code>, stop and return partial results</li>
        <li>Return: Total wait time you would have needed (in seconds, rounded up)</li>
      </ul>
      
      <h3>Answer Format</h3>
      <p>Given the rate limit of ${api.rate} req/min and ${totalRequests} total requests needed,</p>
      <p>calculate the <strong>minimum total wait time</strong> in seconds (assuming perfect timing).</p>
      <p>Formula: <code>Math.ceil(${totalRequests} / ${api.rate}) - 1</code> batches × 60 seconds</p>
      <p>Answer: The number of seconds of wait time</p>
      
      <h3>Edge Runtime Constraints</h3>
      <ul>
        <li><strong>No Node.js APIs</strong>: No Buffer, no fs, no process</li>
        <li><strong>No setTimeout</strong> in edge - calculate wait time instead</li>
        <li><strong>Streaming</strong>: Use <code>new TextEncoder().encode(JSON.stringify(data))</code></li>
        <li><strong>30s timeout</strong>: Must return early if execution time exceeds 25s</li>
        <li><strong>CORS preflight</strong>: OPTIONS must return immediately (no fetch calls)</li>
      </ul>
      
      <details>
        <summary>Edge Runtime Example</summary>
        <pre><code>export const config = { runtime: 'edge' };

export default async function handler(request) {
  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      }
    });
  }

  // Streaming response
  const stream = new ReadableStream({
    async start(controller) {
      let totalWait = 0;
      const start = Date.now();
      
      for (let i = 0; i < requests; i++) {
        if (Date.now() - start > 25000) break;
        
        const res = await fetch(url);
        if (res.status === 429) {
          const reset = parseInt(res.headers.get('X-RateLimit-Reset'));
          totalWait += Math.ceil((reset * 1000 - Date.now()) / 1000);
        }
        const data = await res.json();
        controller.enqueue(new TextEncoder().encode(JSON.stringify(data)));
      }
      controller.close();
    }
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'application/json' }
  });
}</code></pre>
      </details>
    `,
    answer: async (answer) => {
      const numAnswer = parseInt(answer);
      // Allow ±10 seconds margin
      return Math.abs(numAnswer - waitSeconds) <= 10;
    }
  };
}
