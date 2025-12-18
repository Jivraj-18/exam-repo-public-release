import { html } from "htl";

export default function ({ user, weight = 1 }) {
  const apps = [
    { name: "Flask API", port: 5000 },
    { name: "Express API", port: 3000 },
    { name: "FastAPI", port: 8000 },
  ];
  const app = apps[user.email.charCodeAt(1) % apps.length];

  return {
    id: "docker-multistage",
    weight,
    answer: html`
      <div>
        <h2>Docker Multi-Stage Build</h2>
        <p>
          Create a Dockerfile for a <strong>${app.name}</strong> using multi-stage builds
          to minimize the final image size.
        </p>

        <h3>Requirements:</h3>
        <ul>
          <li>Build stage with all dependencies</li>
          <li>Production stage with only runtime files</li>
          <li>Expose port ${app.port}</li>
          <li>Include .dockerignore</li>
        </ul>

        <h3>Dockerfile:</h3>
        <textarea
          id="dockerfile"
          rows="15"
          cols="80"
          placeholder="FROM python:3.11-slim AS builder..."
          style="font-family: monospace; width: 100%; padding: 10px;"
        ></textarea>

        <h3>.dockerignore:</h3>
        <textarea
          id="dockerignore"
          rows="6"
          cols="80"
          placeholder="node_modules/..."
          style="font-family: monospace; width: 100%; padding: 10px;"
        ></textarea>

        <details>
          <summary style="cursor: pointer; color: blue;">Reference Solution</summary>
          <pre style="background: #f5f5f5; padding: 10px;">
# Build stage
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt
COPY . .

# Production stage
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY --from=builder /app .
ENV PATH=/root/.local/bin:$PATH
EXPOSE ${app.port}
CMD ["python", "app.py"]

# .dockerignore
__pycache__/
*.pyc
.git/
.env
*.log
          </pre>
        </details>
      </div>
    `,
    validate: async () => {
      const dockerfile = document.getElementById("dockerfile").value.trim();
      const dockerignore = document.getElementById("dockerignore").value.trim();
      
      if (!dockerfile) throw new Error("Provide Dockerfile");
      if (!dockerignore) throw new Error("Provide .dockerignore");
      
      if (!dockerfile.includes("AS builder") && !dockerfile.includes("AS build")) {
        throw new Error("Must use multi-stage build (AS builder)");
      }
      if (!dockerfile.includes("COPY --from=")) {
        throw new Error("Must copy from build stage");
      }
      
      return { dockerfile, dockerignore, app };
    },
  };
}
