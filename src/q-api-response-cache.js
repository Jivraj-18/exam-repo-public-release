export const question = {
  title: "API Response Cache with TTL Management",
  description: `
    Implement a cache system for API responses with Time-To-Live (TTL) support.
    
    Features required:
    - Store API responses with unique keys
    - Each cache entry has a TTL (time to live in milliseconds)
    - Automatically expire entries after TTL
    - Get cached response if valid, return null if expired
    - Support cache invalidation by key
    - Track cache hits and misses
    
    Operations:
    - set(key, value, ttl): Store value with TTL
    - get(key): Get value if not expired, null otherwise
    - invalidate(key): Remove specific entry
    - stats(): Return { hits, misses, size }
    
    Input: Series of operations with timestamps
    
    Output: Results of get/stats operations
    
    Example:
    - set("user:1", {id: 1, name: "John"}, 1000)
    - get("user:1") at t=500ms → returns object (not expired)
    - get("user:1") at t=1500ms → returns null (expired)
  `,
  testCases: [
    {
      input: {
        operations: [
          { op: "set", key: "user:1", value: { id: 1, name: "John" }, ttl: 1000, time: 0 },
          { op: "get", key: "user:1", time: 500 },
          { op: "get", key: "user:1", time: 1500 },
          { op: "stats", time: 1500 }
        ]
      },
      expected: [
        null, // set returns nothing
        { id: 1, name: "John" }, // get at 500ms returns value
        null, // get at 1500ms returns null (expired)
        { hits: 1, misses: 1, size: 0 } // stats
      ]
    },
    {
      input: {
        operations: [
          { op: "set", key: "api:data", value: { data: [1, 2, 3] }, ttl: 2000, time: 0 },
          { op: "get", key: "api:data", time: 1000 },
          { op: "invalidate", key: "api:data", time: 1000 },
          { op: "get", key: "api:data", time: 1100 },
          { op: "stats", time: 1100 }
        ]
      },
      expected: [
        null,
        { data: [1, 2, 3] },
        null,
        null,
        { hits: 1, misses: 1, size: 0 }
      ]
    }
  ]
};
