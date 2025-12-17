import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

/* ---------- Inline image utilities (NO external files needed) ---------- */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function imageData(img) {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, img.width, img.height).data;
}

export default async function ({ user, weight = 1 }) {
  const id = "q-image-colorspace-repack";
  const title = "Repack an image without changing pixels";

  const random = seedrandom(`${user.email}#${id}`);

  /* ---------- Generate deterministic 400×400 image ---------- */
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 400;
  const ctx = canvas.getContext("2d");

  for (let y = 0; y < 400; y++) {
    for (let x = 0; x < 400; x++) {
      const r = Math.floor((x / 399) * 255);
      const g = Math.floor((y / 399) * 255);
      const b = Math.floor(random() * 255);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  /* ---------- Export original image ---------- */
  const dataUrl = canvas.toDataURL("image/png");
  const originalImg = await loadImage(dataUrl);
  const originalPixels = imageData(originalImg);

  /* ---------- Answer validation ---------- */
  const answer = async () => {
    const input = document.getElementById(id);
    if (!input.files.length) throw new Error("No image uploaded");

    const file = input.files[0];

    if (file.size > 500) {
      throw new Error("Image must be smaller than 500 bytes");
    }

    const uploadedImg = await loadImage(URL.createObjectURL(file));

    if (
      uploadedImg.width !== originalImg.width ||
      uploadedImg.height !== originalImg.height
    ) {
      throw new Error("Uploaded image dimensions do not match");
    }

    let uploadedPixels;
    try {
      uploadedPixels = imageData(uploadedImg);
    } catch {
      throw new Error("Unable to decode uploaded image");
    }

    if (uploadedPixels.length !== originalPixels.length) {
      throw new Error("Pixel buffer length mismatch");
    }

    for (let i = 0; i < originalPixels.length; i++) {
      if (uploadedPixels[i] !== originalPixels[i]) {
        throw new Error("Pixel data mismatch detected");
      }
    }

    return true;
  };

  /* ---------- Question UI ---------- */
  const question = html`
    <div class="mb-3">
      <p><strong>Case Study: PixStream CDN Optimization</strong></p>

      <p>
        PixStream operates a global CDN serving millions of dynamically generated images.
        Engineers discovered that re-encoding images using alternative containers and
        metadata stripping—while preserving pixel-perfect accuracy—can drastically reduce
        payload size without affecting rendering.
      </p>

      <p>
        Your task is to <strong>repack the image below</strong> into a different image file
        that is <em>pixel-identical</em> to the original, but occupies
        <strong>less than 500 bytes</strong>.
      </p>

      <p>
        The image may be converted between formats, color profiles removed, or metadata
        stripped, but the final decoded pixel values must remain exactly the same.
      </p>

      <p>
        <img src="${dataUrl}" width="400" height="400" />
      </p>

      <p class="text-muted">
        Lossless does <strong>not</strong> mean “same file” — it means “same decoded pixels.”
      </p>

      <label for="${id}" class="form-label">
        Upload your losslessly repacked image (under 500 bytes)
      </label>

      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="file"
        accept="image/*"
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}
