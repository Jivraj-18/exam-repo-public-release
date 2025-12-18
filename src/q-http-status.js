import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-http-status";
  const title = "HTTP Status Codes";

  const random = seedrandom(`${user.email}#${id}`);

  const codes = [200, 201, 301, 400, 401, 403, 404, 500];
  const code = codes[Math.floor(random() * codes.length)];

  const categories = {
    2: "success",
    3: "redirect",
    4: "client error",
    5: "server error",
  };

  const answer = categories[Math.floor(code / 100)];

  const question = html`
    <div class="mb-3">
      <p>
        A web API request returned the HTTP status code
        <strong>${code}</strong>.
      </p>

      <p>
        Which category does this status code belong to?
      </p>

      <label for="${id}" class="form-label">
        Enter one of: success, redirect, client error, server error
      </label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
