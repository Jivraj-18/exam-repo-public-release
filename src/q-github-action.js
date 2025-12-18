export default function ({ user, weight = 1 }) {
  return {
    id: "github-action",
    weight,
    prompt: `
Create a GitHub Actions workflow where **one step name contains**:

${user.email}

Trigger the workflow and submit the **repository URL**.
    `,
    answerType: "url",
    validate: (url) => url.startsWith("https://github.com/"),
  };
}

