export default function ({ user, weight = 1 }) {
  return {
    id: "q_github_api_metadata",
    weight,

    question: `
You are vibe-coding a JavaScript utility that fetches metadata
about a GitHub repository using the GitHub REST API.

Write ONLY the body of a JavaScript function that:
- Fetches repository details for a given user and repo
- Returns an object containing:
  - created_at
  - default_branch
  - open_issues_count
- Gracefully handles:
  - GitHub API rate-limit errors
  - Non-existent repositories
- Does NOT expose any API tokens in code
- Uses fetch and return
- Has no console logs

Assume variables 'user' and 'repo' already exist.
`,

    answer: null,
  };
}
