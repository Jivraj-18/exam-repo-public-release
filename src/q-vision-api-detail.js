import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vision-api-detail";
  const title = "OpenAI Vision API Detail Parameter";

  const answer = "low";

  const question = html`
    <div class="mb-3">
      <p>
        When sending images to OpenAI's Vision API (gpt-4o-mini), you can control
        the processing detail level to balance cost and accuracy. There are two options:
        one uses <strong>fewer tokens at lower detail</strong>, and another uses
        <strong>more tokens for higher detail</strong>.
      </p>
      <p>
        What is the value for the <code>detail</code> parameter that uses
        <strong>fewer tokens</strong> and costs less?
      </p>
      <label for="${id}" class="form-label">Detail value:</label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        placeholder="Enter the detail level value" 
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}

