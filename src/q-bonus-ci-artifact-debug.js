export default async function ({ user, weight = 1 }) {
  return {
    id: "ci-artifact-debug",
    question: `
You are given a GitHub repository with a GitHub Actions workflow.
The workflow completes successfully, but the expected build artifact is missing.

Your task:
1. Fork the repository.
2. Run the workflow.
3. Identify why the artifact is missing.
4. Fix the workflow.
5. Re-run it.

Submit the URL of the SUCCESSFUL workflow run
that clearly shows the uploaded artifact.
`,
    type: "string",
    answer: "https://github.com/",
    weight,
  };
}
