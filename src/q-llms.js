import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 3 }) {
  const id = "q-llms-evil";
  const title = "The Map Is Not the Website";

  const answer = "curation";

  const question = html`
    <div class="mb-3">
      <p>
        An <code>llms.txt</code> file that lists
        <em>everything</em> is worse than useless.
        <br /><br />
        What single design principle
        makes llms.txt powerful —
        turning chaos into signal
        for AI agents?
      </p>
      <label for="${id}" class="form-label">Principle:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
