import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-rest-api-extraction";
  const title = "Extract Data from Public REST API";

  let expected;

  const answer = async (input) => {
    let parsed;
    try {
      parsed = JSON.parse(input);
    } catch {
      throw new Error("Invalid JSON");
    }

    if (!expected) {
      let page = 1;
      let repos = [];
      while (true) {
        const res = await fetch(
          `/proxy/https://api.github.com/users/torvalds/repos?per_page=100&page=${page}`
        );
        if (!res.ok) throw new Error("Failed to fetch repositories");
        const data = await res.json();
        if (data.length === 0) break;
        repos = repos.concat(data);
        page++;
      }

      const total_repositories = repos.length;

      const languageCount = {};
      let total_stars = 0;

      for (const repo of repos) {
        if (repo.language) {
          languageCount[repo.language] =
            (languageCount[repo.language] || 0) + 1;
        }
        total_stars += repo.stargazers_count || 0;
      }

      const primary_language =
        Object.entries(languageCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

      expected = {
        total_repositories,
        primary_language,
        total_stars,
      };
    }

    if (
      parsed.total_repositories !== expected.total_repositories ||
      parsed.primary_language !== expected.primary_language ||
      parsed.total_stars !== expected.total_stars
    ) {
      throw new Error("Incorrect answer");
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h3>DevMetrics - Open Source Analytics</h3>
      <p>
        DevMetrics analyzes open-source contributions to identify developer
        impact using public repository data.
      </p>
      <p>
        Using the GitHub REST API, fetch all public repositories for the user
        <code>torvalds</code> and compute the following:
      </p>
      <ol>
        <li>Total number of public repositories</li>
        <li>Most common primary language (by repository count)</li>
        <li>Total number of stars across all repositories</li>
      </ol>
      <p>
        Endpoint:
        <code>https://api.github.com/users/torvalds/repos</code>
      </p>
      <p>
        Return the result as a JSON object with keys
        <code>total_repositories</code>,
        <code>primary_language</code>, and
        <code>total_stars</code>.
      </p>
      <label for="${id}" class="form-label">JSON Result:</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="5"
        required
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
