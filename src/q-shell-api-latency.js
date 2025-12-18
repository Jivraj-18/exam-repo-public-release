export default function ({ user, weight }) {
  return {
    id: "shell-api-latency",
    weight,
    title: "Shell: API latency threshold audit",
    description: `
You are given an HTTP access log.

Tasks:
- Filter POST requests to /api/payment
- Restrict to cluster=ap-south-1
- Only consider Fridays between 18:00–23:59 UTC
- Count requests with latency > 1200ms
- Status must be 200–299

Use shell tools only.

What is the total count?
    `,
    answer: {
      type: "number",
    },
  };
}
