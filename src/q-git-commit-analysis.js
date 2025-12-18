import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-git-commit-analysis";
  const title = "Analyze Git Commit History";

  // deterministic RNG
  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  const authors = ["alice@example.com", "bob@example.com", "carol@example.com", "dave@example.com"];
  const fileTypes = [".js", ".py", ".md", ".json", ".css"];
  const actions = ["Added", "Modified", "Deleted"];

  // generate 25 commits
  const commits = Array.from({ length: 25 }, (_, i) => {
    const author = pick(authors);
    const date = `2025-12-${String(Math.floor(random() * 28) + 1).padStart(2, '0')}`;
    const numFiles = Math.floor(random() * 5) + 1;
    const files = Array.from({ length: numFiles }, () => {
      const action = pick(actions);
      const filename = `file${Math.floor(random() * 100)}${pick(fileTypes)}`;
      return `${action}: ${filename}`;
    });
    const message = `Commit ${i + 1}: ${pick(["Fix bug", "Add feature", "Update docs", "Refactor code"])}`;
    
    return {
      hash: Math.random().toString(36).substr(2, 7),
      author,
      date,
      message,
      files: files.join("; ")
    };
  });

  // find the author with most commits
  const authorCounts = {};
  commits.forEach(c => {
    authorCounts[c.author] = (authorCounts[c.author] || 0) + 1;
  });
  
  const topAuthor = Object.entries(authorCounts)
    .sort((a, b) => b[1] - a[1])[0][0];

  const commitLog = commits.map(c => 
    `commit ${c.hash}\nAuthor: ${c.author}\nDate: ${c.date}\n${c.message}\nFiles: ${c.files}\n`
  ).join("\n");

  const answer = (input) => {
    return input.trim().toLowerCase() === topAuthor.toLowerCase();
  };

  const question = html`
    <div class="mb-3">
      <p>
        You're analyzing a Git repository's commit history. Below are <strong>25 commits</strong>
        with author, date, message, and file changes.
      </p>
      <p>
        <strong>Task:</strong> Identify which author has made the <strong>most commits</strong>.
        Return their email address.
      </p>
      <pre style="white-space: pre-wrap; max-height: 400px; overflow-y: auto;"><code class="language-text">
${commitLog}
      </code></pre>
      <label for="${id}" class="form-label">
        Author with most commits (email):
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="author@example.com" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
