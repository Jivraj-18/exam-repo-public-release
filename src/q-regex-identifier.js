// Question 5: Regex for data validation
import { html } from "lit";

export default async function({ user, weight = 1 }) {
  const id = "q-regex-id";
  return {
    id,
    weight,
    question: html`
      <div class="mb-3">
        <h3><strong>Regex: Product Serial Validation</strong></h3>
        <p>Which regex validates: 3 uppercase letters, a hyphen, and 4 digits (e.g., ABC-1234)?</p>
        <select class="form-select" name="${id}">
          <option value="">Select an option</option>
          <option value="1">^[A-Z]{3}-\\d{4}$</option>
          <option value="2">[A-Z]*-1234</option>
          <option value="3">^\\w{3}-[0-9]{4}$</option>
          <option value="4">^[A-Z]3-[0-9]4$</option>
        </select>
      </div>
    `,
    answer: (formData) => formData.get(id) === "1"
  };
}