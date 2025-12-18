import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 0.5 }) {
  const id = "q-script-metadata";
  const title = "Inline Script Metadata";

  const answer = async (value) => {
    const code = value.trim();
    
    const hasBlock = /#\s*\/\/\/\s*script/.test(code);
    const hasDependency = /dependencies\s*=\s*\[.*"httpx".*\]/s.test(code);
    const hasImport = /import\s+httpx/.test(code);

    if (!hasBlock) throw new Error("Missing inline metadata block (# /// script)");
    if (!hasDependency) throw new Error("Metadata must declare 'httpx' dependency");
    if (!hasImport) throw new Error("Script must import httpx");

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Inline Script Metadata</h2>
      <p>
        Write a Python script that uses <code>httpx</code> to fetch google.com. 
        <strong>Crucially</strong>, add the Inline Script Metadata block at the top so it runs with <code>uv run script.py</code> without manual installation.
      </p>
      <label for="${id}" class="form-label">Paste Script Content:</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="6" style="font-family: monospace"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}