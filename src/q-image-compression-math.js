import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 0.75 }) {
  const id = "q-image-compression-math";
  const title = "Images: Compression Reasoning";

  const random = seedrandom(`${user.email}#${id}`);

  const original = 1200;
  const reduction = Math.floor(random() * 40) + 30;
  const compressed = Math.round(original * (1 - reduction / 100));

  const answer = compressed;

  const question = html`
    <p>
      A CDN team compresses product images before deployment.
    </p>

    <p>
      An image originally sized at <strong>${original} bytes</strong>
      is compressed with a <strong>${reduction}% reduction</strong>.
    </p>

    <p>
      What is the final file size (in bytes)?
    </p>

    <label class="form-label" for="${id}">Final size (bytes)</label>
    <input class="form-control" id="${id}" name="${id}" />
  `;

  return { id, title, weight, question, answer };
}
