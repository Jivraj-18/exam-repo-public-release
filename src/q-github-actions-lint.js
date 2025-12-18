import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gh-actions-lint";
  const title = "GitHub Actions Linting";

  const validate = async (answer) => {
    const url = answer.trim();
    if (!url.includes("raw.githubusercontent.com")) throw new Error("Must be a Raw GitHub URL");

    const res = await fetch(url);
    if (!res.ok) throw new Error("Could not fetch workflow file");
    const yaml = await res.text();

    const hasPush = /on:\s*\[?\s*push\s*\]?/.test(yaml) || /on:\n\s+push:/.test(yaml);
    const hasUv = /uv\s+pip\s+install/i.test(yaml) || /setup-uv/.test(yaml);
    const hasRuff = /ruff\s+check/.test(yaml);

    if (!hasPush) throw new Error("Workflow must trigger on 'push'");
    if (!hasUv) throw new Error("Workflow must install/use 'uv'");
    if (!hasRuff) throw new Error("Workflow must run 'ruff check'");

    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        Create a GitHub Action workflow (<code>.github/workflows/quality.yml</code>).
        <br>1. Trigger on <strong>push</strong>.
        <br>2. Install <strong>uv</strong>.
        <br>3. Run <code>ruff check .</code> to lint the code.
      </p>
      <label for="${id}" class="form-label">Raw GitHub URL of YAML file:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, validate };
}