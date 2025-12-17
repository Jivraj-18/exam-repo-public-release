export default function ({ user, weight }) {
  return {
    id: "secure-metrics-api-docker",
    title: "Secure Metrics API Deployment Using Docker",
    weight,

    prompt: `
Deploy a secure, containerized metrics API using Docker on Hugging Face Spaces.

Requirements:
• Docker-based deployment
• Public Hugging Face Space
• CPU Basic hardware

Configuration:
• Expose the application on port 8088
• Run as a non-root user (UID 1000)
• Use FastAPI and uvicorn
• Environment variable APP_PORT must control the port

Endpoints:
• GET /health → returns { "status": "ok" }
• GET /metrics → protected using an Authorization header

Security:
• Validate requests using a secret stored in Hugging Face Spaces

Submission:
Paste the public Hugging Face Space URL.
    `,

    type: "url",
    answer: null,
  };
}
