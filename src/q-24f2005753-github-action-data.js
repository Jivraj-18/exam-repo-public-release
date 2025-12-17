export default async function () {
  return {
    id: "24f2005753-gh-action-data",
    title: "Automated Data Validation with GitHub Actions",
    difficulty: 3,
    tags: ["github-actions", "automation", "data-validation"],

    description: `
A CSV dataset is updated daily in a repository.

Task:
Design a GitHub Action that:
1. Runs on every push
2. Checks for missing values
3. Fails the workflow if missing values exceed 5%
    `,

    questions: [
      {
        id: "workflow-logic",
        text: "Describe the logic used to validate the dataset in the GitHub Action.",
        type: "text",
      },
    ],
  };
}
