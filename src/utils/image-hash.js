// Lightweight perceptual hashing utilities using Canvas.
// Used for image comparisons (not used in final set, but safe to keep).

export async function loadImageToCanvas(url) {
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
  return { canvas, ctx, width: canvas.width, height: canvas.height };
}

/**
 * Simple dHash (difference hash) on grayscale.
 * Returns bitstring length (w-1)*h, default 9x8 => 64 bits.
 */
export function dHashFromCanvas(canvas, w = 9, h = 8) {
  const tmp = document.createElement("canvas");
  tmp.width = w;
  tmp.height = h;
  const tctx = tmp.getContext("2d", { willReadFrequently: true });

  tctx.drawImage(canvas, 0, 0, w, h);
  const { data } = tctx.getImageData(0, 0, w, h);

  const gray = [];
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    gray.push((r * 299 + g * 587 + b * 114) / 1000);
  }

  let bits = "";
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w - 1; x += 1) {
      const left = gray[y * w + x];
      const right = gray[y * w + x + 1];
      bits += left > right ? "1" : "0";
    }
  }
  return bits;
}

export function hammingDistance(a, b) {
  if (a.length !== b.length) throw new Error("Hash lengths differ");
  let d = 0;
  for (let i = 0; i < a.length; i += 1) if (a[i] !== b[i]) d += 1;
  return d;
}
