import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "git-blame-command";
  const title = "Identify the Author of a Code Line";

  const question = html`
    <div>
      <h3>Git Blame: Identify the Author</h3>

      <p>
        You are part of a development team working on a critical project. A bug has been reported in the file <code>utils.js</code>, and it is causing unexpected behavior in production. After debugging, you have pinpointed the issue to line 42 of the file.
      </p>

      <p>
        Your task is to identify the author who last modified this specific line of code. Use the appropriate <code>git blame</code> command to find out who made the change.
      </p>

      <p>
        <strong>Resources:</strong>
        <ul>
          <li><a href="https://git-scm.com/docs/git-blame" target="_blank">Git Blame Documentation</a></li>
          <li><a href="https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection" target="_blank">Git Revision Selection</a></li>
        </ul>
      </p>

      <label for="${id}" class="form-label">
        Enter your command:
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="text"
        placeholder="e.g., git blame -L 42,42 utils.js"
        required
      />
    </div>
  `;

  const answer = async (response) => {
    console.log("DEBUG: full response =", response);

    const cmd = response;
    console.log("DEBUG: extracted cmd =", cmd);

    if (!cmd || typeof cmd !== "string") {
      throw new Error("No command received.");
    }

    const trimmed = cmd.trim();
    console.log("DEBUG: trimmed cmd =", trimmed);

    const isGitBlame = /^git\s+blame\b/.test(cmd);
    const hasFile = /\butils\.js\b/.test(cmd);
    const hasLine =
      /-L\s*42\s*,\s*42/.test(cmd) || /-L42,42/.test(cmd);

    if (!isGitBlame || !hasFile || !hasLine) {
      throw new Error(
        "Incorrect command. Use git blame to target line 42 of utils.js."
      );
    }

    return true;
  };

  return { id, title, weight, question, answer };
}

