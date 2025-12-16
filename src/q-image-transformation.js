import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-image-transformation";
  const title = "Batch Image Transformation";

  const random = seedrandom(`${user.email}#${id}`);

  const operations = [
    { name: "grayscale", description: "Convert to grayscale" },
    { name: "resize", description: "Resize to 800x600", param: "800x600" },
    { name: "rotate", description: "Rotate 90 degrees", param: "90" },
    { name: "blur", description: "Apply blur filter" },
  ];

  const selectedOp = operations[Math.floor(random() * operations.length)];
  const imageCount = Math.floor(random() * 3) + 3;
  const targetFormat = random() > 0.5 ? "PNG" : "JPEG";

  const secondaryOps = [
    { key: "watermark", description: "Add a bottom-right text watermark" },
    { key: "strip_exif", description: "Strip EXIF/metadata before saving" },
    { key: "thumbnail", description: "Create a 256x256 thumbnail before saving" },
  ];

  const secondaryOp = secondaryOps[Math.floor(random() * secondaryOps.length)];

  const answer = (input) => {
    const response = input.trim().toLowerCase();

    const requiredTerms = [
      "pillow",
      selectedOp.name,
      secondaryOp.key.replace("strip_exif", "exif"),
      imageCount.toString(),
      targetFormat.toLowerCase(),
      "input",
      "output",
      "manifest",
    ];

    for (const term of requiredTerms) {
      if (!response.includes(term)) {
        throw new Error(`Response must mention: ${term}`);
      }
    }

    if (!response.includes("image.open") && !response.includes("pil")) {
      throw new Error("Must use PIL/Pillow library");
    }

    if (!response.includes("save") && !response.includes(".convert")) {
      throw new Error("Must show how to save transformed images");
    }

    if (targetFormat === "JPEG" && !response.includes("quality")) {
      throw new Error("Must set JPEG quality when saving");
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>PhotoBatch: Automated Image Processing Pipeline</h2>
      <p>
        <strong>PhotoBatch</strong> is a media processing service that handles bulk image transformations for e-commerce
        clients. They need to process product images with consistent transformations.
      </p>

      <h3>Scenario</h3>
      <p>You have <strong>${imageCount} product images</strong> in an <code>input/</code> folder that need to be:</p>
      <ul>
        <li><strong>Transformed:</strong> ${selectedOp.description}</li>
        <li><strong>Secondary step:</strong> ${secondaryOp.description}</li>
        <li><strong>Format:</strong> Saved as <strong>${targetFormat}</strong> (set quality for JPEG)</li>
        <li><strong>Output:</strong> Saved to an <code>output/</code> folder with same filenames</li>
      </ul>

      <h3>Task</h3>
      <p>Write Python code using <strong>Pillow (PIL)</strong> library that:</p>
      <ol>
        <li>Reads ${imageCount} images from an <code>input/</code> folder</li>
        <li>Applies the primary transformation: <strong>${selectedOp.description}</strong></li>
        <li>Also applies: <strong>${secondaryOp.description}</strong></li>
        <li>Converts and saves all images as <strong>${targetFormat}</strong> (set JPEG quality if applicable)</li>
        <li>Outputs to an <code>output/</code> folder with preserved filenames</li>
        <li>Generates a <code>manifest.json</code> summarizing filename, format, and size for each output</li>
      </ol>

      <p class="text-muted">
        Install: <code>pip install Pillow</code><br />
        Hint: Use <code>Image.open()</code>, <code>.${selectedOp.name}()</code>, and <code>.save()</code>
      </p>

      <label for="${id}" class="form-label">
        Paste your Python code (must include: Pillow, ${selectedOp.name}, ${imageCount} images, ${targetFormat}):
      </label>
      <textarea class="form-control font-monospace" id="${id}" name="${id}" rows="12" required></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
