export const question = {
  title: "API Rate Limiting Validator",
  description: `
    You are building a rate limiting middleware for a FastAPI application.
    Given a list of API request timestamps (in milliseconds) and a rate limit 
    configuration, validate whether each request violates the rate limit.
    
    Rate limit is defined as: maximum N requests allowed per M milliseconds.
    
    Input:
    - timestamps: Array of request timestamps in milliseconds
    - rateLimit: { maxRequests: number, windowMs: number }
    
    Output:
    - Array of objects with { timestamp, allowed: boolean, reason: string }
    
    Example:
    - If maxRequests=3 and windowMs=1000
    - Requests at: [0, 100, 200, 300, 500, 1500]
    - Results: [allowed, allowed, allowed, denied (4th request within 1s), allowed, allowed]
  `,
  testCases: [
    {
      input: {
        timestamps: [0, 100, 200, 300, 500, 1500],
        rateLimit: { maxRequests: 3, windowMs: 1000 }
      },
      expected: [
        { timestamp: 0, allowed: true },
        { timestamp: 100, allowed: true },
        { timestamp: 200, allowed: true },
        { timestamp: 300, allowed: false },
        { timestamp: 500, allowed: false },
        { timestamp: 1500, allowed: true }
      ]
    },
    {
      input: {
        timestamps: [0, 50, 100, 1100, 1150],
        rateLimit: { maxRequests: 3, windowMs: 1000 }
      },
      expected: [
        { timestamp: 0, allowed: true },
        { timestamp: 50, allowed: true },
        { timestamp: 100, allowed: true },
        { timestamp: 1100, allowed: true },
        { timestamp: 1150, allowed: true }
      ]
    }
  ],
  solution: `
    function validateRateLimit(timestamps, rateLimit) {
      const { maxRequests, windowMs } = rateLimit;
      const results = [];
      
      for (let i = 0; i < timestamps.length; i++) {
        const currentTime = timestamps[i];
        const windowStart = currentTime - windowMs;
        
        // Count requests in the current window
        const requestsInWindow = timestamps.slice(0, i + 1).filter(
          ts => ts > windowStart && ts <= currentTime
        ).length;
        
        results.push({
          timestamp: currentTime,
          allowed: requestsInWindow <= maxRequests
        });
      }
      
      return results;
    }
  `
};
