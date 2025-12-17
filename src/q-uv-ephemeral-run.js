import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-uv-ephemeral-run";
  const title = "UV Ephemeral Script Execution";
  const random = seedrandom(`${user.email}#${id}`);

  const pkg = ["pandas", "requests", "numpy"][Math.floor(random() * 3)];
  const script = "process_data.py";

  const question = html`
    <p>You are using the modern Python tool <strong>uv</strong>.</p>
    <p>You have a script <code>${script}</code> that requires the library <code>${pkg}</code>, but you do not want to create a virtual environment or install the package globally.</p>
    <p>Complete the command to run the script with this dependency ephemerally:</p>
    <pre><code>uv run [FILL_IN_HERE] ${pkg} ${script}</code></pre>
    <p>Enter the missing flag (e.g., <code>--flag</code>).</p>
  `;

  return {
    id,
    title,
    question,
    // Syllabus mapping: Development Tools > Python > uv
    check: (answer) => {
      const ans = String(answer).trim();
      if (ans === "--with") return true;
      throw new Error("Incorrect. Use the '--with' flag to specify ephemeral dependencies.");
    },
    weight,
  };
}
