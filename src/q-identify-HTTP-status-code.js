import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-http-status-basic";
  const title = "Identify HTTP Status Code";

  const answer = "404";

  const question = html`
    <div class="mb-3">
      <p>
        A monitoring script checks an API endpoint every minute and logs the
        HTTP response status. One of the logs shows that the requested resource
        could not be found, but the server itself is reachable and working.
      </p>
      <p>
        Which <strong>HTTP status code</strong> should the script record in
        this case to correctly indicate that the resource is missing?
      </p>
      <label for="${id}" class="form-label">Status code:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
