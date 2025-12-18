import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-git-commit-analysis";
  const title = "Git: Repository History Analysis";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate git command sequence
  const authors = ["Alice", "Bob", "Charlie", "Diana"];
  const targetAuthor = authors[Math.floor(random() * authors.length)];

  const operations = [
    { type: "commit", author: targetAuthor, message: "Initial commit" },
    { type: "commit", author: authors[Math.floor(random() * authors.length)], message: "Add feature X" },
    { type: "commit", author: authors[Math.floor(random() * authors.length)], message: "Fix bug in module Y" },
    { type: "commit", author: targetAuthor, message: "Update documentation" },
    { type: "commit", author: authors[Math.floor(random() * authors.length)], message: "Refactor code" },
    { type: "commit", author: targetAuthor, message: "Add tests" },
    { type: "commit", author: authors[Math.floor(random() * authors.length)], message: "Improve performance" },
    { type: "commit", author: authors[Math.floor(random() * authors.length)], message: "Update dependencies" },
    { type: "commit", author: targetAuthor, message: "Fix merge conflict" },
    { type: "commit", author: authors[Math.floor(random() * authors.length)], message: "Add new feature" },
  ];

  const commitCount = operations.filter((op) => op.author === targetAuthor).length;

  const gitLog = operations
    .map((op, idx) => {
      const hash = Math.random().toString(36).substring(2, 9);
      const date = `2024-12-${String(Math.floor(random() * 28) + 1).padStart(2, "0")} ${
        String(Math.floor(random() * 24)).padStart(2, "0")
      }:${String(Math.floor(random() * 60)).padStart(2, "0")}`;
      return `commit ${hash}\nAuthor: ${op.author} <${op.author.toLowerCase()}@example.com>\nDate:   ${date}\n\n    ${op.message}\n`;
    })
    .join("\n");

  const answer = (input) => {
    const value = parseInt(input.trim());
    if (Number.isNaN(value)) {
      throw new Error("Please enter a valid integer count.");
    }
    if (value !== commitCount) {
      throw new Error(
        `Incorrect count. Use git log filtering to count commits by ${targetAuthor}. Try: git log --author="${targetAuthor}" --oneline | wc -l`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Git Repository Analysis</h2>
      <p>
        You're reviewing a project's git history to track individual contributions. Your manager wants to know how many
        commits were made by a specific team member.
      </p>

      <h3>Task</h3>
      <ol>
        <li>Review the git log output below (from <code>git log</code> command).</li>
        <li>Count how many commits were authored by <strong>${targetAuthor}</strong>.</li>
        <li>Enter the count below.</li>
      </ol>

      <p class="text-muted">
        In a real repository, you could use: <code>git log --author="${targetAuthor}" --oneline | wc -l</code>
      </p>

      <pre style="white-space: pre-wrap; max-height: 400px; overflow-y: auto; background: #f5f5f5; padding: 10px; font-family: monospace;"><code>
${gitLog}
      </code></pre>

      <label for="${id}" class="form-label">
        How many commits were made by ${targetAuthor}?
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. 5" required />
      <p class="text-muted">
        Look for lines starting with "Author:" and count those matching the target author's name.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Common git commands for analysis:

# Count commits by author
git log --author="AUTHOR_NAME" --oneline | wc -l

# Show commits by author with dates
git log --author="AUTHOR_NAME" --format="%h %ad %s" --date=short

# Get contributor statistics
git shortlog -sn --all

# View commit history
git log --oneline --graph --all

*/
