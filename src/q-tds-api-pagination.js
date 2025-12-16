import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-tds-api-pagination";
  const title = "API Pagination";

  const answer = (response) => {
    const text = response.toLowerCase();
    if (!text.includes("pagination")) {
      throw new Error("Mention pagination");
    }
    if (!text.includes("limit") && !text.includes("page")) {
      throw new Error("Explain limit/page based fetching");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        APIs often return large datasets.
      </p>
      <p>
        Why is pagination used in REST APIs?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
