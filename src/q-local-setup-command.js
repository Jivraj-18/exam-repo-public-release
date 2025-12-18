import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-local-setup-command";
  const title = "Local Development Setup";

  const random = seedrandom(`${user.email}#${id}`);
  const commands = ["npx wrangler dev", "npm start", "npm run dev", "node server.js", "python app.py"];
  const correctCommand = "npx wrangler dev";
  const answer = correctCommand;

  const question = html`
    <div class="mb-3">
      <p>According to the README file, after cloning the repository and installing dependencies, which command should you run to start the local development server?</p>
      
      <div class="mb-2">
        ${commands.map((cmd, index) => html`
          <div class="form-check">
            <input class="form-check-input" type="radio" name="${id}" id="${id}-${index}" value="${cmd}" />
            <label class="form-check-label" for="${id}-${index}">
              <code>${cmd}</code>
            </label>
          </div>
        `)}
      </div>
    </div>
  `;

  return { id, title, weight, question, answer };
}