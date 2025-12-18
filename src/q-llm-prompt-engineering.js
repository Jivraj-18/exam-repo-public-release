// Question 4: LLM Prompt Engineering and Response Parsing
import { html } from "https://cdn.jsdelivr.net/npm/lit@3/index.js";

export default function ({ user, weight = 1 }) {
  return {
    id: "llm-prompt-engineering",
    weight,
    question: html`
      <h3>LLM Prompt Engineering</h3>
      <p>Design a prompt to extract "Sentiment" from this review: <i>"The product quality is excellent but the delivery was slow."</i></p>
      <textarea class="form-control" rows="4" name="prompt_ans"></textarea>
    `,
    answer: (formData) => formData.get("prompt_ans")?.length > 10
  };
}