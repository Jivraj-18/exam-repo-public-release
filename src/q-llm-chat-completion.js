import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-chat-completion";
  const title = "LLM Chat Completion Request";

  // Generate a random temperature value
  const seed = user.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const temperature = (0.1 + (seed % 10) * 0.1).toFixed(1);
  const maxTokens = 100 + (seed % 5) * 50;

  const answer = JSON.stringify({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Hello" },
    ],
    temperature: parseFloat(temperature),
    max_tokens: maxTokens,
  });

  const question = html`
    <div class="mb-3">
      <p>
        You are building a chatbot using OpenAI's API. Write the JSON body for a
        POST request to
        <code>https://api.openai.com/v1/chat/completions</code> that:
      </p>
      <ul>
        <li>Uses the <code>gpt-4o-mini</code> model</li>
        <li>Has a system message: "You are a helpful assistant."</li>
        <li>Has a user message: "Hello"</li>
        <li>Sets temperature to <strong>${temperature}</strong></li>
        <li>Sets max_tokens to <strong>${maxTokens}</strong></li>
      </ul>
      <label for="${id}" class="form-label">JSON Body:</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="10"
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
