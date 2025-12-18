export default function ({ user, weight = 1 }) {
  return {
    id: "github_actions_badge",
    weight,

    prompt: `
You want to show the status of a GitHub Actions workflow named \`ci.yml\`
in your repository README.

Which GitHub URL path segment is always included in the status badge image URL?
    `.trim(),

    answer: "actions/workflows",
  };
}
