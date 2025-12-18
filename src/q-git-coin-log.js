import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-git-coin-log";
    const title = "Git: Find Commit Hash";

    const random = seedrandom(`${user.email}#${id}`);

    const authors = ["Alice", "Bob", "Charlie", "Dave", "Eve"];
    const actions = ["Added", "Modified", "Deleted", "Fixed"];
    const files = ["coin.c", "README.md", "main.py", "styles.css", "utils.js"];

    const generateHash = () => Math.floor(random() * 0xffffff).toString(16).padStart(6, '0');

    const commits = Array.from({ length: 20 }, () => ({
        hash: generateHash(),
        author: authors[Math.floor(random() * authors.length)],
        date: new Date(Date.now() - Math.floor(random() * 10000000000)).toISOString().split('T')[0],
        message: `${actions[Math.floor(random() * actions.length)]} ${files[Math.floor(random() * files.length)]}`
    }));

    // Ensure there is at least one target to find
    const targetAuthor = authors[Math.floor(random() * authors.length)];
    const targetFile = files[Math.floor(random() * files.length)];
    const targetAction = "Added";

    // Insert the target commit at a random position if not present, or pick one that matches
    let targetCommit = commits.find(c => c.author === targetAuthor && c.message.includes(targetFile) && c.message.includes(targetAction));

    if (!targetCommit) {
        targetCommit = {
            hash: generateHash(),
            author: targetAuthor,
            date: "2025-01-15",
            message: `${targetAction} ${targetFile}`
        };
        const insertIdx = Math.floor(random() * commits.length);
        commits.splice(insertIdx, 0, targetCommit);
    }

    const answer = targetCommit.hash;

    const question = html`
    <div class="mb-3">
      <p>
        Below is the output of <code>git log --oneline</code> for a repository.
      </p>
      <p>
        <strong>Question:</strong> What is the <strong>short commit hash</strong> (6 characters) where 
        <strong>${targetAuthor}</strong> committed with the message containing "<strong>${targetAction} ${targetFile}</strong>"?
      </p>

      <pre style="background: #2d2d2d; color: #ccc; padding: 10px; border-radius: 5px;"><code>${commits.map(c => `${c.hash} ${c.message} (${c.author}, ${c.date})`).join("\n")}</code></pre>

      <label for="${id}" class="form-label">Commit Hash:</label>
      <input type="text" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
