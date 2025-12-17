import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-history-repair";
  const title = "Fix Git commit history";

  const answer = async () => {
    const text = document.getElementById(id).value.toLowerCase();

    if (
      !(
        text.includes("rebase -i") ||
        text.includes("git reset --soft")
      )
    ) {
      throw new Error("Expected rebase or soft reset");
    }

    if (text.includes("--hard")) {
      throw new Error("Destructive command used");
    }

    return true;
  };

  const question = html`
    <p><strong>Case Study: Accidental Commit</strong></p>
    <p>
      A sensitive file was committed by mistake.
      Write the Git command(s) needed to remove the commit
      while preserving history cleanliness.
    </p>
    <textarea class="form-control" id="${id}" rows="4"></textarea>
  `;

  return { id, title, weight, question, answer };
}
