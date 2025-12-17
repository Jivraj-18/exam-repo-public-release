import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function({ user, weight = 1 }) {
  const id = "q-devtools-memory";
  const title = "DevTools Debugging";

  // Hide a secret in the console
  const secretKey = "DEBUG_MASTER_" + Math.floor(Math.random() * 1000);
  console.log("Debug info:", { secret: secretKey });

  const question = html`
    <div class="mb-3">
      <p>
        Open your browser's <strong>DevTools Console</strong>. A debug object has been logged with a secret key.
      </p>
      <label for="${id}" class="form-label">Find and enter the value of the <code>secret</code> property:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return {
    id,
    title,
    weight,
    question,
    answer: (val) => val.trim() === secretKey
  };
}
