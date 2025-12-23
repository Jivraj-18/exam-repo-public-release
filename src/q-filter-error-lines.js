import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-bash-grep-logs";
  const title = "Filter Error Lines from Logs";

  const answer = "grep \"ERROR\" app.log";

  const question = html`
    <div class="mb-3">
      <p>
        An operations engineer stores application logs in a file
        <code>app.log</code>. They want to quickly see only the lines that
        contain the word <code>ERROR</code>.
      </p>
      <p>
        Which single <strong>Bash command</strong> should they run in the
        terminal to print only the lines that contain <code>ERROR</code> from
        <code>app.log</code>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
