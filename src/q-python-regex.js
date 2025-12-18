import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-regex";
  const title = "Data Cleaning: Regex Identification";

  const answer = (input) => {
    return input.trim() === "^\\d{3}-\\d{2}-\\d{4}$";
  };

  const question = html`
    <div class="mb-3">
      <p>You need to validate if a string matches the Social Security Number format: <code>123-45-6789</code> (3 digits, hyphen, 2 digits, hyphen, 4 digits).</p>
      <p>Select the correct Regular Expression pattern:</p>
      <ul>
         <li>A: <code>^\\d{3}-\\d{2}-\\d{4}$</code></li>
         <li>B: <code>^\\w{3}-\\w{2}-\\w{4}$</code></li>
         <li>C: <code>[0-9]-[0-9]-[0-9]</code></li>
      </ul>
      
      <label for="${id}" class="form-label">Enter the pattern exactly as shown (e.g., option A's code):</label>
      <input class="form-control" id="${id}" name="${id}" type="text" />
    </div>
  `;

  return { id, title, weight, question, answer };
}