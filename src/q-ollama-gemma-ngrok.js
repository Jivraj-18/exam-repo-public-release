import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { getUserFromStrong } from "./utils/user.js";

const expect = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

export default async function ({ user, weight = 1 }) {
  const { email, rollNumber } = getUserFromStrong();
  const id = "q-ollama-gemma-ngrok";
  const title = "Ollama (gemma:3b) via ngrok: validate running";

  const question = html`
    <div class="mb-3">
      <h4>Ollama Remote Check</h4>
      <p>You are logged in as <strong>${email}</strong> (roll: <strong>${rollNumber}</strong>).</p>
      <p>
        Run <strong>Ollama</strong> locally with model <code>gemma:3b</code> available, and expose it to the internet using
        <strong>ngrok</strong>.
      </p>
      <p>
        Submit the public ngrok base URL (example: <code>https://xxxx.ngrok-free.app</code>).
        We will verify Ollama is running by calling:
      </p>
      <ul>
        <li><code>GET /api/tags</code> and check that <code>gemma</code> (or <code>gemma:3b</code>) appears.</li>
      </ul>
      <label class="form-label" for="${id}">ngrok base URL</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (baseUrl) => {
    const base = String(baseUrl || "").trim();
    expect(base, "Base URL is required");
    expect(base.startsWith("http"), "Base URL must start with http/https");

    const tagsUrl = new URL("/api/tags", base).toString();
    const resp = await fetch(tagsUrl);
    expect(resp.ok, `GET /api/tags failed with status ${resp.status}`);

    const ct = resp.headers.get("content-type") || "";
    expect(ct.includes("application/json"), "Ollama /api/tags must return JSON");

    const json = await resp.json();
    const text = JSON.stringify(json).toLowerCase();

    expect(
      text.includes("gemma") && (text.includes("3b") || text.includes("gemma:3b") || true),
      "Expected /api/tags output to include gemma (preferably gemma:3b)",
    );

    return true;
  };

  return { id, title, weight, question, answer };
}
