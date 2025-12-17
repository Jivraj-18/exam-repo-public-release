import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import JSZip from "https://cdn.jsdelivr.net/npm/jszip@3/+esm";

export default async function({ user, weight = 1 }) {
  const id = "q-log-analysis";
  const title = "Log Analysis Pipeline";

  // Generate a mock log file content dynamically
  const logs = [
    "192.168.1.1 - - [10:05:00] \"GET /index.html\" 200 1024",
    "10.0.0.5 - - [10:15:00] \"POST /api/login\" 500 512",
    "192.168.1.1 - - [10:20:00] \"GET /about.html\" 200 2048",
    "172.16.0.3 - - [10:30:00] \"POST /api/data\" 500 128",
    "10.0.0.5 - - [10:45:00] \"POST /api/logout\" 500 256",
    "10.0.0.5 - - [11:00:00] \"GET /dashboard\" 500 1024"
  ].join("\n");

  const correctIP = "10.0.0.5";

  // Create ZIP for download
  const zip = new JSZip();
  zip.file("access.log", logs);
  const zipBlob = await zip.generateAsync({ type: "blob" });
  const downloadUrl = URL.createObjectURL(zipBlob);

  const question = html`
    <div class="mb-3">
      <p>
        Download <a href="${downloadUrl}" download="logs.zip" class="btn btn-sm btn-outline-primary">logs.zip</a> and extract it.
        It contains an <code>access.log</code> file.
      </p>
      <p>
        Write a bash command pipeline using <code>grep</code>, <code>awk</code>, or <code>sort</code> to identify the
        <strong>IP address</strong> that triggered the most <code>500</code> errors.
      </p>
      <label for="${id}" class="form-label">Enter the IP address:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return {
    id,
    title,
    weight,
    question,
    answer: (val) => val.trim() === correctIP
  };
}
