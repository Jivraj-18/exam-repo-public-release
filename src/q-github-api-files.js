import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-api-files";
  const title = "GitHub API Repository Analysis";

  const random = seedrandom(`${user.email}#${id}`);

  // Personalized parameters
  const repos = [
    { owner: "microsoft", repo: "vscode", branch: "main" },
    { owner: "facebook", repo: "react", branch: "main" },
    { owner: "tensorflow", repo: "tensorflow", branch: "master" },
    { owner: "python", repo: "cpython", branch: "main" },
  ];

  const selectedRepo = repos[Math.floor(random() * repos.length)];
  const extensions = [".md", ".py", ".js", ".ts"];
  const selectedExt = extensions[Math.floor(random() * extensions.length)];

  const apiUrl = `https://api.github.com/repos/${selectedRepo.owner}/${selectedRepo.repo}/git/trees/${selectedRepo.branch}?recursive=1`;

  const answer = (input) => {
    const trimmed = input.trim();

    if (trimmed === apiUrl) {
      return true;
    }

    // Check common mistakes
    if (!trimmed.includes("recursive=1")) {
      throw new Error(
        "URL must include '?recursive=1' parameter to get all files in the tree."
      );
    }

    if (!trimmed.includes(selectedRepo.owner)) {
      throw new Error(
        `URL must include the correct owner: ${selectedRepo.owner}`
      );
    }

    if (!trimmed.includes(selectedRepo.repo)) {
      throw new Error(
        `URL must include the correct repository: ${selectedRepo.repo}`
      );
    }

    throw new Error(
      `Expected: ${apiUrl}. Make sure all parts of the URL are correct.`
    );
  };

  const question = html`
    <div class="mb-3">
      <h2><strong>Open Source Analytics for CodeMetrics</strong></h2>
      <p>
        <strong>CodeMetrics</strong> is a platform that provides insights into
        open-source projects by analyzing their repository structure, file
        types, and evolution over time. The platform helps developers understand
        project organization and make informed decisions about which projects to
        contribute to or learn from.
      </p>

      <h3>Your Task</h3>
      <p>
        You need to construct the correct GitHub API URL to retrieve the
        complete file tree for the following repository:
      </p>

      <ul>
        <li><strong>Owner:</strong> ${selectedRepo.owner}</li>
        <li><strong>Repository:</strong> ${selectedRepo.repo}</li>
        <li><strong>Branch:</strong> ${selectedRepo.branch}</li>
      </ul>

      <p>
        After retrieving the tree data, you will need to count all files with
        the <code>${selectedExt}</code> extension. However, for this question,
        you only need to provide the correct API URL.
      </p>

      <h3>Requirements</h3>
      <ul>
        <li>Use GitHub's Git Data API (trees endpoint)</li>
        <li>Include the <code>recursive=1</code> parameter to get all files</li>
        <li>Use the correct branch/SHA</li>
        <li>Format: <code>https://api.github.com/repos/{owner}/{repo}/git/trees/{sha}?recursive=1</code></li>
      </ul>

      <h3>Example</h3>
      <p>
        For <code>octocat/Hello-World</code> on branch <code>master</code>:
      </p>
      <pre><code>https://api.github.com/repos/octocat/Hello-World/git/trees/master?recursive=1</code></pre>

      <label for="${id}" class="form-label">
        Enter the complete API URL:
      </label>
      <input
        type="text"
        class="form-control font-monospace"
        id="${id}"
        name="${id}"
        placeholder="https://api.github.com/repos/..."
        required
      />
      <p class="text-muted">
        Target extension for analysis: <code>${selectedExt}</code><br />
        Your email: ${user.email}
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
