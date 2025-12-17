import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default {
  // Basic exam metadata
  title: "TDS 2025 Sep – Bonus Activity (Custom Exam)",
  start: "2025-12-01T00:00:00+05:30",
  hours: 1.0,

  // Access control
  admin: (email) => email === "admin@example.com",
  allowed: (email) => email.endsWith(".edu") || email.endsWith(".ac.in"),

  // Instructions shown before exam starts
  instructions: html`
    <h1>Instructions</h1>

    <ol>
      <li>
        This bonus activity evaluates your practical understanding of
        <strong>Tools in Data Science</strong>.
      </li>

      <li>
        The exam consists of <strong>5 independent questions</strong>
        covering JSON processing, Excel formulas, Python-style analytics,
        web scraping logic, and image optimization.
      </li>

      <li>
        You may use <strong>any resources</strong>:
        Internet, documentation, ChatGPT, notes, or friends.
      </li>

      <li>
        Each question is <strong>deterministic per user</strong>.
        Do not refresh unless necessary.
      </li>

      <li>
        Enter answers carefully. Numeric answers should follow the
        rounding rules mentioned in the question.
      </li>

      <li>
        Your responses are <strong>auto-graded</strong>.
        Partial answers may not receive credit.
      </li>
    </ol>

    <p class="text-muted">
      Tip: Read each question fully before attempting it.
    </p>
  `,
};
