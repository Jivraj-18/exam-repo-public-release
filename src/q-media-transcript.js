import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-media-transcript";
  const title = "Audio: Transcript Extraction";

  const answer = "postmortems must focus on systems not individuals";

  const question = html`
    <div class="mb-3">
      <p>
        You are given a recorded reliability engineering talk.
        Extract audio and generate a transcript for the segment between
        <strong>90s and 140s</strong>.
      </p>
      <p>
        What key principle is stated verbatim about conducting incident postmortems?
      </p>
      <label for="${id}" class="form-label">Exact phrase:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
