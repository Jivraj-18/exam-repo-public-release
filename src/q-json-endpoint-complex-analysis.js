import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function ({ user, weight }) {
  const apiLogs = [
    { endpoint: "/api/v1/users", method: "GET", statusCode: 200, responseTime: 145, timestamp: "2024-11-15T08:30:00Z", region: "us-east-1", authenticated: true, userId: "user_001", requestSize: 2048 },
    { endpoint: "/api/v1/products", method: "POST", statusCode: 201, responseTime: 230, timestamp: "2024-11-15T08:35:00Z", region: "us-west-2", authenticated: true, userId: "user_002", requestSize: 4096 },
    { endpoint: "/api/v2/orders", method: "GET", statusCode: 200, responseTime: 180, timestamp: "2024-11-15T08:40:00Z", region: "eu-west-1", authenticated: true, userId: "user_003", requestSize: 1024 },
    { endpoint: "/api/v1/users/profile", method: "PUT", statusCode: 200, responseTime: 95, timestamp: "2024-11-15T08:45:00Z", region: "us-east-1", authenticated: true, userId: "user_001", requestSize: 2900 },
    { endpoint: "/api/v1/payments", method: "POST", statusCode: 500, responseTime: 3200, timestamp: "2024-11-15T09:00:00Z", region: "us-west-2", authenticated: true, userId: "user_004", requestSize: 8192 },
    { endpoint: "/api/v2/analytics", method: "GET", statusCode: 200, responseTime: 420, timestamp: "2024-11-15T09:15:00Z", region: "ap-south-1", authenticated: false, userId: "guest_001", requestSize: 512 },
    { endpoint: "/api/v1/inventory", method: "GET", statusCode: 404, responseTime: 85, timestamp: "2024-11-15T09:30:00Z", region: "us-east-1", authenticated: true, userId: "user_005", requestSize: 2048 },
    { endpoint: "/api/v2/customers", method: "POST", statusCode: 201, responseTime: 210, timestamp: "2024-11-15T09:45:00Z", region: "eu-west-1", authenticated: true, userId: "user_006", requestSize: 5120 },
    { endpoint: "/api/v1/orders/history", method: "GET", statusCode: 200, responseTime: 175, timestamp: "2024-11-15T10:00:00Z", region: "us-west-2", authenticated: true, userId: "user_001", requestSize: 1536 },
    { endpoint: "/api/v2/reports", method: "GET", statusCode: 403, responseTime: 50, timestamp: "2024-11-15T10:15:00Z", region: "ap-south-1", authenticated: false, userId: "guest_002", requestSize: 256 },
    { endpoint: "/api/v1/users/settings", method: "PATCH", statusCode: 200, responseTime: 120, timestamp: "2024-11-15T10:30:00Z", region: "us-east-1", authenticated: true, userId: "user_007", requestSize: 2560 },
    { endpoint: "/api/v2/dashboard", method: "GET", statusCode: 200, responseTime: 340, timestamp: "2024-11-15T10:45:00Z", region: "eu-west-1", authenticated: true, userId: "user_003", requestSize: 6144 },
    { endpoint: "/api/v1/notifications", method: "GET", statusCode: 200, responseTime: 155, timestamp: "2024-11-15T11:00:00Z", region: "us-east-1", authenticated: true, userId: "user_008", requestSize: 1024 },
    { endpoint: "/api/v1/auth/login", method: "POST", statusCode: 200, responseTime: 89, timestamp: "2024-11-15T11:15:00Z", region: "us-west-2", authenticated: false, userId: "guest_003", requestSize: 512 },
    { endpoint: "/api/v1/search", method: "GET", statusCode: 200, responseTime: 245, timestamp: "2024-11-15T11:30:00Z", region: "eu-west-1", authenticated: true, userId: "user_009", requestSize: 4096 },
    { endpoint: "/api/v1/dashboard/stats", method: "GET", statusCode: 200, responseTime: 130, timestamp: "2024-11-15T07:45:00Z", region: "us-east-1", authenticated: true, userId: "user_010", requestSize: 1800 },
    { endpoint: "/api/v1/reports/daily", method: "GET", statusCode: 200, responseTime: 165, timestamp: "2024-11-15T12:15:00Z", region: "us-west-2", authenticated: true, userId: "user_011", requestSize: 2200 }
  ];

  return {
    id: "json-endpoint-complex-analysis",
    weight,
    question: html`
      <h2>Advanced API Performance Metrics with Time-Window Analysis</h2>
      
      <h3>Scenario:</h3>
      <p>As a DevOps engineer, you need to calculate performance metrics for optimal endpoints that meet strict SLA requirements during peak business hours.</p>
      
      <h3>Multi-Step Task:</h3>
      <ol>
        <li><strong>Step 1 - Filter Endpoints:</strong> Select endpoints that meet ALL criteria:
          <ul>
            <li>Status code is <code>200</code></li>
            <li>Response time is less than <code>200ms</code></li>
            <li>Endpoint path starts with <code>/api/v1/</code></li>
            <li>Request is <code>authenticated: true</code></li>
            <li>Region is either <code>us-east-1</code> OR <code>us-west-2</code></li>
            <li>Request size is less than <code>3000 bytes</code></li>
            <li><strong>NEW:</strong> Timestamp is between <code>08:00:00Z</code> and <code>11:00:00Z</code> (UTC, inclusive)</li>
          </ul>
        </li>
        <li><strong>Step 2 - Calculate Average:</strong> Calculate the average response time of filtered endpoints (round to 2 decimal places)</li>
        <li><strong>Step 3 - Apply Offsets:</strong>
          <ul>
            <li>Offset A = (email length) mod 10</li>
            <li>Offset B = (number of vowels in email) mod 5</li>
          </ul>
        </li>
        <li><strong>Step 4 - Final Calculation:</strong> 
          <code>Final Answer = average_response_time + Offset_A + Offset_B</code>
          <br>(Round final answer to 2 decimal places)
        </li>
        <li>Submit your answer as a decimal number (e.g., 125.50)</li>
      </ol>
      
      <p><strong>Your Email:</strong> ${user.email}</p>
      <p><strong>Email Length:</strong> ${user.email.length}</p>
      <p><strong>Hint:</strong> Count vowels (a, e, i, o, u) in your email address. Pay attention to the time window!</p>
      
      <p><strong>API Logs JSON:</strong></p>
      <pre>${JSON.stringify(apiLogs, null, 2)}</pre>
    `,
    validate: (answer) => {
      // Step 1: Filter endpoints that meet ALL criteria including timestamp
      const validEndpoints = apiLogs.filter((log) => {
        const timestamp = new Date(log.timestamp);
        const hour = timestamp.getUTCHours();
        
        return (
          log.statusCode === 200 &&
          log.responseTime < 200 &&
          log.endpoint.startsWith("/api/v1/") &&
          log.authenticated === true &&
          (log.region === "us-east-1" || log.region === "us-west-2") &&
          log.requestSize < 3000 &&
          hour >= 8 && hour <= 11 // Between 08:00:00Z and 11:59:59Z
        );
      });

      // Step 2: Calculate average response time
      const totalResponseTime = validEndpoints.reduce((sum, log) => sum + log.responseTime, 0);
      const averageResponseTime = validEndpoints.length > 0 
        ? totalResponseTime / validEndpoints.length 
        : 0;

      // Step 3: Calculate offsets
      const offsetA = user.email.length % 10;
      
      const vowels = user.email.toLowerCase().match(/[aeiou]/g);
      const vowelCount = vowels ? vowels.length : 0;
      const offsetB = vowelCount % 5;

      // Step 4: Final calculation
      const expected = parseFloat((averageResponseTime + offsetA + offsetB).toFixed(2));
      const submitted = parseFloat(parseFloat(answer).toFixed(2));

      if (submitted === expected) {
        return { correct: true };
      }

      return {
        correct: false,
        feedback: `Expected ${expected}. 
Breakdown: 
- Valid endpoints found: ${validEndpoints.length}
- Endpoints: ${validEndpoints.map(e => `${e.endpoint} (${e.responseTime}ms, ${new Date(e.timestamp).getUTCHours()}:${new Date(e.timestamp).getUTCMinutes()})`).join(', ')}
- Average response time: ${averageResponseTime.toFixed(2)}ms
- Offset A (email length ${user.email.length} mod 10): ${offsetA}
- Offset B (vowels ${vowelCount} mod 5): ${offsetB}
- Calculation: ${averageResponseTime.toFixed(2)} + ${offsetA} + ${offsetB} = ${expected}`,
      };
    },
  };
}
