export default function ({ user, weight = 1 }) {
  return {
    id: "api_error_attribution",
    title: "Shell + jq: Cross-System API Error Attribution",
    question: `
NovaRail operates a public API gateway that fronts multiple backend services.
Requests are logged in **JSON Lines** format.

Each log entry looks like:

\`\`\`json
{
  "ts": "2024-09-14T11:42:03Z",
  "method": "POST",
  "path": "/api/tickets",
  "status": 502,
  "latency_ms": 1840,
  "cluster": "ap-south-1",
  "backend": "payments",
  "user_tier": "enterprise"
}
\`\`\`

### Task (shell + jq only)

1. Filter logs to **enterprise users** in cluster \`ap-south-1\`
2. Restrict to **POST** requests between \`2024-09-10\` and \`2024-09-20\` (UTC)
3. Keep only **client-visible failures** (\`status >= 500\`)
4. For each backend:
   - Count failures
   - Compute average latency
5. Return the backend with the **highest failure count**
   - Break ties by **higher average latency**

### Deliverable
Enter **only the backend name**.
    `,
    answer: "payments",
    weight,
  };
}
