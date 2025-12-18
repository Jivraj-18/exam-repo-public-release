export default function ({ weight = 1 }) {
  return {
    id: "github_python_repo_2024",
    title: "Most Starred Python Repo (2024)",
    description: `
Search GitHub repositories created in 2024.
Language: Python.
Sort by stars descending.
Return the repository URL.
`,
    answer: "https://github.com/...",
    weight,
  };
}
