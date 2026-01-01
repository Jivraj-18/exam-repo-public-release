import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { getUserFromStrong } from "./utils/user.js";

const expect = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

export default async function ({ user, weight = 1 }) {
  const { email, rollNumber } = getUserFromStrong();
  const id = "q-localhost-secret-api";
  const title = "Local REST API: verify email + secret";

  const SECRET = "exam-secret-120"; // fixed secret students must hardcode in their API

  const question = html`
    <div class="mb-3">
      <h4>Local REST API: Email + Secret Check</h4>
      <p>You are logged in as <strong>${email}</strong>.</p>
      <p>
        Run a local REST API on your machine (localhost) that exposes a POST endpoint <code>/check</code>.
      </p>
      <p>When we POST JSON:</p>
      <pre>${JSON.stringify({ email, secret: SECRET }, null, 2)}</pre>
      <p>It must respond with JSON:</p>
      <pre>${JSON.stringify({ ok: true }, null, 2)}</pre>
      <p>
        If the email or secret does not match, it must respond with:
        <code>{ "ok": false }</code>
      </p>
      <p class="text-muted">
        Submit the full URL to your endpoint (example: <code>http://localhost:8000/check</code>).
      </p>
      <label class="form-label" for="${id}">Endpoint URL</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (endpointUrl) => {
    const url = String(endpointUrl || "").trim();
    expect(url, "Endpoint URL is required");
    expect(url.startsWith("http://localhost") || url.startsWith("http://127.0.0.1"), "URL must be localhost");

    const good = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, secret: SECRET }),
    });
    expect(good.ok, `POST failed with status ${good.status}`);
    const goodJson = await good.json();
    expect(goodJson && typeof goodJson === "object", "Response must be JSON object");
    expect(goodJson.ok === true, "For matching email+secret, response must be {ok:true}");

    const bad = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "wrong@example.com", secret: "wrong" }),
    });
    expect(bad.ok, `POST (bad case) failed with status ${bad.status}`);
    const badJson = await bad.json();
    expect(badJson && typeof badJson === "object", "Bad-case response must be JSON object");
    expect(badJson.ok === false, "For mismatched email/secret, response must be {ok:false}");

    return true;
  };

  return { id, title, weight, question, answer };
}
