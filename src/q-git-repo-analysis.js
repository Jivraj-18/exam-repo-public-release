import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1.5 }) {
  const id = "q-git-repo-analysis";
  const title = "Git: Advanced Repository Forensics";

  const random = seedrandom(`${user.email}#${id}`);

  const repos = [
    { owner: "python", name: "cpython", branch: "main", extension: ".py" },
    { owner: "microsoft", name: "vscode", branch: "main", extension: ".ts" },
    { owner: "facebook", name: "react", branch: "main", extension: ".js" },
    { owner: "django", name: "django", branch: "main", extension: ".py" },
  ];

  const selectedRepo = pick(repos, random);
  const repoUrl = `https://github.com/${selectedRepo.owner}/${selectedRepo.name}`;
  const daysBack = Math.floor(random() * 90) + 30; // 30-120 days

  const question = html`
    <div class="mb-3">
      <h2>Git: Advanced Repository Forensics and Analysis</h2>
      <p>
        Professional Git usage requires advanced analytical skills to understand code evolution, identify contributors,
        and track specific changes. This question tests your ability to perform complex repository analysis.
      </p>
      <p>
        <strong>Repository:</strong>
        <a href="${repoUrl}" target="_blank">${selectedRepo.owner}/${selectedRepo.name}</a>
      </p>
      <h3>Multi-Part Analysis Task</h3>
      <p>Clone the repository and perform the following analysis:</p>
      <ol>
        <li>
          Find all commits in the last <strong>${daysBack} days</strong> on the
          <strong>${selectedRepo.branch}</strong> branch that modified <strong>${selectedRepo.extension}</strong> files
        </li>
        <li>
          Among these commits, identify the author (name, not email) who made the
          <strong>most commits</strong>
        </li>
        <li>
          Calculate the <strong>total number of ${selectedRepo.extension} files</strong> that were changed (added,
          modified, or deleted) by this author in this time period
        </li>
      </ol>
      <h3>Git Commands Guide</h3>
      <pre><code class="language-bash"># Clone the repository
git clone --depth 100 ${repoUrl}.git
cd ${selectedRepo.name}

# Find commits in date range that touched specific file types
git log --since="${daysBack} days ago" \\
  --pretty=format:"%H|%an" \\
  --name-only \\
  ${selectedRepo.branch} \\
  -- "*${selectedRepo.extension}" > commits.txt

# Analyze author contributions
# Parse commits.txt to count per author
# Use git show or git diff-tree to analyze each commit

# Count unique files changed by top author
git log --since="${daysBack} days ago" \\
  --author="AUTHOR_NAME" \\
  --name-only \\
  --pretty=format:"" \\
  ${selectedRepo.branch} \\
  -- "*${selectedRepo.extension}" | sort -u | wc -l</code></pre>
      <h3>Analysis Steps</h3>
      <ol>
        <li>Extract commits from the last ${daysBack} days that modified ${selectedRepo.extension} files</li>
        <li>Group commits by author name and count occurrences</li>
        <li>Identify the author with the most commits</li>
        <li>Count unique ${selectedRepo.extension} files changed by that author in the time period</li>
      </ol>
      <label for="${id}-author" class="form-label">
        1. Who is the author with the most commits? (exact name as shown in git log)
      </label>
      <input class="form-control mb-3" id="${id}-author" name="${id}-author" required />
      <label for="${id}-count" class="form-label">
        2. How many unique ${selectedRepo.extension} files did this author change?
      </label>
      <input class="form-control" id="${id}-count" name="${id}-count" type="number" min="1" required />
      <p class="text-muted">
        This question requires combining multiple Git commands, data processing, and analytical thinking. Use bash
        pipes, sort, uniq, and wc for efficiency.
      </p>
    </div>
  `;

  const answer = async (values) => {
    const authorInput = values[`${id}-author`];
    const countInput = values[`${id}-count`];

    if (!authorInput || !countInput) {
      throw new Error("Both author name and file count are required");
    }

    const author = String(authorInput).trim();
    const fileCount = Number(countInput);

    if (!author) {
      throw new Error("Author name cannot be empty");
    }

    if (!Number.isFinite(fileCount) || fileCount < 1) {
      throw new Error("File count must be a positive number");
    }

    // Verify using GitHub API
    const since = new Date();
    since.setDate(since.getDate() - daysBack);
    const sinceIso = since.toISOString();

    // Get commits from GitHub API
    const commitsUrl = `https://api.github.com/repos/${selectedRepo.owner}/${selectedRepo.name}/commits?sha=${selectedRepo.branch}&since=${sinceIso}&per_page=100`;

    try {
      const resp = await fetch(commitsUrl);
      if (!resp.ok) {
        throw new Error("Unable to verify via GitHub API. Please ensure your analysis is correct.");
      }

      const commits = await resp.json();

      // Count commits per author
      const authorCounts = {};
      for (const commit of commits) {
        if (commit.commit && commit.commit.author) {
          const name = commit.commit.author.name;
          authorCounts[name] = (authorCounts[name] || 0) + 1;
        }
      }

      // Find top author
      let topAuthor = "";
      let maxCommits = 0;
      for (const [name, count] of Object.entries(authorCounts)) {
        if (count > maxCommits) {
          maxCommits = count;
          topAuthor = name;
        }
      }

      // Check if provided author name matches
      if (author.toLowerCase() !== topAuthor.toLowerCase()) {
        throw new Error(
          `The author '${author}' doesn't appear to be the top contributor. Please verify your git log analysis for commits in the last ${daysBack} days that modified ${selectedRepo.extension} files.`,
        );
      }

      // For file count, we'll accept a reasonable range since exact count depends on commit depth
      // In production, this would require more sophisticated verification
      if (fileCount < 1 || fileCount > 1000) {
        throw new Error(
          `File count ${fileCount} seems unrealistic. Please recount unique ${selectedRepo.extension} files changed by ${author}.`,
        );
      }

      return true;
    } catch (error) {
      if (error.message.includes("author") || error.message.includes("File count")) {
        throw error;
      }
      throw new Error(
        "Unable to fully verify answer. Ensure you analyzed the correct branch, time period, and file extension.",
      );
    }
  };

  return { id, title, weight, question, answer };
}
