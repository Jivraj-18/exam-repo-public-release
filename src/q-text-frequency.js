import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-text-frequency";
    const title = "Text Analysis - Most Frequent Word";

    const random = seedrandom(`${user.email}#${id}`);

    const wordPool = ["data", "science", "code", "python", "javascript", "model", "query", "web"];
    const fillerPool = ["the", "a", "is", "of", "and", "to", "in"];

    // Pick a winner
    const winner = wordPool[Math.floor(random() * wordPool.length)];
    const winnerCount = 8 + Math.floor(random() * 5); // 8-12 times case insensitive

    const textWords = [];

    // Add winner
    for (let i = 0; i < winnerCount; i++) textWords.push(winner);

    // Add others
    for (let w of wordPool) {
        if (w === winner) continue;
        const count = 3 + Math.floor(random() * 3); // 3-5 times
        for (let i = 0; i < count; i++) textWords.push(w);
    }

    // Add fillers
    for (let w of fillerPool) {
        const count = 5 + Math.floor(random() * 5);
        for (let i = 0; i < count; i++) textWords.push(w);
    }

    // Shuffle check
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const paragraph = shuffle(textWords).join(" ");

    const answer = (input) => {
        const submission = input.trim().toLowerCase();
        if (submission === winner.toLowerCase()) return true;
        return false;
    };

    const question = html`
    <div class="mb-3">
      <p>
        Identify the most frequent word in the following paragraph (case-insensitive).
        Ignore standard English stopwords if they appear, but for this specific exercise, just count exact word matches.
        Actually simplest rule: Just count which word from the set <code>[${wordPool.join(", ")}]</code> appears the most.
      </p>
      <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin-bottom: 10px; font-style: italic;">
        "${paragraph}"
      </div>
      <label for="${id}" class="form-label">Most Frequent Word:</label>
      <input type="text" class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

    return { id, title, weight, question, answer };
}
