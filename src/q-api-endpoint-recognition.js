import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function () {
  const id = "q-api-endpoint";
  const title = "Identify API Endpoint";

  const answer = async () => {
    const val = document.getElementById(id).value.trim();
    if (!val.endsWith("/similarity")) {
      throw new Error("Endpoint must end with /similarity");
    }
    return true;
  };

  const question = html`
    <p>
      Enter the correct API endpoint path for a semantic similarity service.
    </p>
    <input
      id="${id}"
      class="form-control"
      placeholder="http://localhost:8000/similarity"
    />
  `;

  return { id, title, question, answer };
}
