import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-regex-email";
  const title = "Email Validation Using Regex";

  const answer = "2";

  const question = html`
    <div class="mb-3">
      <p>
        How many of the following email addresses are valid based on basic rules?
      </p>

      <ul>
        <li>alice@example.com</li>
        <li>bob@@example.com</li>
        <li>@example.com</li>
        <li>carol.smith@company.co.in</li>
        <li>daniel@localhost</li>
      </ul>

      <p>
        Rules:
        <ul>
          <li>Exactly one @ symbol</li>
          <li>Characters before and after @</li>
          <li>Domain contains at least one dot</li>
        </ul>
      </p>

      <label for="${id}" class="form-label">
        Number of valid email addresses:
      </label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
