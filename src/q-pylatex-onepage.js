import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { getUserFromStrong } from "./utils/user.js";

const expect = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

export default async function ({ user, weight = 1 }) {
  const { email, rollNumber } = getUserFromStrong();
  const id = "q-pylatex-onepage";
  const title = "PyLaTeX: One-page Report Code (email + formula + chapter)";

  const question = html`
    <div class="mb-3">
      <h4>PyLaTeX Mini Report</h4>
      <p>You are logged in as <strong>${email}</strong> (roll: <strong>${rollNumber}</strong>).</p>
      <p>
        Write a short Python code snippet that uses <strong>PyLaTeX</strong> to generate a <strong>one-page</strong>
        report that includes:
      </p>
      <ol>
        <li>Your email: <code>${email}</code></li>
        <li>A mathematical formula (example: <code>E=mc^2</code> or <code>\\int_0^1 x^2 dx</code>)</li>
        <li>A chapter/section heading (e.g. <code>\\chapter{...}</code> or <code>\\section{...}</code>)</li>
      </ol>
      <p class="text-muted">
        Submit your Python code as plain text. We will only validate it by string checks.
      </p>
      <label class="form-label" for="${id}">Your PyLaTeX code</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="10"></textarea>
    </div>
  `;

  const answer = async (code) => {
    const text = String(code || "").trim();
    expect(text.length > 0, "Code is required");
    expect(text.includes(email), "Code must include your email exactly");

    // Formula heuristics: look for common LaTeX math markers or known formula tokens
    expect(
      /(\$[^$]+\$)|\\\(|\\\)|\\\[|\\\]|E\s*=\s*mc\^2|\\int|\\frac|\\sum|\\alpha|\\beta/.test(text),
      "Code must include at least one formula (LaTeX math or tokens like \\int / \\frac / $...$)",
    );

    // Chapter/section heading check (PyLaTeX users often use Section/Chapter classes too)
    expect(
      /(\\chapter\{)|(\\section\{)|\bChapter\b|\bSection\b|\b(chapter|section)\s*\(/i.test(text),
      "Code must include a chapter/section heading (e.g., \\chapter{...} or \\section{...})",
    );

    return true;
  };

  return { id, title, weight, question, answer };
}
