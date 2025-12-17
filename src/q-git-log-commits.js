import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-log-commits";
  const title = "Git: Count Commits by Author";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate sample git log data
  const authors = [
    "alice@example.com",
    "bob@example.com",
    "charlie@example.com",
    "diana@example.com",
    "eve@example.com",
  ];

  const messages = [
    "Fix bug in parser",
    "Add new feature",
    "Update documentation",
    "Refactor code",
    "Improve performance",
    "Add unit tests",
    "Fix typo",
    "Update dependencies",
    "Add logging",
    "Fix security issue",
    "Optimize query",
    "Add validation",
    "Clean up code",
    "Fix edge case",
    "Add error handling",
  ];

  // Generate random commits
  const numCommits = 30 + Math.floor(random() * 20);
  const commits = [];
  const authorCounts = {};

  for (let i = 0; i < numCommits; i++) {
    const author = authors[Math.floor(random() * authors.length)];
    const message = messages[Math.floor(random() * messages.length)];
    const hash = Array.from({ length: 7 }, () => "0123456789abcdef"[Math.floor(random() * 16)]).join("");

    commits.push({ hash, author, message });
    authorCounts[author] = (authorCounts[author] || 0) + 1;
  }

  // Pick a random author to ask about
  const targetAuthor = authors[Math.floor(random() * authors.length)];
  const expectedCount = authorCounts[targetAuthor] || 0;

  // Generate the git log output format
  const gitLogOutput = commits.map((c) => `${c.hash} ${c.author} ${c.message}`).join("\n");

  const question = html`
    <div class="mb-3">
      <h4>Git Log Analysis</h4>
      <p>
        You are analyzing a Git repository's commit history. The following is the output of
        <code>git log --format="%h %ae %s"</code> showing the short hash, author email, and commit message:
      </p>
      <pre
        style="max-height: 300px; overflow-y: auto; background: #f5f5f5; padding: 10px; font-size: 12px;"
      ><code>${gitLogOutput}</code></pre>

      <p>
        <strong>Task:</strong> Using command-line tools (like <code>grep</code>, <code>wc</code>, or
        <code>awk</code>), count how many commits were made by <strong>${targetAuthor}</strong>.
      </p>

      <p><strong>Hint:</strong> You can pipe the output through <code>grep</code> and <code>wc -l</code></p>

      <label for="${id}" class="form-label">
        How many commits were made by <code>${targetAuthor}</code>?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

  const answer = (input) => {
    if (!input || input.trim() === "") throw new Error("Answer is required");

    const userAnswer = parseInt(input, 10);
    if (isNaN(userAnswer)) throw new Error("Please enter a valid number");

    if (userAnswer !== expectedCount) {
      throw new Error(`Incorrect. Expected ${expectedCount} commits by ${targetAuthor}`);
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
