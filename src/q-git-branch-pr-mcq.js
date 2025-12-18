export default {
  id: "git-branch-pr-mcq",
  title: "Git branch and PR workflow",
  description: `
You want to add new questions to an exam repository and open a pull request.

Which of the following sequences of commands is correct?
`,
  options: [
    'git add . && git commit -m "msg" && git push origin main',
    'git checkout -b exam-ROLL && git add . && git commit -m "msg" && git push origin exam-ROLL',
    'git branch exam-ROLL && git push origin exam-ROLL && git commit -m "msg"',
    'git push -u origin exam-ROLL && git add . && git commit -m "msg"'
  ],
  correctIndex: 1,
  explanation: `
The correct workflow is:

- Create and switch to a new branch: \`git checkout -b exam-ROLL\`
- Stage and commit changes.
- Push the new branch: \`git push origin exam-ROLL\`
Then open a pull request from that branch on GitHub.
`
};
