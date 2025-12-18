import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function ({ user, weight }) {
  const title = "Sample Question";
  const correct = "42";
  const question = html`
    <div>
      <h3>${title}</h3>
      <p>What is the answer to life, the universe, and everything?</p>
      <input type="text" name="answer" placeholder="Enter number..." />
    </div>
  `;
  return {
    id: "q-sample-1",
    title,
    weight,
    question,
    answer: (answer) => answer.trim() === correct,
  };
}
