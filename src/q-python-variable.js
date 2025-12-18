import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-python-variable";
    const title = "Python Variable Assignment";

    const random = seedrandom(`${user.email}#${id}`);
    const varNames = ["x", "y", "score", "count", "total", "data"];
    const varName = varNames[Math.floor(random() * varNames.length)];
    const val = Math.floor(random() * 100);

    const answer = `${varName} = ${val}`;

    const question = html`
    <div class="mb-3">
      <p>Write a Python assignment statement to set the variable <code>${varName}</code> to the integer value <strong>${val}</strong>.</p>
      <p>Do not add spaces around the equals sign if not necessary, but standard style (<code>a = 1</code>) is preferred.</p>
      
      <label for="${id}" class="form-label">Answer</label>
      <input class="form-control" id="${id}" name="${id}" />
      <p class="text-muted">Format: <code>variable = value</code></p>
    </div>
  `;

    // Simple string match might fail on spaces. 
    // Let's make the answer check a bit more robust or assume standard formatting.
    // For the `answer` field, if it's a string, it usually checks strict equality.
    // To allow flexibility, we can pass a function.

    const validate = (submission) => {
        // Standardize spaces
        const clean = submission.replace(/\s*=\s*/, "=").trim();
        const expected = `${varName}=${val}`;
        if (clean !== expected) {
            throw new Error(`Expected '${varName} = ${val}'`);
        }
    };

    return { id, title, weight, question, answer: validate };
}
