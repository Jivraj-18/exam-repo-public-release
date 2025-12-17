import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { getUserFromStrong } from "./utils/user.js";

const expect = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

export default async function ({ user, weight = 1 }) {
  const { email, rollNumber } = getUserFromStrong();
  const id = "q-hf-space-check";
  const title = "Hugging Face Space (Docker) POST /check";

  const data = [100, 120, 140];

  const question = html`
    <div class="mb-3">
      <h4>Hugging Face Space Endpoint</h4>
      <p>You are logged in as <strong>${email}</strong> (roll: <strong>${rollNumber}</strong>).</p>
      <p>
        Create a Hugging Face <strong>Docker Space</strong> that exposes a POST endpoint:
        <code>/check</code>
      </p>
      <p>When we POST this JSON:</p>
      <pre>${JSON.stringify({ roll_number: rollNumber, data }, null, 2)}</pre>
      <p>It must respond with JSON containing:</p>
      <pre>${JSON.stringify({ roll_ok: true, average: 120, average_ok: true }, null, 2)}</pre>
      <p class="text-muted">
        Submit two parts:
        <ol>
          <li>Your Space base URL (like <code>https://xxxx.hf.space</code>)</li>
          <li>Paste your Dockerfile text</li>
        </ol>
        Format: First line = Space URL. Remaining lines = Dockerfile content.
      </p>
      <label class="form-label" for="${id}">Your answer</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="8"></textarea>
    </div>
  `;

  const answer = async (output) => {
    const text = String(output || "").trim();
    expect(text, "Answer is required");

    const [firstLine, ...rest] = text.split("\n");
    const spaceUrl = (firstLine || "").trim();
    const dockerfile = rest.join("\n").trim();

    expect(spaceUrl.startsWith("http"), "First line must be your Space URL (http/https)");
    expect(dockerfile.length > 0, "You must paste your Dockerfile content after the first line");

    const endpoint = new URL("/check", spaceUrl).toString();
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ roll_number: rollNumber, data }),
    });

    expect(resp.ok, `POST /check failed with status ${resp.status}`);
    const ct = resp.headers.get("content-type") || "";
    expect(ct.includes("application/json"), "Response must be JSON");

    const json = await resp.json();
    expect(json && typeof json === "object", "Response must be a JSON object");
    expect(json.roll_ok === true, "roll_ok must be true");
    expect(Number(json.average) === 120, "average must be 120");
    expect(json.average_ok === true, "average_ok must be true");

    return true;
  };

  return { id, title, weight, question, answer };
}
