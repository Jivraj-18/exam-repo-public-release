export default function ({ user, weight }) {
    return {
      id: "q-github-search",
      prompt: `
  GitHub API — Find Most-Starred Repo
  
  Use:  
  https://api.github.com/search/repositories?q=topic:python&sort=stars&order=desc
  
  Find the repository **full_name** of the top-starred Python-topic repo.
  
  What is the full_name?`,
      weight,
      check: (answer) =>
        answer.trim().toLowerCase() === "psf/requests",
    };
  }
  