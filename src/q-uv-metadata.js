import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function({ user, weight = 1 }) {
  const id = "q-uv-metadata-audit";
  const title = "Edge Scripting: Inline Dependency Management";

  const question = html`
    <div class="mb-3">
      <h4>Zero-Install Scripting for Data SREs</h4>
      <p>
        <strong>Nexus Systems</strong> operates a fleet of edge data collectors. Their SRE team requires Python scripts that can run on minimal environments without manual <code>venv</code> management. They have standardized on <b>uv</b> using PEP 723 inline metadata to ensure reproducibility.
      </p>
      <h5>Your Task</h5>
      <p>You need to create a self-contained diagnostic script that validates environment health and formats output professionally.</p>
      <ul>
        <li><strong>Python Script:</strong> Create <code>monitor.py</code>.</li>
        <li><strong>Metadata:</strong> Include a <code># /// script</code> block.</li>
        <li><strong>Requirements:</strong> Declare <code>rich</code> and <code>psutil</code> as dependencies.</li>
        <li><strong>Logic:</strong> The script must use <code>rich.print</code> to display "TDS-Nexus-Active".</li>
      </ul>
      <label for="${id}" class="form-label">Enter the <b>Raw GitHub Gist URL</b> of your <code>monitor.py</code></label>
      <input class="form-control" id="${id}" name="${id}" type="url" placeholder="https://gist.githubusercontent.com/..." />
      <p class="text-muted small">Validation: We will parse the raw file for the PEP 723 block and verify the required dependencies.</p>
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");
    const resp = await fetch(url);
    const text = await resp.text();
    if (!text.includes("# /// script")) throw new Error("Metadata block '# /// script' not found.");
    if (!text.includes("rich") || !text.includes("psutil")) throw new Error("Missing dependencies: rich and psutil must be in the metadata.");
    return true;
  };

  return { id, title, weight, question, answer };
}