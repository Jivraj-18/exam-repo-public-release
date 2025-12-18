import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pdf-conditional-sum";
  const title = "PDF Table Extraction with Multi-Condition Filter";

  const answer = "1846";

  const question = html`
    <div class="mb-3">
      <p>
        Download the PDF from:
        <br />
        <a href="https://sanand0.github.io/tdsdata/student_marks_v2.pdf" target="_blank">
          student_marks_v2.pdf
        </a>
      </p>
      <p>
        The PDF contains a table with columns:
        <strong>Group, Maths, Physics, Chemistry, English</strong>.
      </p>
      <p>
        Compute the <strong>total English marks</strong> for students who:
      </p>
      <ul>
        <li>Belong to groups <strong>15–42 (inclusive)</strong></li>
        <li>Scored <strong>≥ 85 in Physics</strong></li>
        <li>Scored <strong>&lt; 90 in Maths</strong></li>
      </ul>
      <label for="${id}" class="form-label">
        Total English marks:
      </label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
