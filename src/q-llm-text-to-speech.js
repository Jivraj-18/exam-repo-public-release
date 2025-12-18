import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 0.5 }) {
  const id = "q-llm-text-to-speech";
  const title = "LLM Text-to-Speech Request";

  // Generate random parameters based on user
  const seed = user.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const voices = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"];
  const formats = ["mp3", "opus", "aac", "flac"];
  const speeds = [0.75, 1.0, 1.25, 1.5];

  const voiceIndex = seed % voices.length;
  const formatIndex = seed % formats.length;
  const speedIndex = seed % speeds.length;

  const voice = voices[voiceIndex];
  const format = formats[formatIndex];
  const speed = speeds[speedIndex];

  const texts = [
    "Welcome to our AI-powered assistant. How can I help you today?",
    "Thank you for calling. Your satisfaction is our priority.",
    "This is a test of the text-to-speech synthesis system.",
  ];
  const text = texts[seed % texts.length];

  const answer = JSON.stringify({
    model: "tts-1",
    input: text,
    voice: voice,
    response_format: format,
    speed: speed,
  });

  const question = html`
    <div class="mb-3">
      <p>
        You are using OpenAI's Text-to-Speech API. Write the JSON body for a
        POST request to
        <code>https://api.openai.com/v1/audio/speech</code> that:
      </p>
      <ul>
        <li>Uses the <code>tts-1</code> model</li>
        <li>Converts this text: "<strong>${text}</strong>"</li>
        <li>Uses the <strong>${voice}</strong> voice</li>
        <li>Sets response format to <strong>${format}</strong></li>
        <li>Sets speed to <strong>${speed}</strong></li>
      </ul>
      <label for="${id}" class="form-label">JSON Body:</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="8"
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
