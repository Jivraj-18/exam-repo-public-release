import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

// Question 4: Bash File Operations
export async function question4({ user, weight = 1 }) {
  const id = "q-bash-grep";
  const title = "Text Processing with grep";

  const answer = "grep -i 'error' logfile.txt | wc -l";

  const question = html`
    <div class="mb-3">
      <p>
        You need to count how many lines in <code>logfile.txt</code> contain the word
        "error" (case-insensitive).
      </p>
      <p>
        Write a bash command using <code>grep</code> and <code>wc</code> to accomplish this.
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="grep ... | wc ..." />
    </div>
  `;

  return { id, title, weight, question, answer };
}