import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-docker-layer-analysis-24f2007692";
    const title = "Analyze Docker Image Size";
    const rng = seedrandom(`${user.email}#${id}`);

    // Generate random layers
    const layers = [
        { cmd: "/bin/sh -c apk add --no-cache python3", size: Math.floor(rng() * 50) + 20, unit: "MB" }, // 20-70 MB
        { cmd: "/bin/sh -c pip install flask", size: Math.floor(rng() * 10) + 5, unit: "MB" }, // 5-15 MB
        { cmd: "/bin/sh -c #(nop) COPY . /app", size: Math.floor(rng() * 500) + 100, unit: "KB" }, // 100-600 KB (approx 0.1-0.6 MB)
        { cmd: "/bin/sh -c #(nop)  CMD [\"python3\"]", size: 0, unit: "B" }
    ];

    // Helper to print history
    const historyOutput = layers.map(l => {
        // Format: IMAGE CREATED BY SIZE
        const sizeStr = l.size === 0 ? "0B" : `${l.size}${l.unit}`;
        return `<missing>   2 days ago   ${l.cmd.padEnd(40).substring(0, 40)}...   ${sizeStr}`;
    }).join("\n");

    // Calculate total in MB
    // KB -> /1024, B -> /1024/1024
    let totalMB = 0;
    for (const l of layers) {
        if (l.unit === "MB") totalMB += l.size;
        if (l.unit === "KB") totalMB += l.size / 1024;
        if (l.unit === "B") totalMB += l.size / 1024 / 1024;
    }

    // Round to 2 decimal places strict
    const expected = Number(totalMB.toFixed(2));

    const question = html`
    <div class="mb-3">
      <p>You run <code>docker history my-app:latest</code> and get the following output:</p>
      <pre><code>IMAGE       CREATED      CREATED BY                                      SIZE
${historyOutput}</code></pre>
      <p>Calculate the <strong>total size</strong> of this image in <strong>MB</strong>.</p>
      <ul>
        <li>1024 KB = 1 MB</li>
        <li>Ignore metadata overhead.</li>
        <li>Round your answer to <strong>2 decimal places</strong>.</li>
      </ul>
      <label for="${id}" class="form-label">Total Size (MB):</label>
      <input type="number" step="0.01" class="form-control" id="${id}" name="${id}" required>
    </div>
  `;

    const answer = (val) => Number(Number(val).toFixed(2)) === expected;

    return { id, title, weight, question, answer };
}
