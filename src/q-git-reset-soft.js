import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function qGitResetSoft() {
  return {
    id: "q-git-reset-soft",
    title: "Git: undo commit keep staged",
    weight: 1,
    question: html`
      <div class="mb-3">
        <p>
          You made a commit by mistake, but you want to undo the commit
          while keeping all changes staged.
        </p>
        <p>
          Write the exact Git command.
        </p>
        <label class="form-label">Command:</label>
        <input class="form-control" name="q-git-reset-soft" />
      </div>
    `,
    answer: "git reset --soft HEAD~1",
  };
}
