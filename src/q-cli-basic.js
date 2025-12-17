import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-working-directory";
  const title = "Finding Current Directory in CLI";

  const answer = "pwd";

  const question = html`
    <div class="mb-3">
      <p>
        While navigating a Linux terminal, you want to confirm the directory
        you are currently working in. Which command displays the full path
        of the present directory?
      </p>
      <label for="${id}" class="form-label">Your Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
