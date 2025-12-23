import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-fastapi-csv-upload";
  const title = "FastAPI: CSV upload, validation, and summary";

  const random = seedrandom(`${user.email}#${id}`);
  const rows = Math.floor(random() * 5) + 5; // 5-9 rows
  const sampleCSV = ["name,amount,date"]
    .concat(
      Array.from({ length: rows }, (_, i) => {
        const amt = (Math.floor(random() * 900) + 100) / 10; // 10.0 - 100.0
        const dd = String(Math.floor(random() * 28) + 1).padStart(2, "0");
        return `row${i + 1},${amt.toFixed(1)},2024-07-${dd}`;
      }),
    )
    .join("\n");

  const answer = async (endpointUrl) => {
    try {
      if (!/^https?:\/\//.test(endpointUrl)) throw new Error("Enter a valid FastAPI endpoint URL");

      // Expect a multipart/form-data upload at provided URL
      const form = new FormData();
      form.append("file", new Blob([sampleCSV], { type: "text/csv" }), "data.csv");

      // Use proxy to avoid CORS issues
      const response = await fetch(`/proxy/${endpointUrl}`, { method: "POST", body: form });
      if (!response.ok) {
        throw new Error(`FastAPI endpoint responded with ${response.status} ${response.statusText}`);
      }
      const json = await response.json();

      // Validate JSON response keys
      const required = ["row_count", "amount_sum", "amount_mean"];
      const missing = required.filter((k) => !(k in json));
      if (missing.length) throw new Error(`Response must include: ${required.join(", ")}`);

      // Basic sanity checks
      if (json.row_count !== rows) throw new Error("row_count must match uploaded rows");
      if (typeof json.amount_sum !== "number" || typeof json.amount_mean !== "number") {
        throw new Error("amount_sum and amount_mean must be numeric");
      }

      return true;
    } catch (error) {
      throw new Error(`Endpoint validation failed: ${error.message}`);
    }
  };

  const question = html`
    <div class="mb-3">
      <h2>Upload a CSV to FastAPI and return stats</h2>
      <p>
        Build a <strong>FastAPI</strong> endpoint that accepts a CSV file upload (multipart form field <code>file</code>),
        validates schema/types, computes summary stats, and returns JSON.
      </p>
      <h3>What to submit</h3>
      <p>Deploy your FastAPI app and paste the public upload URL below (e.g., <code>https://yourapp.example.com/upload</code>).</p>

      <h3>Steps to solve</h3>
      <ol>
        <li>Create a FastAPI route <code>POST /upload</code> accepting <code>UploadFile</code> in field <code>file</code>.</li>
        <li>Read the CSV into pandas or Python <code>csv</code>; expect columns <code>name,amount,date</code>.</li>
        <li>Validate types: <code>amount</code> numeric; <code>date</code> ISO YYYY-MM-DD. Reject bad rows or 422.</li>
        <li>Compute <code>row_count</code>, <code>amount_sum</code> (number), <code>amount_mean</code> (number).</li>
        <li>Return JSON exactly: <code>{ "row_count": ..., "amount_sum": ..., "amount_mean": ... }</code>.</li>
        <li>Deploy to a public URL (Render/Railway/Cloud Run/etc.).</li>
      </ol>

      <label for="${id}" class="form-label"> FastAPI upload endpoint URL </label>
      <input class="form-control" id="${id}" name="${id}" required placeholder="https://.../upload" />
      <p class="text-muted">We will POST a sample CSV and validate your JSON response.</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
