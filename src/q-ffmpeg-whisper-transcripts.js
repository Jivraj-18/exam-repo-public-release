import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-ffmpeg-whisper-transcripts";
  const title = "Compute Transcript Duration from SRT";

  const rng = seedrandom(`${user.email}#${id}`);
  const segments = Array.from({ length: 8 + Math.floor(rng() * 5) }, (_, i) => {
    const start = 10 * i + Math.floor(rng() * 3); // seconds
    const dur = 3 + Math.floor(rng() * 5);
    const end = start + dur;
    const text = ["hello", "world", "data", "pipeline", "model", "vector", "search"][Math.floor(rng() * 7)];
    return { i: i + 1, start, end, text };
  });

  const total = segments.reduce((sum, s) => sum + (s.end - s.start), 0);

  const srt = segments
    .map(
      (s) => `${s.i}\n00:00:${String(s.start).padStart(2, "0")},000 --> 00:00:${String(s.end).padStart(2, "0")},000\n${s.text}\n`,
    )
    .join("\n");

  const answer = (input) => {
    const x = Number(String(input).trim());
    if (!Number.isFinite(x)) throw new Error("Enter duration in seconds");
    if (x !== total) throw new Error("Incorrect total duration");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        After extracting audio with FFmpeg and transcribing with Whisper, you have an SRT.
        What is the <strong>total spoken duration</strong> in seconds across all segments?
      </p>
      <pre style="white-space: pre-wrap"><code class="language-text">${srt}</code></pre>
      <label for="${id}" class="form-label">Total duration (seconds):</label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
