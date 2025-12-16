import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-git-conflict-parser-24f2007692";
    const title = "Resolve Git Merge Conflict";
    const rng = seedrandom(`${user.email}#${id}`);

    // Randomize content
    const baseValue = Math.floor(rng() * 100);
    const currentChange = baseValue + 10;
    const incomingChange = baseValue + 20;
    const branchName = rng() > 0.5 ? "feature/login" : "fix/typo";

    // Construct conflict block
    const conflictText = `
function calculateTotal() {
<<<<<<< HEAD
    return ${currentChange};
=======
    return ${incomingChange};
>>>>>>> ${branchName}
}
`.trim();

    // Randomly ask for "Current Change" (HEAD) or "Incoming Change" (branch)
    const askForIncoming = rng() > 0.5;
    const target = askForIncoming ? incomingChange : currentChange;
    const versionType = askForIncoming ? `Incoming Change (from ${branchName})` : "Current Change (HEAD)";

    const question = html`
    <div class="mb-3">
      <p>A git merge conflict has occurred in <code>utils.js</code>:</p>
      <pre><code>${conflictText}</code></pre>
      <p>
        The team decides to accept the <strong>${versionType}</strong>.
        What is the final return value of this function?
      </p>
      <label for="${id}" class="form-label">Return Value:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" required>
    </div>
  `;

    const answer = (val) => Number(val) === target;

    return { id, title, weight, question, answer };
}
