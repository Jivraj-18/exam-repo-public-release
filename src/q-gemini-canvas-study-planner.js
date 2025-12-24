import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gemini-canvas-study-planner";
  const title = "Gemini Canvas: Smart Study Planner";
  const answer = "Gemini Canvas share URL";
  const question = html`
    <div class="mb-3">
      <p>
        Using <strong>Gemini Canvas</strong>, build and share a small app that takes
        <strong>subjects, available hours, and deadlines</strong> as input and generates
        a simple weekly study plan.
      </p>
      <label for="${id}" class="form-label">Gemini Canvas URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;
  return { id, title, weight, question, answer };
}
