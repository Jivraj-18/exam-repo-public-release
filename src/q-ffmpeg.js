import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-ffmpeg-audio";
  const title = "FFmpeg: Extract audio";

  const answer = "ffmpeg -i video.mp4 -vn audio.mp3";

  const question = html`
    <div class="mb-3">
      <p>
        You have a video file <code>video.mp4</code>.
      </p>
      <p>
        Which FFmpeg command extracts the <strong>audio track only</strong>
        and saves it as <code>audio.mp3</code>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
