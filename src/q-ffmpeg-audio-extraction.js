import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-ffmpeg-vn";
  const title = "FFmpeg: Audio Extraction";

  const answer = "-vn";

  const question = html`
    <div class="mb-3">
      <p>
        You want to extract the audio track from a video file using FFmpeg
        without re-encoding. Which flag explicitly tells FFmpeg to
        <strong>disable video recording</strong> (i.e., drop the video stream)?
      </p>
      <label for="${id}" class="form-label">Flag:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
