// Question 4: LLM Prompt Engineering and Response Parsing
import { html } from "lit";

export default function ({ user, weight = 1 }) {
  return {
    id: "llm-prompt-engineering",
    title: "LLM Prompting",
    weight,
    question: html`
      <h3>LLM Prompt Engineering</h3>
      <p>Design a prompt for a model to extract "Price" and "Product Quality" from this review:</p>
      <blockquote style="font-style: italic;">"The phone is great but $1200 is too much for a plastic body."</blockquote>
      <textarea class="form-control" rows="5" name="prompt_response"></textarea>
    `,
    answer: (formData) => formData.get("prompt_response")?.length > 10
  };
}