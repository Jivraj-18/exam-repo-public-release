import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-git-merge-conflict";
    const title = "Resolve a Git Merge Conflict";

    const random = seedrandom(`${user.email}#${id}`);
    const pick = (arr) => arr[Math.floor(random() * arr.length)];
    const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;

    const topics = ["function", "class", "variable", "constant", "module"];
    const actions = ["update", "delete", "rename", "refactor", "optimize"];
    const topic = pick(topics);
    const action = pick(actions);

    // Generate random content lines
    const headContent = `${action} ${topic} in HEAD branch (Line ${randInt(10, 99)})`;
    const incomingContent = `${action} ${topic} in feature branch (Line ${randInt(10, 99)})`;

    // Randomly decide which one is expected
    const expectIncoming = random() > 0.5;
    const expectedContent = expectIncoming ? incomingContent : headContent;
    const targetBranchName = expectIncoming ? "the incoming feature branch" : "the current HEAD branch";

    const conflictBlock = `<<<<<<< HEAD
${headContent}
=======
${incomingContent}
>>>>>>> feature-branch`;

    const question = html`
    <div class="mb-3">
      <p>
        You are resolving a merge conflict in a file. The conflict block is shown below.
        Identify and extract the content that comes from <strong>${targetBranchName}</strong>.
      </p>
      <pre style="white-space: pre-wrap"><code>
${conflictBlock}
      </code></pre>
      <label for="${id}" class="form-label">Content from ${targetBranchName}:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    const answer = (input) => {
        if (input.trim() !== expectedContent.trim()) {
            throw new Error(`Incorrect. Expected: "${expectedContent}"`);
        }
        return true;
    };

    return { id, title, weight, question, answer };
}
