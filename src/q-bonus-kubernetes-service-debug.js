export default async function ({ user, weight = 1 }) {
  return {
    id: "kubernetes-service-debug",
    question: `
You are given a Dockerized FastAPI application deployed to a Kubernetes cluster.
The pod status shows "Running", but the service endpoint is unreachable.

You are provided:
- Deployment YAML
- Service YAML
- Application logs (no errors)

Your task:
1. Identify the incorrect field in the Service configuration.
2. Fix it.
3. Expose or port-forward the service.
4. Access the \`/health\` endpoint.

Submit the EXACT response body returned by \`/health\`.
`,
    type: "string",
    answer: "ok",
    weight,
  };
}
