import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function ({ user, weight = 1 }) {
  return {
    id: "q-llm-temperature",
    type: "input",
    weight,
    question: html`
      <p>
        <strong>AI & LLMs:</strong> When using an LLM API (like OpenAI or Gemini) for code generation, 
        you want the output to be <strong>deterministic</strong> (minimal randomness). 
        <br><br>
        What value (number) should you set the <code>temperature</code> parameter to?
      </p>
    `,
    answer: "0",
    check: (response) => response.trim() === "0" || response.trim() === "0.0",
  };
}