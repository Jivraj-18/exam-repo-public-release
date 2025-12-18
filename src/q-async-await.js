import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-async-await";
  const title = "Async/Await Error Handling";

  const answer = "try { const data = await fetchData(); } catch (error) { console.error(error); }";

  const question = html`
    <div class="mb-3">
      <p>
        Write JavaScript code using <code>async/await</code> to call a function
        <code>fetchData()</code> and handle any errors using a
        <strong>try-catch</strong> block. Log the error to console if it occurs.
      </p>
      <label for="${id}" class="form-label">Code:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
