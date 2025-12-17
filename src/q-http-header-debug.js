import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-http-header-debug";
  const title = "Fix HTTP request headers";

  const answer = async () => {
    const file = document.getElementById(id).files[0];
    if (!file) throw new Error("No file uploaded");

    const text = (await file.text()).toLowerCase();

    if (!text.includes("content-type: application/json"))
      throw new Error("Missing Content-Type");

    if (!text.includes("authorization: bearer"))
      throw new Error("Missing Authorization header");

    if (!text.includes("origin:"))
      throw new Error("Missing Origin header");

    return true;
  };

  const question = html`
    <p><strong>Case Study: API Gateway Failure</strong></p>
    <p>
      An API request is failing due to incorrect headers.
      Upload a <code>.txt</code> file containing the corrected HTTP request headers.
    </p>
    <ul>
      <li>Must include <code>Content-Type: application/json</code></li>
      <li>Must include Bearer token authorization</li>
      <li>Must include Origin header</li>
    </ul>
    <input class="form-control" id="${id}" type="file" accept=".txt" />
  `;

  return { id, title, weight, question, answer };
}
