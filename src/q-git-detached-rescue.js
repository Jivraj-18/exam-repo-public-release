import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1.5 }) {
  const id = "q-git-detached-rescue";
  const title = "Git Detached HEAD Rescue";
  const random = seedrandom(`${user.email}#${id}`);

  const branchName = "feature-save-" + Math.floor(random() * 100);

  const question = html`
    <p>You checked out a specific commit hash earlier and have been working in a <strong>detached HEAD</strong> state.</p>
    <p>You have made 3 commits that are not on any named branch.</p>
    <p>You want to create a new branch named <code>${branchName}</code> pointing to your current HEAD commit and switch to it immediately, preserving your work.</p>
    <p>Write the single standard Git command to do this.</p>
  `;

  return {
    id,
    title,
    question,
    // Syllabus mapping: Development Tools > Git
    check: (answer) => {
      const ans = String(answer).trim().replace(/\s+/g, ' ');
      // Valid answers: git checkout -b name, git switch -c name
      if (ans === `git checkout -b ${branchName}` || ans === `git switch -c ${branchName}`) return true;
      throw new Error("Incorrect. Use 'checkout -b' or 'switch -c'.");
    },
    weight,
  };
}
