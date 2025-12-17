import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pillow-resize";
  const title = "Python Pillow: Image Transformation";

  const answer = "resize";

  const question = html`
    <div class="mb-3">
      <p>
        In the "Basic Image Operations" section using the Python Pillow library, 
        what is the name of the method called on an image object to change its dimensions?
      </p>
      <div class="code-snippet" style="background: #f4f4f4; padding: 10px; margin-bottom: 10px; font-family: monospace;">
        with Image.open(path) as img:<br>
        &nbsp;&nbsp;img = img.<input style="width: 100px; display: inline-block;" class="form-control form-control-sm" id="${id}" name="${id}" />(size, Image.LANCZOS)
      </div>
      <label for="${id}" class="form-label">Method name:</label>
    </div>
  `;

  return { id, title, weight, question, answer };
}