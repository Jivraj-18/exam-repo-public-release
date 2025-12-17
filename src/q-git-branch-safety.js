export default function ({ user, weight = 1 }) {
  return {
    id: "git_branch_safety",
    type: "mcq",
    weight,
    question: `
You want to update your local repository with changes from a remote branch,
but do NOT want to merge them yet.

Which Git command should you use?
    `,
    options: [
      "git pull",
      "git fetch",
      "git merge",
      "git commit"
    ],
    answer: 1
  };
}
