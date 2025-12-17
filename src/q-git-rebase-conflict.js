import { html } from "./utils/display.js";

export default function ({ user, weight = 1 }) {
  const id = "q-git-rebase-conflict";
  
  return {
    id,
    weight,
    question: html`
      <h3>Git Rebase Conflict Resolution</h3>
      <p>You're rebasing your feature branch onto main and encounter a merge conflict in <code>app.py</code>. After manually fixing the conflict in the file, what's the correct sequence of commands?</p>
    `,
    type: "multiple-choice",
    options: [
      {
        value: "a",
        label: html`<code>git add app.py → git commit -m "fix conflict" → git rebase --continue</code>`,
      },
      {
        value: "b",
        label: html`<code>git add app.py → git rebase --continue</code>`,
      },
      {
        value: "c",
        label: html`<code>git commit app.py → git rebase --skip</code>`,
      },
      {
        value: "d",
        label: html`<code>git rebase --abort → git merge main</code>`,
      },
    ],
    answer: "b",
  };
}
