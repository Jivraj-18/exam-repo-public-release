import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-git-rebase-squash";
    const title = "Git Rebase Interactive";

    const random = seedrandom(`${user.email}#${id}`);

    // We ask the user: "To squash these 3 commits into the first one, which command list is correct?"
    // Options: 
    // 1. pick, squash, squash
    // 2. pick, pick, pick
    // 3. squash, squash, squash

    const expected = "pick, squash, squash";

    const answer = (input) => {
        // Normalize: remove spaces, lowercase
        const parts = input.toLowerCase().split(",").map(s => s.trim());
        if (parts.length !== 3) return false;

        // First must be pick
        if (parts[0] !== "pick" && parts[0] !== "p") return false;

        // 2nd and 3rd must be squash (s) or fixup (f)
        const validActions = ["squash", "s", "fixup", "f"];
        return validActions.includes(parts[1]) && validActions.includes(parts[2]);
    };

    const question = html`
    <div class="mb-3">
      <p>
        You have 3 messy commits you want to combine into one clean commit using <code>git rebase -i HEAD~3</code>.
      </p>
      <pre>
def1234 WIP: Started implementation
abc5678 Fix typo in variable name
9012345 WIP: Almost done
      </pre>
      <p>
        To combine all 3 into the <strong>first</strong> commit (<code>def1234</code>), what verbs should you assign to them in the interactive editor?
      </p>
      <p>Enter the three verbs in order, separated by commas (e.g., <code>pick, squash, squash</code>).</p>
      <label for="${id}" class="form-label">Rebase Commands:</label>
      <input type="text" class="form-control" id="${id}" name="${id}" placeholder="e.g. pick, squash, squash" required />
    </div>
  `;

    return { id, title, weight, question, answer };
}
