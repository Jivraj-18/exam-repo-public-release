import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1.5 }) {
  const id = "q-git-branch-merge";
  const title = "Git: Advanced Rebase and Conflict Resolution";

  const random = seedrandom(`${user.email}#${id}`);
  
  const feature = "auth-refactor";
  const conflictFile = "src/utils/auth.js";
  
  const answer = (input) => {
    const commands = input.toLowerCase().trim();
    
    // Check for rebase workflow commands
    const required = [
      "git checkout feature/auth-refactor",
      "git fetch origin",
      "git rebase origin/main",
      "git add src/utils/auth.js", // resolving conflict
      "git rebase --continue",
      "git push --force", // or force-with-lease
    ];
    
    let lastIndex = 0;
    for (const req of required) {
      // Allow some flexibility in command variations
      const parts = req.split(" ");
      const coreCommand = parts.slice(0, 2).join(" ");
      
      if (!commands.includes(coreCommand)) {
         throw new Error(`Missing command related to: "${req}"`);
      }
    }
    
    if (!commands.includes("--force") && !commands.includes("-f")) {
      throw new Error("Pushing a rebased branch requires force push");
    }
    
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Case Study: Clean History with Git Rebase</h2>
      <p>
        Your team enforces a <strong>linear commit history</strong> policy. Merge commits are discouraged for feature branches. 
        You have been working on a local branch <code>feature/${feature}</code> for a week.
      </p>
      
      <h3>Scenario</h3>
      <p>
        While you were working, the <code>main</code> branch has moved forward with 10 new commits from other developers. 
        You attempt to push your branch, but it's rejected because it's behind. Furthermore, you know that one of the 
        commits on main modified <code>${conflictFile}</code>, which you also modified, so there will be a merge conflict.
      </p>
      
      <h3>Task</h3>
      <p>
        Provide the sequence of Git commands to:
      </p>
      <ol>
        <li>Switch to your feature branch.</li>
        <li>Update your local knowledge of the remote repository.</li>
        <li><strong>Rebase</strong> your branch on top of the latest <code>origin/main</code>.</li>
        <li>Assume the rebase pauses due to a conflict in <code>${conflictFile}</code>. Show the command to mark the file as resolved after you've manually fixed the code.</li>
        <li>Continue the rebase process.</li>
        <li>Push your updated feature branch to the remote repository (note: history has changed).</li>
      </ol>
      
      <label for="${id}" class="form-label">
        Enter the Git command sequence:
      </label>
      <textarea 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        rows="8"
        placeholder="git checkout ...&#x0a;git fetch ...&#x0a;..."
        required
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
