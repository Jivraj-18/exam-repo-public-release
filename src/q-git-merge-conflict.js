import { html } from "htl";

export default function ({ user, weight = 1 }) {
  const scenarios = [
    { file: "config.py", branch1: "feature-auth", branch2: "feature-db" },
    { file: "models.py", branch1: "dev-api", branch2: "dev-schema" },
    { file: "utils.js", branch1: "fix-logging", branch2: "fix-validation" },
  ];
  const scenario = scenarios[user.email.charCodeAt(0) % scenarios.length];

  return {
    id: "git-merge-conflict",
    weight,
    answer: html`
      <div>
        <h2>Git Merge Conflict Resolution</h2>
        <p>
          You are working on a team project and need to merge two branches:
          <strong>${scenario.branch1}</strong> and <strong>${scenario.branch2}</strong>.
          Both branches modified <code>${scenario.file}</code> in conflicting ways.
        </p>

        <h3>Task:</h3>
        <p>Describe the Git commands to:</p>
        <ol>
          <li>Switch to <code>${scenario.branch1}</code></li>
          <li>Merge <code>${scenario.branch2}</code></li>
          <li>Identify conflicted files</li>
          <li>Resolve conflicts (keep both changes)</li>
          <li>Complete the merge</li>
        </ol>

        <textarea
          id="git-merge-answer"
          rows="12"
          cols="80"
          placeholder="Write Git commands with brief explanations..."
          style="font-family: monospace; width: 100%; padding: 10px;"
        ></textarea>

        <details>
          <summary style="cursor: pointer; color: blue;">Reference Solution</summary>
          <pre style="background: #f5f5f5; padding: 10px;">
git checkout ${scenario.branch1}
git merge ${scenario.branch2}
git status                    # Shows conflicts
# Edit ${scenario.file} to resolve conflicts
git add ${scenario.file}
git commit -m "Merge ${scenario.branch2} into ${scenario.branch1}"
git log --oneline -3         # Verify merge
          </pre>
        </details>
      </div>
    `,
    validate: async () => {
      const answer = document.getElementById("git-merge-answer").value.trim();
      if (!answer) throw new Error("Please provide your answer");
      
      const required = ["git checkout", "git merge", "git status", "git add", "git commit"];
      const missing = required.filter(cmd => !answer.toLowerCase().includes(cmd));
      if (missing.length > 0) {
        throw new Error(`Missing commands: ${missing.join(", ")}`);
      }
      return { answer, scenario };
    },
  };
}
