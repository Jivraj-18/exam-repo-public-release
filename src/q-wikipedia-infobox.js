// Created by 23f2001000 

import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-wikipedia-infobox";
  const title = "Wikipedia Infobox Scraping";

  const answer = "Tokyo";

  const question = html`
    <div class="mb-3">
      <p>
        Visit the Wikipedia page for <strong>Japan</strong>.
      </p>
      <p>
        From the <strong>infobox</strong>, extract the name of the
        <strong>capital city</strong>.
      </p>
      <label for="${id}" class="form-label">Capital City:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
