import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-image-reconstruction";
  const title = "Reconstruct a scrambled image";

  const imageUrl = "https://sanand0.github.io/tdsdata/image_reconstruct/scrambled.png";
  const referenceHash = "b3c7d1c8c93f5f4f1b1f7b3f9c7a2d5e"; // precomputed

  async function hashImage(file) {
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(bitmap, 0, 0);

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(hashBuffer)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  const answer = async (_, formData) => {
    const file = formData.get(id);
    if (!file || file.size === 0) return false;

    const hash = await hashImage(file);
    return hash === referenceHash;
  };

  const question = html`
    <div class="mb-3">
      <p>
        A scrambled image has been deliberately cut into
        <strong>25 equal pieces (5×5)</strong> and rearranged
        to hide its contents.
      </p>

      <p>
        You are given:
      </p>
      <ul>
        <li>The scrambled image</li>
        <li>A mapping file that specifies how to restore it</li>
      </ul>

      <p>
        Download the scrambled image:
        <a href="${imageUrl}" target="_blank">${imageUrl}</a>
      </p>

      <h3>Your task</h3>
      <ol>
        <li>Reassemble the image using the provided mapping</li>
        <li>Use tools like <strong>Pillow</strong> or <strong>ImageMagick</strong></li>
        <li>Preserve original resolution and orientation</li>
        <li>Export the final image in a lossless format (PNG or WEBP)</li>
      </ol>

      <label for="${id}" class="form-label">
        Upload the reconstructed image
      </label>

      <input
        class="form-control"
        type="file"
        id="${id}"
        name="${id}"
        accept="image/png,image/webp"
        required
      />

      <p class="text-muted">
        Hint: Each tile is the same size. Reposition tiles based on
        (row, column) coordinates from the mapping file.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
