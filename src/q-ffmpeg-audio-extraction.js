import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-ffmpeg-audio-extraction";
  const title = "FFmpeg: Audio Extraction";

  const answer = "ffmpeg -i video.mp4 -vn audio.wav";

  const question = html`
    <div class="mb-3">
      <p>
        You are given a video file named <code>video.mp4</code> and want to extract
        only its audio track into a WAV file.
      </p>
      <p>
        Which <code>ffmpeg</code> command disables video processing and outputs
        the audio stream?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
