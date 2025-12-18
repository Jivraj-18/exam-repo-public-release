import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default function ({ user, weight }) {
  const id = "q-git-hash";
  const title = "Git Log Analysis";
  const rng = seedrandom(user.email + id);

  const messages = [
    "Initial commit",
    "Fix bug in login",
    "Update documentation",
    "Add new feature",
    "Refactor database connection",
    "Merge pull request #42",
    "Update dependencies",
    "Fix typo in README",
  ];

  const targetMessage = "Fix critical security vulnerability";
  const targetHash = Math.floor(rng() * 0xffffff).toString(16).padStart(7, '0');

  const allMessages = [...messages];
  const insertIdx = Math.floor(rng() * (messages.length + 1));
  allMessages.splice(insertIdx, 0, targetMessage);

  const logLines = allMessages.map((msg) => {
    const hash = msg === targetMessage ? targetHash : Math.floor(rng() * 0xffffff).toString(16).padStart(7, '0');
    return `* ${hash} ${msg}`;
  });

  const question = html`
    <div>
      <h3>${title}</h3>
      <p>Find the <strong>short commit hash</strong> for the commit with the message: <code>"${targetMessage}"</code>.</p>
      <pre class="overflow-auto" style="max-height: 200px; background: #f8f9fa; padding: 10px;">${logLines.join("\n")}</pre>
      <label>Commit Hash:</label>
      <input type="text" name="${id}" placeholder="e.g. a1b2c3d" />
    </div>
  `;

  return {
    id,
    title,
    weight,
    question,
    answer: (answer) => answer.trim() === targetHash,
  };
}
