import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function ({ user, weight = 1 }) {
  return {
    id: "q-git-stash-untracked",
    type: "input",
    weight,
    question: html`
      <p>
        <strong>Scenario:</strong> You are working on a feature and have created several 
        <strong>new files</strong> that are not yet tracked by Git. 
        You suddenly need to switch branches to fix a bug. 
        <br><br>
        Which specific flag should you add to <code>git stash</code> to ensure the 
        <strong>untracked</strong> (new) files are also stashed?
      </p>
    `,
    answer: "-u", 
    check: (response) => {
      const clean = response.trim().toLowerCase();
      return clean === "-u" || clean === "--include-untracked" || clean === "git stash -u";
    },
  };
}