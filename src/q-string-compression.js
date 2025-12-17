import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-string-compression";
    const title = "String Compression";

    const random = seedrandom(`${user.email}#${id}`);
    const pick = (arr) => arr[Math.floor(random() * arr.length)];

    const chars = "abc";
    let inputStr = "";
    // Create runs of characters
    for (let i = 0; i < 15; i++) {
        const char = pick(chars.split(""));
        const runLen = 1 + Math.floor(random() * 5);
        inputStr += char.repeat(runLen);
    }

    // Expected logic: aabcccccaaa -> a2b1c5a3
    let expected = "";
    let count = 0;
    for (let i = 0; i < inputStr.length; i++) {
        count++;
        if (i + 1 >= inputStr.length || inputStr[i] !== inputStr[i + 1]) {
            expected += inputStr[i] + count;
            count = 0;
        }
    }

    const answer = (input) => {
        if (input.trim() !== expected) {
            throw new Error(`Expected ${expected}, got ${input}`);
        }
        return true;
    };

    const question = html`
    <div class="mb-3">
      <p>
        Implement basic string compression using the counts of repeated characters.
      </p>
      <p><strong>Input String:</strong> <code>${inputStr}</code></p>
      <ol>
        <li>For example, the string <code>aabcccccaaa</code> would become <code>a2b1c5a3</code>.</li>
        <li>If the "compressed" string would not become smaller than the original string, your method should still return the compressed version for this problem.</li>
        <li>Paste the compressed string below.</li>
      </ol>
      <label for="${id}" class="form-label">Compressed String:</label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

    return { id, title, weight, question, answer };
}
