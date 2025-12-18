import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-http-status";
  const title = "HTTP Status Codes";

  const random = seedrandom(`${user.email}#${id}`);
  const codes = [200, 201, 301, 302, 400, 401, 403, 404, 500];
  const code = codes[Math.floor(random() * codes.length)];

  const meanings = {
    200: "OK",
    201: "Created",
    301: "Moved Permanently",
    302: "Found",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
  };

  const answer = (value) => {
    if (!value.toLowerCase().includes(meanings[code].toLowerCase())) {
      throw new Error("Incorrect meaning");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>A server responds with HTTP status code:</p>
      <pre><code>${code}</code></pre>
      <label class="form-label">What does this status code mean?</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
