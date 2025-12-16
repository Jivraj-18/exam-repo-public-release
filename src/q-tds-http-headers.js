import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-tds-http-headers";
  const title = "HTTP Content-Type Header";

  const answer = (response) => {
    const text = response.toLowerCase();
    if (!text.includes("content-type")) {
      throw new Error("Mention Content-Type header");
    }
    if (!text.includes("format") && !text.includes("type")) {
      throw new Error("Explain that it specifies data format");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        In REST APIs, HTTP headers pass metadata between the client and server.
      </p>
      <p>
        What is the purpose of the <code>Content-Type</code> HTTP header?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
