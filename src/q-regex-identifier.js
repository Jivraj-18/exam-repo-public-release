// Question 5: Regex for data validation
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function({ user, weight = 1 }) {
  const id = "q-regex-id";
  const question = html`
    <div class="mb-3">
      <h3><strong>Regex: Product Serial Validation</strong></h3>
      <p>A company uses serial numbers that must follow this specific pattern:
        <ul>
          <li>Start with exactly three uppercase letters (A-Z).</li>
          <li>Followed by a hyphen (<code>-</code>).</li>
          <li>Ending with four digits (0-9).</li>
        </ul>
        Example: <code>ABC-1234</code>
      </p>
      <p>Which regular expression correctly validates this entire string?</p>
      
      <select class="form-select" name="${id}">
        <option value="">Select an option</option>
        <option value="1">^[A-Z]{3}-\d{4}$</option>
        <option value="2">[A-Z]*-1234</option>
        <option value="3">^\w{3}-[0-9]{4}$</option>
        <option value="4">^[A-Z]3-[0-9]4$</option>
      </select>
    </div>
  `;

  return {
    id,
    weight,
    question,
    answer: (formData) => formData.get(id) === "1"
  };
}