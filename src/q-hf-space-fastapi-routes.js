import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { getUserFromStrong } from "./utils/user.js";

const expect = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

async function fetchJsonOrText(url, init) {
  const resp = await fetch(url, init);
  const ct = resp.headers.get("content-type") || "";
  const bodyText = await resp.text();
  return { resp, ct, bodyText };
}

export default async function ({ user, weight = 1 }) {
  const { email, rollNumber } = getUserFromStrong();
  const id = "q-hf-space-fastapi-routes";
  const title = "Hugging Face Space: FastAPI GET vs POST behavior";

  const question = html`
    <div class="mb-3">
      <h4>Deploy FastAPI to Hugging Face Space</h4>
      <p>You are logged in as <strong>${email}</strong> (roll: <strong>${rollNumber}</strong>).</p>

      <p>
        Create a Hugging Face <strong>Docker Space</strong> (recommended) or any Space type that can run FastAPI.
        Deploy an API with the following behavior:
      </p>

      <ol>
        <li>
          <strong>GET /</strong> must respond with exactly:
          <code>Please use post request</code>
        </li>
        <li>
          <strong>POST /</strong> must respond with exactly:
          <code>accepts your post request</code>
        </li>
        <li>
          <strong>POST /get_string</strong> must respond with exactly:
          <code>never give up</code>
        </li>
      </ol>

      <p class="text-muted">
        Submit the base URL of your Hugging Face Space (example: <code>https://xxxx.hf.space</code>).
        We will call the endpoints above and verify the exact text responses.
      </p>

      <label class="form-label" for="${id}">Hugging Face Space base URL</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (baseUrl) => {
    const base = String(baseUrl || "").trim();
    expect(base, "Space base URL is required");
    expect(/^https?:\/\//i.test(base), "URL must start with http/https");

    // Check "is the url given from hugging face space?"
    // HF Spaces are commonly *.hf.space or huggingface.co/spaces/<org>/<space>
    const isHf =
      /\.hf\.space\/?$/i.test(base) ||
      /^https?:\/\/huggingface\.co\/spaces\//i.test(base) ||
      base.includes(".hf.space");
    expect(isHf, "URL must be a Hugging Face Space URL (typically *.hf.space)");

    const rootUrl = new URL("/", base).toString();
    const getStringUrl = new URL("/get_string", base).toString();

    // 1) GET /
    {
      const { resp, bodyText } = await fetchJsonOrText(rootUrl, { method: "GET" });
      expect(resp.ok, `GET / failed with status ${resp.status}`);
      expect(
        bodyText.trim() === "Please use post request",
        `GET / must return exactly "Please use post request" (got: ${JSON.stringify(bodyText.trim())})`,
      );
    }

    // 2) POST /
    {
      const { resp, bodyText } = await fetchJsonOrText(rootUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, rollNumber }), // harmless payload
      });
      expect(resp.ok, `POST / failed with status ${resp.status}`);
      expect(
        bodyText.trim() === "accepts your post request",
        `POST / must return exactly "accepts your post request" (got: ${JSON.stringify(bodyText.trim())})`,
      );
    }

    // 3) POST /get_string
    {
      const { resp, bodyText } = await fetchJsonOrText(getStringUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ping: true }),
      });
      expect(resp.ok, `POST /get_string failed with status ${resp.status}`);
      expect(
        bodyText.trim() === "never give up",
        `POST /get_string must return exactly "never give up" (got: ${JSON.stringify(bodyText.trim())})`,
      );
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
