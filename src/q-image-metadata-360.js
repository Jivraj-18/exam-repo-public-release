import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { getUserFromStrong } from "./utils/user.js";
import { extractPngTextChunks } from "./utils/png-meta.js";

const expect = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

async function fetchBytes(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Failed to fetch: ${url}`);
  return new Uint8Array(await r.arrayBuffer());
}

async function pngSize(url) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.decoding = "async";
  await new Promise((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load PNG: ${url}`));
    img.src = url;
  });
  return { width: img.naturalWidth, height: img.naturalHeight };
}

export default async function ({ user, weight = 1 }) {
  const { email, rollNumber } = getUserFromStrong();
  const id = "q-image-metadata-360";
  const title = "Any PNG (360×360) with Hidden Metadata";

  const requiredMeta = `this is hidden data by ${rollNumber}`;

  const question = html`
    <div class="mb-3">
      <h4>Image + Metadata</h4>
      <p>You are logged in as <strong>${email}</strong> (roll: <strong>${rollNumber}</strong>).</p>
      <p>Create <strong>any PNG image</strong> of exactly <strong>360×360</strong> pixels.</p>
      <p>
        Embed this exact text inside the PNG metadata (tEXt/iTXt):
        <code>${requiredMeta}</code>
      </p>
      <p class="text-muted">Submit a single raw URL to your generated PNG.</p>
      <label class="form-label" for="${id}">Your PNG URL</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (pngUrl) => {
    const url = String(pngUrl || "").trim();
    expect(url, "PNG URL is required");

    const { width, height } = await pngSize(url);
    expect(width === 360 && height === 360, "Image must be exactly 360×360");

    const bytes = await fetchBytes(url);
    const chunks = extractPngTextChunks(bytes);
    const allText = chunks.join("\n");

    expect(
      allText.toLowerCase().includes(requiredMeta.toLowerCase()),
      `PNG metadata must include: "${requiredMeta}"`,
    );

    return true;
  };

  return { id, title, weight, question, answer };
}
