import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 0.5 }) {
  const id = "q-llm-image-generation";
  const title = "LLM Image Generation Request";

  // Generate random parameters based on user
  const seed = user.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const sizes = ["256x256", "512x512", "1024x1024"];
  const numImages = 1 + (seed % 3);
  const sizeIndex = seed % sizes.length;
  const size = sizes[sizeIndex];

  const prompts = [
    "A futuristic cityscape at sunset with flying cars",
    "A magical forest with glowing mushrooms and fairies",
    "An underwater kingdom with mermaids and coral palaces",
  ];
  const prompt = prompts[seed % prompts.length];

  const answer = JSON.stringify({
    model: "gpt-image-1",
    prompt: prompt,
    n: numImages,
    size: size,
    response_format: "b64_json",
  });

  const question = html`
    <div class="mb-3">
      <p>
        You are using OpenAI's Image Generation API. Write the JSON body for a
        POST request to
        <code>https://api.openai.com/v1/images/generations</code> that:
      </p>
      <ul>
        <li>Uses the <code>gpt-image-1</code> model</li>
        <li>Uses this prompt: "<strong>${prompt}</strong>"</li>
        <li>Generates <strong>${numImages}</strong> image(s)</li>
        <li>Sets image size to <strong>${size}</strong></li>
        <li>Sets response format to <code>b64_json</code></li>
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
