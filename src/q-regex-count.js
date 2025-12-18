import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-regex-count";
    const title = "Regex Count";

    const random = seedrandom(`${user.email}#${id}`);

    const words = ["cat", "dog", "bat", "car", "cup", "cap", "cot"];
    // Randomly select words to form a string
    const selectedWords = Array.from({ length: 15 }, () => words[Math.floor(random() * words.length)]);
    const text = selectedWords.join(" ");

    // Pattern: words starting with 'c'
    const pattern = /c\w+/g;
    const matches = text.match(pattern) || [];
    const answer = matches.length;

    const question = html`
    <div class="mb-3">
      <p>Given the text string:</p>
      <pre>${text}</pre>
      <p>
        How many matches are found using the regex pattern <code>c\w+</code>?
      </p>
      
      <label for="${id}" class="form-label">Count:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
