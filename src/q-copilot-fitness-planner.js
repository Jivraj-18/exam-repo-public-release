import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-copilot-fitness-planner";
  const title = "GitHub Copilot Chat: Smart Fitness Planner App";
  const answer = "GitHub Copilot Chat log output";
  const question = html`
    <div class="mb-3">
      <p>
        Using <strong>GitHub Copilot Chat</strong> inside VS Code, build a small web app
        that works as a <strong>smart fitness planner</strong>.
        The app should allow users to input fitness goals, experience level, available
        workout time per day, and preferred workout type, and then generate a
        <strong>weekly workout plan</strong>.
      </p>
      <p>
        Copy and paste the complete <strong>GitHub Copilot Chat log</strong>
        used to design and implement this app.
      </p>
      <label for="${id}" class="form-label">GitHub Copilot Chat Log:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;
  return { id, title, weight, question, answer };
}
