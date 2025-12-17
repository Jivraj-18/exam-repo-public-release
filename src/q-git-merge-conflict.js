import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-git-merge-conflict";
  const title = "Git Merge Resolution";
  const random = seedrandom(`${user.email}#${id}`);

  const branch = "feature/analytics-" + Math.floor(random() * 100);

  const question = html`
    <p>You are merging the branch <code>${branch}</code> into <code>main</code>. Git stops with a "CONFLICT" message.</p>
    <p>You open the files, manually resolve the conflicts, and run <code>git add .</code> to stage the fixes.</p>
    <p>What is the standard git command to <strong>finalize</strong> this merge transaction and create the merge commit?</p>
    <p>Enter the full command (e.g., <code>git status</code>).</p>
  `;

  return {
    id,
    title,
    question,
    // Syllabus mapping: Development Tools > Git > Workflows
    check: (answer) => {
      const ans = String(answer).trim().toLowerCase().replace(/\s+/g, ' ');
      if (ans === "git commit" || ans === "git merge --continue") return true;
      throw new Error("Incorrect. After staging fixes, you typically 'commit' or 'merge --continue'.");
    },
    weight,
  };
}
