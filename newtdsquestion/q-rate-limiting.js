export default function ({ user, weight }) {
  return {
    id: "distributed_rate_limiting_production",
    weight,

    question: `
A global public API is deployed across multiple regions and thousands of
stateless instances behind regional load balancers.

Requirements:
- Enforce strict per-user rate limits
- Prevent abuse during traffic spikes
- Minimize added latency
- Remain correct even if individual instances restart

Which design BEST satisfies ALL requirements?

A. Per-instance in-memory counters with periodic synchronization  
B. Client-side rate limiting using SDKs  
C. Centralized Redis-based token bucket using short-lived keys  
D. One rate limiter per region without cross-region coordination  

    `,

    answer: "C",
  };
}
