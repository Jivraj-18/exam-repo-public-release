export default function ({ user, weight = 1 }) {
  return {
    id: "git_commit_count",

    weight,

    question: `
      Inside the cloned repository, run the following command:
      <pre>
      git rev-list --count HEAD
      </pre>

      What is the output?
    `,

    type: "number",
  };
}
