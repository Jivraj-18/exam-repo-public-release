export default async function ({ user, weight = 1 }) {
  return {
    id: "hf-docker-secure",
    title: "Hugging Face Secure Docker Deployment",
    question: `
Deploy a secured observability API on Hugging Face Spaces using Docker SDK.

Requirements:
- Space name: ga2-obs-secure-41c9
- Public, CPU Basic
- Dockerfile with python:3.11-slim
- Non-root user UID 1000
- FastAPI app with /health and protected /metrics
- Authorization header validation
- Secret GA2_TOKEN_41C9

Submit the public Space URL.
    `,
    answer: "",
    weight,
  };
}
