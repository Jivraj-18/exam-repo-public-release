import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-question-file-naming";
  const title = "Question File Naming Convention";

  const random = seedrandom(`${user.email}#${id}`);
  const questionNames = ["sorting-algorithm", "data-analysis", "web-scraping", "image-processing", "api-integration"];
  const selectedQuestion = questionNames[Math.floor(random() * questionNames.length)];
  const answer = `q-${selectedQuestion}.js`;

  const question = html`
    <div class="mb-3">
      <p>According to the README file, what is the correct naming convention for new question files in the src/ directory?</p>
      <p>If you want to create a question about <strong>${selectedQuestion}</strong>, what should be the exact filename?</p>
      
      <label for="${id}" class="form-label">Filename:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="Enter the correct filename" />
    </div>
  `;

  return { id, title, weight, question, answer };
}