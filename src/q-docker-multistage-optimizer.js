import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-docker-multistage-optimizer";
  const title = "Docker Multi-Stage Build Optimizer";

  // Deterministic RNG based on user email
  const random = seedrandom(`${user.email}#${id}`);
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  // Randomized parameters for each user
  const baseImageSizeMB = randInt(800, 1200);  // Base Ubuntu/Python image size
  const buildDependenciesMB = randInt(300, 600);  // npm, pip, build tools
  const sourceCodeMB = randInt(50, 150);  // Application source code
  const compiledArtifactsMB = randInt(20, 80);  // Final compiled/built artifacts
  const runtimeImageSizeMB = randInt(100, 200);  // Minimal runtime image (alpine, distroless)
  const runtimeDependenciesMB = randInt(30, 100);  // Only runtime libraries needed

  // Calculate single-stage build size (everything included)
  const singleStageSizeMB = baseImageSizeMB + buildDependenciesMB + sourceCodeMB + compiledArtifactsMB;

  // Calculate multi-stage build size (only runtime + artifacts + minimal deps)
  const multiStageSizeMB = runtimeImageSizeMB + compiledArtifactsMB + runtimeDependenciesMB;

  // Calculate size reduction in MB (rounded to integer)
  const sizeReductionMB = singleStageSizeMB - multiStageSizeMB;

  const answer = (input) => {
    const value = parseInt(String(input).trim(), 10);
    if (isNaN(value)) throw new Error("Answer must be a valid integer");
    if (value !== sizeReductionMB) {
      throw new Error(`Expected ${sizeReductionMB} MB, got ${value} MB`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h4>Case Study: Optimizing Container Images for Production Deployment</h4>
      <p>
        <strong>CloudScale Technologies</strong> is a SaaS company deploying microservices to Kubernetes clusters
        across multiple regions. Their DevOps team noticed that Docker image sizes have grown significantly, causing:
      </p>
      <ul>
        <li>Longer deployment times (pulling large images)</li>
        <li>Higher storage costs in container registries</li>
        <li>Increased attack surface due to unnecessary build tools in production</li>
        <li>Slower autoscaling response times</li>
      </ul>
      <p>
        The team decides to implement <strong>multi-stage Docker builds</strong> to separate build-time dependencies
        from runtime requirements. This approach uses a large base image for compilation, then copies only the
        necessary artifacts to a minimal runtime image.
      </p>

      <h5>Current Single-Stage Build</h5>
      <p>Your application currently uses a single Dockerfile that includes everything:</p>
      <pre><code class="language-dockerfile">FROM ubuntu:latest
# Install build tools, compilers, package managers
RUN apt-get update && apt-get install -y build-essential python3 npm
COPY . /app
RUN npm install && npm run build
CMD ["node", "dist/server.js"]</code></pre>

      <h5>Proposed Multi-Stage Build</h5>
      <p>The optimized Dockerfile uses multi-stage builds:</p>
      <pre><code class="language-dockerfile"># Stage 1: Build
FROM ubuntu:latest AS builder
RUN apt-get update && apt-get install -y build-essential
COPY . /app
RUN cd /app && npm install && npm run build

# Stage 2: Runtime
FROM alpine:latest
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
CMD ["node", "/app/dist/server.js"]</code></pre>

      <h5>Your Task: Calculate Size Reduction</h5>
      <p>Given the following image component sizes for your specific application:</p>
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th>Component</th>
            <th>Size (MB)</th>
            <th>Required In</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Base Ubuntu Image</td>
            <td>${baseImageSizeMB}</td>
            <td>Build stage only</td>
          </tr>
          <tr>
            <td>Build Dependencies (gcc, make, npm, pip)</td>
            <td>${buildDependenciesMB}</td>
            <td>Build stage only</td>
          </tr>
          <tr>
            <td>Source Code</td>
            <td>${sourceCodeMB}</td>
            <td>Build stage only</td>
          </tr>
          <tr>
            <td>Compiled Artifacts (dist/ folder)</td>
            <td>${compiledArtifactsMB}</td>
            <td>Both stages (copied to runtime)</td>
          </tr>
          <tr>
            <td>Minimal Runtime Image (Alpine Linux)</td>
            <td>${runtimeImageSizeMB}</td>
            <td>Runtime stage only</td>
          </tr>
          <tr>
            <td>Runtime Dependencies (minimal libs)</td>
            <td>${runtimeDependenciesMB}</td>
            <td>Runtime stage only</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Question:</strong> By switching from a single-stage build to a multi-stage build, how many megabytes
        (MB) of image size will you save in the final production image?
      </p>
      <p class="text-muted">
        <strong>Hint:</strong> Single-stage includes everything. Multi-stage final image only includes runtime image,
        compiled artifacts, and runtime dependencies. Round to the nearest integer.
      </p>

      <label for="${id}" class="form-label">Size reduction (in MB):</label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}

/*
Python solution sketch: calculate_docker_size.py

# /// script
# requires-python = ">=3.12"
# ///

def calculate_docker_optimization(
    base_image_mb: int,
    build_deps_mb: int,
    source_code_mb: int,
    compiled_artifacts_mb: int,
    runtime_image_mb: int,
    runtime_deps_mb: int
) -> int:
    """
    Calculate the size reduction achieved by using multi-stage Docker builds.
    
    Single-stage build includes:
    - Base image + build dependencies + source code + compiled artifacts
    
    Multi-stage build final image includes:
    - Runtime image + compiled artifacts + runtime dependencies
    
    Returns: Size reduction in MB
    """
    # Single-stage total
    single_stage_size = (
        base_image_mb + 
        build_deps_mb + 
        source_code_mb + 
        compiled_artifacts_mb
    )
    
    # Multi-stage final image
    multi_stage_size = (
        runtime_image_mb + 
        compiled_artifacts_mb + 
        runtime_deps_mb
    )
    
    # Reduction
    reduction = single_stage_size - multi_stage_size
    
    return reduction


if __name__ == "__main__":
    # Example calculation with sample values
    base = 1000
    build_deps = 450
    source = 100
    artifacts = 50
    runtime = 150
    runtime_deps = 60
    
    reduction = calculate_docker_optimization(
        base, build_deps, source, artifacts, runtime, runtime_deps
    )
    
    print(f"Single-stage image size: {base + build_deps + source + artifacts} MB")
    print(f"Multi-stage image size: {runtime + artifacts + runtime_deps} MB")
    print(f"Size reduction: {reduction} MB")
    
    # Output: Size reduction: 1290 MB (example values)
*/