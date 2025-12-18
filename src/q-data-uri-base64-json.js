import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { getUserFromStrong } from "./utils/user.js";

const expect = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

function isValidBase64(s) {
  const t = String(s || "").trim();
  // allow newlines/spaces? data URIs usually no, so keep strict-ish
  return /^[A-Za-z0-9+/]+={0,2}$/.test(t) && t.length % 4 === 0;
}

function decodeBase64ToUtf8(b64) {
  // atob gives binary string; decode as UTF-8
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

export default async function ({ user, weight = 1 }) {
  const { email, rollNumber } = getUserFromStrong();
  const id = "q-data-uri-base64-json";
  const title = "Create a JSON Data URI (Base64)";

  // You can change this JSON to whatever your exam wants.
  const payload = {
    roll_number: rollNumber,
    email,
    task: "data-uri",
    ok: true,
  };

  const question = html`
    <div class="mb-3">
      <h4>Data URI Generator (JSON → Base64)</h4>
      <p>You are logged in as <strong>${email}</strong> (roll: <strong>${rollNumber}</strong>).</p>
      <p>
        Convert the following JSON into a <strong>data URI</strong> using Base64 encoding.
        You may use <a href="https://dopiaza.org/goodies/data-uri-generator/" target="_blank" rel="noopener noreferrer">
        dopiaza.org data URI generator</a>.
      </p>
      <p>JSON to encode:</p>
      <pre>${JSON.stringify(payload, null, 2)}</pre>
      <p>
        Submit the full data URI string in the form:
        <code>data:application/json;base64,AAAA...</code>
      </p>
      <label class="form-label" for="${id}">Your data URI</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="4"></textarea>
    </div>
  `;

  const answer = async (dataUri) => {
    const text = String(dataUri || "").trim();
    expect(text.length > 0, "Data URI is required");
    expect(
      text.startsWith("data:application/json;base64,"),
      "Data URI must start with: data:application/json;base64,",
    );

    const b64 = text.replace("data:application/json;base64,", "").trim();
    expect(isValidBase64(b64), "Base64 portion is not valid");

    const decoded = decodeBase64ToUtf8(b64);

    let obj;
    try {
      obj = JSON.parse(decoded);
    } catch {
      throw new Error("Decoded Base64 is not valid JSON");
    }

    expect(obj && typeof obj === "object", "Decoded JSON must be an object");
    expect(obj.roll_number === rollNumber, "Decoded JSON must contain your roll_number");
    expect(obj.email === email, "Decoded JSON must contain your email");

    return true;
  };

  return { id, title, weight, question, answer };
}
