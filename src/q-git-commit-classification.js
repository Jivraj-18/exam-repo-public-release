import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-git-commit-types";
  const title = "Classify Git Commit Messages";

  const random = seedrandom(`${user.email}#${id}`);
  const commits = [
    "fix login bug",
    "add README documentation",
    "refactor auth module",
    "update dependencies",
    "remove unused files",
  ];

  const expected = commits.map((msg) =>
    msg.startsWith("fix") ? "bugfix" :
    msg.startsWith("add") ? "feature" :
    msg.startsWith("refactor") ? "refactor" :
    "maintenance"
  );

  const answer = (input) => {
    const arr = JSON.parse(input);
    if (arr.length !== expected.length) throw new Error("Length mismatch");
    return arr.every((v, i) => v === expected[i]);
  };

  const question = html`
    <p>Classify each Git commit message into one of:</p>
    <ul>
      <li><code>bugfix</code></li>
      <li><code>feature</code></li>
      <li><code>refactor</code></li>
      <li><code>maintenance</code></li>
    </ul>
    <pre>${JSON.stringify(commits)}</pre>
    <label>Enter classifications as JSON array:</label>
    <input class="form-control" id="${id}" />
  `;

  return { id, title, weight, question, answer };
}
