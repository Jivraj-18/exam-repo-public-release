import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-bash-line-count";
    const title = "Bash Command Line Counting";
    const random = seedrandom(`${user.email}#${id}`);

    const files = [
        { name: "data.txt", lines: Math.floor(random() * 50) + 10 },
        { name: "log.txt", lines: Math.floor(random() * 100) + 20 },
        { name: "script.sh", lines: Math.floor(random() * 30) + 5 },
        { name: "readme.md", lines: Math.floor(random() * 40) + 5 },
        { name: "notes.txt", lines: Math.floor(random() * 10) + 1 }
    ];

    const txtFiles = files.filter(f => f.name.endsWith(".txt"));
    const expectedCount = txtFiles.reduce((acc, f) => acc + f.lines, 0);

    const question = html`
    <div class="mb-3">
      <p>
        You are in a directory with the following files:
      </p>
      <ul>
        ${files.map(f => html`<li><code>${f.name}</code> (${f.lines} lines)</li>`)}
      </ul>
      <p>
        You run the command:
        <br>
        <code>cat *.txt | wc -l</code>
      </p>
      <p>
        What is the output number?
      </p>
      <label for="${id}" class="form-label">Output:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    const answer = (input) => {
        return Number(input) === expectedCount;
    };

    return { id, title, weight, question, answer };
}
