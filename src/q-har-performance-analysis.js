import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-har-performance-analysis";
    const title = "Analyze Website Metrics (HAR/JSON)";

    const random = seedrandom(`${user.email}#${id}`);

    // Create a minimal HAR-like structure
    // We'll generate 5 entries with random sizes and mimeTypes
    const entries = [];
    const mimeTypes = ["text/html", "application/javascript", "image/png", "image/jpeg", "text/css"];

    let expectedImageSize = 0;

    for (let i = 0; i < 6; i++) {
        const isImage = i % 2 === 0 && i !== 0; // simplistic dist
        const mime = isImage ? (random() > 0.5 ? "image/png" : "image/jpeg") : mimeTypes[Math.floor(random() * mimeTypes.length)];
        const size = Math.floor(random() * 50000) + 1000;

        // Accumulate logic for standard
        if (mime.startsWith("image/")) {
            expectedImageSize += size;
        }

        entries.push({
            request: { url: `https://example.com/asset${i}` },
            response: {
                status: 200,
                content: {
                    mimeType: mime,
                    size: size
                }
            }
        });
    }

    const harData = { log: { entries } };

    const answer = (input) => {
        return parseInt(input) === expectedImageSize;
    };

    const question = html`
    <div class="mb-3">
      <p>
        You are analyzing a <strong>HAR (HTTP Archive)</strong> file to audit website performance. 
        The file is essentially a JSON object.
      </p>
      <p>
        Your task is to calculate the <strong>total size (in bytes)</strong> of all resources where the <code>mimeType</code> starts with <code>image/</code> (e.g., image/png, image/jpeg).
      </p>
      <div class="card p-3 mb-3 bg-light" style="max-height: 300px; overflow-y: auto;">
        <pre><code>${JSON.stringify(harData, null, 2)}</code></pre>
      </div>
      <label for="${id}" class="form-label">Total Image Size (bytes):</label>
      <input type="number" class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

    return { id, title, weight, question, answer };
}
