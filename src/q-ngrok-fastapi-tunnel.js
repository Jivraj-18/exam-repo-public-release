import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 2 }) {
  const id = "q-github-repo-stats";
  const title = "GitHub Repository Analytics";

  const random = seedrandom(`${user.email}#${id}`);

  // Popular open-source repositories
  const repos = [
    { owner: "pandas-dev", repo: "pandas" },
    { owner: "numpy", repo: "numpy" },
    { owner: "scikit-learn", repo: "scikit-learn" },
    { owner: "fastapi", repo: "fastapi" },
    { owner: "tiangolo", repo: "sqlmodel" },
    { owner: "streamlit", repo: "streamlit" },
    { owner: "plotly", repo: "plotly.py" },
    { owner: "pallets", repo: "flask" },
    { owner: "django", repo: "django" },
    { owner: "psf", repo: "requests" }
  ];

  const selectedRepo = repos[Math.floor(random() * repos.length)];
  const analysisTypes = ["contributors", "languages", "weekly_commits"];
  const analysisType = analysisTypes[Math.floor(random() * analysisTypes.length)];

  const answer = async (value) => {
    if (!value) throw new Error("Please enter your JSON result.");
    
    try {
      const result = JSON.parse(value);
      
      // Validate repository info
      if (!result.repository) {
        throw new Error("Missing 'repository' object");
      }
      if (result.repository.full_name !== `${selectedRepo.owner}/${selectedRepo.repo}`) {
        throw new Error(`Expected repository: ${selectedRepo.owner}/${selectedRepo.repo}`);
      }
      
      // Type-specific validation
      if (analysisType === "contributors") {
        if (!result.contributors || !Array.isArray(result.contributors)) {
          throw new Error("Missing 'contributors' array");
        }
        if (result.contributors.length < 10) {
          throw new Error("Expected at least 10 contributors");
        }
        if (result.total_contributions === undefined) {
          throw new Error("Missing 'total_contributions' field");
        }
        if (!result.top_contributor) {
          throw new Error("Missing 'top_contributor' field");
        }
        // Validate contributor structure
        for (const c of result.contributors.slice(0, 5)) {
          if (!c.login || c.contributions === undefined) {
            throw new Error("Each contributor needs 'login' and 'contributions'");
          }
        }
      } else if (analysisType === "languages") {
        if (!result.languages || typeof result.languages !== "object") {
          throw new Error("Missing 'languages' object");
        }
        if (Object.keys(result.languages).length < 2) {
          throw new Error("Expected at least 2 programming languages");
        }
        if (!result.primary_language) {
          throw new Error("Missing 'primary_language' field");
        }
        if (result.total_bytes === undefined) {
          throw new Error("Missing 'total_bytes' field");
        }
      } else if (analysisType === "weekly_commits") {
        if (!result.weekly_data || !Array.isArray(result.weekly_data)) {
          throw new Error("Missing 'weekly_data' array");
        }
        if (result.weekly_data.length < 10) {
          throw new Error("Expected at least 10 weeks of commit data");
        }
        if (result.total_commits === undefined) {
          throw new Error("Missing 'total_commits' field");
        }
        if (result.average_per_week === undefined) {
          throw new Error("Missing 'average_per_week' field");
        }
      }
      
      return true;
    } catch (e) {
      if (e.message.includes("Missing") || e.message.includes("Expected") || 
          e.message.includes("needs")) {
        throw e;
      }
      throw new Error("Submit valid JSON with repository and analysis data");
    }
  };

  const question = html`
    <div class="mb-3">
      <h2>RepoInsight: GitHub Repository Analytics</h2>
      
      <p>
        <strong>RepoInsight</strong> is an analytics platform that provides insights into open-source
        repositories. Companies use it to evaluate the health and activity of projects they depend on.
        The platform aggregates data from the GitHub API to generate comprehensive reports.
      </p>
      
      <p>
        GitHub provides a rich API for accessing repository metadata, contributor information,
        language breakdowns, and commit activity. However, accessing this data requires understanding
        rate limits and proper API usage.
      </p>
      
      <h3>Your Assignment</h3>
      <p>
        Analyze the <strong>${selectedRepo.owner}/${selectedRepo.repo}</strong> repository
        and extract <strong>${analysisType.replace(/_/g, " ")}</strong> data.
      </p>
      
      <table class="table table-sm">
        <tr><td><strong>Repository Owner</strong></td><td>${selectedRepo.owner}</td></tr>
        <tr><td><strong>Repository Name</strong></td><td>${selectedRepo.repo}</td></tr>
        <tr><td><strong>Full Name</strong></td><td><code>${selectedRepo.owner}/${selectedRepo.repo}</code></td></tr>
        <tr><td><strong>Analysis Type</strong></td><td><code>${analysisType}</code></td></tr>
      </table>
      
      <h3>API Endpoints</h3>
      <p>Base URL: <code>https://api.github.com</code></p>
      
      ${analysisType === "contributors" ? html`
        <ul>
          <li>Repository info: <code>GET /repos/{owner}/{repo}</code></li>
          <li>Contributors: <code>GET /repos/{owner}/{repo}/contributors?per_page=100</code></li>
        </ul>
        <h4>Required Output</h4>
        <pre class="bg-light p-2"><code>{
  "repository": {"full_name": "${selectedRepo.owner}/${selectedRepo.repo}", ...},
  "contributors": [{"login": "user1", "contributions": 1234}, ...],
  "total_contributions": 12345,
  "top_contributor": "user1"
}</code></pre>
      ` : analysisType === "languages" ? html`
        <ul>
          <li>Repository info: <code>GET /repos/{owner}/{repo}</code></li>
          <li>Languages: <code>GET /repos/{owner}/{repo}/languages</code></li>
        </ul>
        <h4>Required Output</h4>
        <pre class="bg-light p-2"><code>{
  "repository": {"full_name": "${selectedRepo.owner}/${selectedRepo.repo}", ...},
  "languages": {"Python": 1234567, "JavaScript": 234567, ...},
  "total_bytes": 1469134,
  "primary_language": "Python"
}</code></pre>
      ` : html`
        <ul>
          <li>Repository info: <code>GET /repos/{owner}/{repo}</code></li>
          <li>Commit activity: <code>GET /repos/{owner}/{repo}/stats/commit_activity</code></li>
        </ul>
        <h4>Required Output</h4>
        <pre class="bg-light p-2"><code>{
  "repository": {"full_name": "${selectedRepo.owner}/${selectedRepo.repo}", ...},
  "weekly_data": [{"week": 1702857600, "total": 45}, ...],
  "total_commits": 1234,
  "average_per_week": 23.7
}</code></pre>
      `}
      
      <h3>Rate Limiting</h3>
      <ul>
        <li><strong>Unauthenticated:</strong> 60 requests/hour</li>
        <li><strong>With Token:</strong> 5,000 requests/hour (use <code>GITHUB_TOKEN</code> env var)</li>
        <li><strong>Headers:</strong> Include <code>Accept: application/vnd.github+json</code></li>
      </ul>
      
      <h3>Notes</h3>
      <ul>
        <li>The stats/commit_activity endpoint may return 202 (calculating) - retry after a few seconds</li>
        <li>Include repository metadata (stars, forks, description) in your response</li>
        <li>Round percentages to 1 decimal place if calculating language percentages</li>
      </ul>
      
      <hr>
      
      <label for="${id}" class="form-label">Submit your JSON result:</label>
      <textarea 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        rows="8"
        required
        placeholder='{"repository": {...}, ...}'
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution:

# /// script
# requires-python = ">=3.12"
# dependencies = ["httpx"]
# ///

import httpx
import json
import os
import time

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")


def github_request(endpoint):
    """Make authenticated GitHub API request."""
    headers = {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
    }
    if GITHUB_TOKEN:
        headers["Authorization"] = f"Bearer {GITHUB_TOKEN}"
    
    url = f"https://api.github.com{endpoint}"
    response = httpx.get(url, headers=headers)
    
    # Log rate limit
    remaining = response.headers.get("X-RateLimit-Remaining", "?")
    print(f"  Rate limit remaining: {remaining}")
    
    response.raise_for_status()
    return response.json()


def get_repo_info(owner, repo):
    """Get basic repository information."""
    return github_request(f"/repos/{owner}/{repo}")


def analyze_contributors(owner, repo):
    """Analyze repository contributors."""
    contributors = github_request(f"/repos/{owner}/{repo}/contributors?per_page=100")
    
    total = sum(c["contributions"] for c in contributors)
    top = max(contributors, key=lambda c: c["contributions"])
    
    return {
        "contributors": [
            {"login": c["login"], "contributions": c["contributions"]}
            for c in contributors
        ],
        "total_contributions": total,
        "top_contributor": top["login"]
    }


def analyze_languages(owner, repo):
    """Analyze repository languages."""
    languages = github_request(f"/repos/{owner}/{repo}/languages")
    
    total = sum(languages.values())
    primary = max(languages, key=languages.get)
    
    return {
        "languages": languages,
        "total_bytes": total,
        "primary_language": primary
    }


def analyze_weekly_commits(owner, repo):
    """Analyze weekly commit activity."""
    # This endpoint may return 202 if stats are being calculated
    for attempt in range(3):
        response = github_request(f"/repos/{owner}/{repo}/stats/commit_activity")
        if response:
            break
        print("  Stats being calculated, waiting...")
        time.sleep(3)
    
    if not response:
        raise Exception("Could not fetch commit activity after retries")
    
    total = sum(w["total"] for w in response)
    avg = round(total / len(response), 1)
    
    return {
        "weekly_data": [{"week": w["week"], "total": w["total"]} for w in response],
        "total_commits": total,
        "average_per_week": avg
    }


def main(owner, repo, analysis_type):
    """Main solution function."""
    print(f"Analyzing {owner}/{repo}...")
    
    repo_info = get_repo_info(owner, repo)
    print(f"  Repository: {repo_info['full_name']}")
    print(f"  Stars: {repo_info['stargazers_count']}")
    
    print(f"\nPerforming {analysis_type} analysis...")
    
    if analysis_type == "contributors":
        analysis = analyze_contributors(owner, repo)
    elif analysis_type == "languages":
        analysis = analyze_languages(owner, repo)
    elif analysis_type == "weekly_commits":
        analysis = analyze_weekly_commits(owner, repo)
    else:
        raise ValueError(f"Unknown analysis type: {analysis_type}")
    
    result = {
        "repository": {
            "full_name": repo_info["full_name"],
            "description": repo_info["description"],
            "stars": repo_info["stargazers_count"],
            "forks": repo_info["forks_count"]
        },
        **analysis
    }
    
    print(f"\nSubmit this JSON:\n{json.dumps(result, indent=2)}")
    return result


if __name__ == "__main__":
    # Replace with your assigned values
    owner = "pandas-dev"
    repo = "pandas"
    analysis_type = "contributors"  # or languages, weekly_commits
    
    main(owner, repo, analysis_type)

*/
