export default function ({ user, weight }) {
  const branch = "feature-x";

  return {
    id: "git-fix-wrong-branch",
    weight,

    question: `
You accidentally committed a change to the \`main\` branch locally.
You want to:

1. Create a new branch **${branch}** containing that commit
2. Reset \`main\` back by **one commit**
3. Keep the commit only on **${branch}**

Which command sequence does this correctly?

A)
git checkout -b ${branch}
git reset --hard HEAD~1

B)
git branch ${branch}
git checkout ${branch}

C)
git checkout -b ${branch}
git checkout main
git reset --hard HEAD~1

D)
git reset --soft HEAD~1
git checkout -b ${branch}
`,

    validate: (answer) => {
      if (!answer) return "Please choose A, B, C, or D";
      return answer.trim().toUpperCase() === "C"
        ? true
        : "Incorrect. Review how commits move with branches.";
    },
  };
}
