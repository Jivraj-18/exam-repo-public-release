import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-ipify-json";
  const title = "Call ipify JSON API";

  const answer = "curl https://api64.ipify.org?format=json";

  const question = html`
    <div class="mb-3">
      <p>
        Using <code>curl</code>, which command calls the
        <strong>universal ipify endpoint</strong> (IPv4/IPv6) and asks
        for the response in <strong>JSON</strong> format?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
