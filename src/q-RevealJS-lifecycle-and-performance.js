import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.5 }) {
  const id = "q-reveal-event";
  const title = "RevealJS Slide Lifecycle Event";

  const answer = "slidechanged";

  const question = html`
    <div class="mb-3">
      <p>
        In RevealJS, which <strong>event name</strong> should be listened to
        if you want to <strong>lazy-load or update a D3 chart only when
        a slide becomes active</strong>, avoiding unnecessary rendering?
      </p>
      <label for="${id}" class="form-label">Event name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
