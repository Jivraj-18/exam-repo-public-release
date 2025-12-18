import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 0.5 }) {
  const id = "q-llm-embedding-request";
  const title = "LLM Embedding API Request";

  // Generate personalized text based on user
  const texts = [
    "Machine learning is transforming industries",
    "Data science requires statistical knowledge",
    "Neural networks mimic brain function",
  ];
  const seed = user.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const selectedText = texts[seed % texts.length];

  const answer = JSON.stringify({
    model: "text-embedding-3-small",
    input: selectedText,
  });

  const question = html`
    <div class="mb-3">
      <p>
        You need to generate embeddings for text using OpenAI's Embeddings API.
        Write the JSON body for a POST request to
        <code>https://api.openai.com/v1/embeddings</code> that:
      </p>
      <ul>
        <li>Uses the <code>text-embedding-3-small</code> model</li>
        <li>Embeds the following text: "<strong>${selectedText}</strong>"</li>
      </ul>
      <label for="${id}" class="form-label">JSON Body:</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="6"
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
