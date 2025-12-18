// q-docker-multi-stage-build.js
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-docker-multi-stage-build";
  const title = "Multi-stage Docker Build";

  const answer =
    "Final image uses python:3.11-slim, non-root UID 1000, port 8080, APP_ENV=production";

  const question = html`
    <div class="mb-3">
      <p>
        You want to ship a FastAPI microservice as a small production image.
        Write a multi-stage Dockerfile that:
      </p>
      <ul>
        <li>Uses <code>python:3.11-slim</code> as the final runtime image.</li>
        <li>
          Builds dependencies in a separate builder stage so build tools are not
          kept in the final image.
        </li>
        <li>
          Creates a non-root user with UID <code>1000</code> and runs the app
          as that user.
        </li>
        <li>
          Exposes port <code>8080</code> and starts the app with
          <code>uvicorn main:app --host 0.0.0.0 --port 8080</code>.
        </li>
        <li>Sets <code>APP_ENV=production</code> in the final image.</li>
      </ul>
      <p>Paste your complete Dockerfile below:</p>
      <label for="${id}" class="form-label">Dockerfile:</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="16"
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
