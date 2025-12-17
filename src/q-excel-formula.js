import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

// Question 3: Excel Formula
export async function question3({ user, weight = 1 }) {
  const id = "q-excel-variance";
  const title = "Excel Statistical Function";

  const answer = "VAR.S";

  const question = html`
    <div class="mb-3">
      <p>
        In Excel (Office 365), which function calculates the <strong>sample variance</strong>
        using the N-1 denominator (Bessel's correction)?
      </p>
      <p>
        <em>Hint: Sample variance provides an unbiased estimate of population variance.</em>
      </p>
      <label for="${id}" class="form-label">Function name:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., AVERAGE" />
    </div>
  `;

  return { id, title, weight, question, answer };
}