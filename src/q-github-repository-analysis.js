import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-github-repo-analysis";
  const title = "GitHub Repository Language Analysis";

  const random = seedrandom(`${user.email}#${id}`);
  
  // Generate random GitHub username and repo
  const testRepos = [
    { user: "torvalds", repo: "linux", lang: "C" },
    { user: "facebook", repo: "react", lang: "JavaScript" },
    { user: "microsoft", repo: "vscode", lang: "TypeScript" },
    { user: "python", repo: "cpython", lang: "Python" },
    { user: "rails", repo: "rails", lang: "Ruby" }
  ];
  
  const selected = testRepos[Math.floor(random() * testRepos.length)];
  const minStars = 1000 + Math.floor(random() * 9000);

  const answer = async (response) => {
    try {
      const trimmed = response.trim();
      
      // Validate it's a valid language name
      if (!trimmed || trimmed.length < 1) {
        throw new Error("Please provide a programming language name");
      }

      // Check if the answer matches expected pattern
      const normalized = trimmed.toLowerCase();
      const expectedLang = selected.lang.toLowerCase();
      
      if (!normalized.includes(expectedLang)) {
        throw new Error(
          `The primary language should be ${selected.lang}. Check the GitHub API response for ${selected.user}/${selected.repo}`
        );
      }

      return true;
    } catch (error) {
      throw new Error(`Validation failed: ${error.message}`);
    }
  };

  const question = html`
    <div class="mb-3">
      <h2>GitHub Repository Language Analysis</h2>
      <p>
        <strong>RepoInsights Inc</strong> needs to analyze programming language trends across popular open-source projects.
        Your task is to use the GitHub API to determine the primary programming language used in a specific repository.
      </p>

      <h3>Business Context</h3>
      <p>
        The company is building a technology stack recommendation engine. They need to identify the primary programming
        language used in successful repositories (${minStars}+ stars) to provide insights to their clients about
        popular technology choices.
      </p>

      <h3>Your Task</h3>
      <p>Use the GitHub API to find the primary programming language of the repository:</p>
      <p>
        <strong>${selected.user}/${selected.repo}</strong>
      </p>

      <h3>Requirements</h3>
      <ol>
        <li>Use the GitHub API endpoint: <code>https://api.github.com/repos/${selected.user}/${selected.repo}</code></li>
        <li>Parse the JSON response to find the <code>language</code> field</li>
        <li>Verify the repository has at least ${minStars} stars</li>
        <li>Submit the primary programming language name</li>
      </ol>

      <h3>Hints</h3>
      <ul>
        <li>You can use <code>curl</code>, <code>httpie</code>, or any HTTP client</li>
        <li>No authentication required for public repositories</li>
        <li>The response is in JSON format</li>
        <li>Use <code>jq</code> or similar tools to parse JSON in terminal</li>
      </ul>

      <label for="${id}" class="form-label">
        What is the primary programming language of ${selected.user}/${selected.repo}?
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        required
        placeholder="e.g., Python, JavaScript, C++"
      />
      <p class="text-muted">
        Enter just the language name (case-insensitive). Example: "Python" or "JavaScript"
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}