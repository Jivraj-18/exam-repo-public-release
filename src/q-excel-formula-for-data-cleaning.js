import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-trim";
  const title = "Excel Text Cleaning";
  const answer = "=TRIM(A1)";
  
  const question = html`
    <div class="mb-3">
      <p>
        Cell A1 contains: <code>"  Product Name  "</code> with extra spaces.
        What Excel formula removes leading and trailing whitespace?
      </p>
      <label for="${id}" class="form-label">Excel Formula:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="=FUNCTION(A1)" />
      <small class="form-text text-muted">Include the = sign in your answer</small>
    </div>
  `;
  
  return { id, title, weight, question, answer };
}