import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function () {
  const id = "q-json-address";
  const title = "Validate Address JSON";

  const answer = async () => {
    const raw = document.getElementById(id).value;
    let obj;
    try {
      obj = JSON.parse(raw);
    } catch {
      throw new Error("Invalid JSON");
    }

    if (!obj.street || !obj.county || !obj.apartment) {
      throw new Error("Missing required address fields");
    }
    return true;
  };

  const question = html`
    <p>
      Enter a JSON object with <code>street</code>, <code>county</code>, and
      <code>apartment</code> fields.
    </p>
    <textarea id="${id}" class="form-control" rows="4"></textarea>
  `;

  return { id, title, question, answer };
}
