import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./utils/download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-docker-layer-optimization";
  const title = "Docker: Multi-stage Build Optimization";

  const random = seedrandom(`${user.email}#${id}`);
  
  const baseImageSize = Math.floor(random() * 500) + 1800; // 1800-2300 MB
  const targetSize = Math.floor(baseImageSize * 0.3); // ~30% of original
  
  const dockerfile = `FROM python:3.11-slim as builder
WORKDIR /app
RUN apt-get update && apt-get install -y gcc g++ make
COPY requirements.txt .
RUN pip install --user -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
CMD ["python", "app.py"]`;

  const answer = async (response) => {
    response = response.trim().toLowerCase();
    const requiredElements = [
      "builder",
      "copy --from=builder",
      "python:3.11-slim"
    ];
    
    const hasAllElements = requiredElements.every(elem => 
      response.includes(elem.toLowerCase())
    );
    
    if (!hasAllElements) {
      throw new Error("Multi-stage build must include builder stage and COPY --from=builder");
    }
    
    if (!response.includes("slim") && !response.includes("alpine")) {
      throw new Error("Use a slim or alpine base image for the final stage");
    }
    
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Docker Multi-Stage Build for ML Application</h2>
      <p>
        Your current Docker image for a Python ML application is <strong>${baseImageSize}MB</strong>, 
        which is causing slow deployment times. The image includes build tools, development headers, 
        and compiled Python packages.
      </p>
      <p>
        Target: Reduce image size to approximately <strong>${targetSize}MB</strong> using multi-stage builds 
        while keeping all functionality.
      </p>
      
      <p><strong>Current Dockerfile approach (simplified):</strong></p>
      <pre><code>FROM python:3.11
RUN apt-get update && apt-get install -y gcc g++ make
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]</code></pre>

      <p>Which multi-stage strategy is correct?</p>
      
      <label for="${id}" class="form-label">
        Describe the multi-stage build approach (mention key stages and copy operations):
      </label>
      <textarea class="form-control" id="${id}" name="${id}" rows="4" required 
                placeholder="Builder stage: ... Final stage: ..."></textarea>
      <p class="text-muted">Key: separate builder stage with build tools, minimal final stage with only runtime dependencies</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution
Multi-stage build approach:
1. Builder stage: Use full Python image with build tools, compile packages
2. Final stage: Use slim Python image, copy only compiled packages from builder
3. Avoid including gcc, g++, make in final image
*/
