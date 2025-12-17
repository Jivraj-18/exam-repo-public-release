import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { getUserFromStrong } from "./utils/user.js";
import { decodeRollFromImageData } from "./utils/stego.js";

const expect = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

async function loadImageData(url) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.decoding = "async";
  await new Promise((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);

  return {
    width: canvas.width,
    height: canvas.height,
    imageData: ctx.getImageData(0, 0, canvas.width, canvas.height),
  };
}

export default async function ({ user, weight = 1 }) {
  const { email, rollNumber } = getUserFromStrong();
  const id = "q-stego-roll-512";
  const title = "Invisible Roll Number (LSB Steganography)";

  const expected = `ROLL:${rollNumber}`;

  const question = html`
    <div class="mb-3">
      <h4>Invisible Roll Number (Deterministic Stego)</h4>
      <p>You are logged in as <strong>${email}</strong> (roll: <strong>${rollNumber}</strong>).</p>
      <p>
        Generate a <strong>512×512 PNG</strong> image that looks normal to humans, but encodes the string
        <code>${expected}</code> using LSB steganography in the <strong>red channel</strong>.
      </p>
      <p>
        Encoding format:
        <ol>
          <li>First 16 bits: payload length in bytes (unsigned)</li>
          <li>Then payload bytes UTF-8 (for <code>${expected}</code>)</li>
          <li>Read bits from red channel LSB, pixel-by-pixel</li>
        </ol>
      </p>
      <p class="text-muted">Submit the raw URL to your PNG.</p>
      <label class="form-label" for="${id}">Your PNG URL</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (pngUrl) => {
    const url = String(pngUrl || "").trim();
    expect(url, "PNG URL is required");

    const { width, height, imageData } = await loadImageData(url);
    expect(width === 512 && height === 512, "Image must be exactly 512×512");

    const decoded = decodeRollFromImageData(imageData);
    expect(decoded === expected, `Decoded payload mismatch. Expected "${expected}", got "${decoded}"`);

    return true;
  };

  return { id, title, weight, question, answer };
}
