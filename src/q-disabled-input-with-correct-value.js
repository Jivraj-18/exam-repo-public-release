import { html } from "https://cdn.jsdelivr.net/npmjsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-disabled-input";
  const title = "Disabled Input Inspection";

  const answer = "2048";

  const question = html`
    <div class="mb-3">
      <p>
        Visit:
        <code>https://sanand0.github.io/tdsdata/hackable/disabled_input.html</code>
      </p>
      <p>
        The page shows a calculator but the final result
        is written into a <strong>disabled input field</strong>.
      </p>
      <p>
        Inspect the DOM and read the <code>value</code> attribute
        of the disabled input.
      </p>
      <label for="${id}" class="form-label">Result:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
