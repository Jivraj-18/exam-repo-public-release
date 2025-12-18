import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 2 }) {
  const id = "q-artifact-evil";
  const title = "The Fake App Syndrome";

  const answer = "shareable";

  const question = html`
    <div class="mb-3">
      <p>
        Claude Artifacts, Gemini Canvas, and Copilot Chat
        all let you “build apps”.
        <br /><br />
        But only one thing separates
        a <em>private hallucination</em>
        from something graders can actually verify.
        <br /><br />
        What <strong>property</strong> must the app have
        for it to be considered a valid submission?
      </p>
      <label for="${id}" class="form-label">Property:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
