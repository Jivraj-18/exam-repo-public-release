import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 0.5 }) {
  const id = "q-llm-sentiment-analysis";
  const title = "LLM Sentiment Analysis";

  const random = seedrandom(`${user.email}#${id}`);
  const samples = [
    "The delivery was late but support fixed everything quickly.",
    "Absolutely terrible experience. Nothing worked.",
    "The service was okay, nothing special."
  ];

  const text = samples[Math.floor(random() * samples.length)];
  const expected =
    text.includes("terrible") ? "BAD" :
    text.includes("okay") ? "NEUTRAL" : "GOOD";

  const answer = (v) => {
    if (v.trim().toUpperCase() !== expected)
      throw new Error("Incorrect sentiment.");
    return true;
  };

  const question = html`
    <h2>${title}</h2>
    <p>
      Classify the sentiment of the following text using an LLM
      into <strong>GOOD</strong>, <strong>BAD</strong>, or <strong>NEUTRAL</strong>.
    </p>
    <blockquote>${text}</blockquote>
    <input class="form-control" id="${id}" />
  `;

  return { id, title, weight, question, answer };
}
