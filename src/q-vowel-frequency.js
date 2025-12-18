import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

// Count vowel frequencies in a string
//
// The goal of this question is to practice string processing. Students are given a long random
// text consisting of words and punctuation. They must count how many times each vowel (a, e,
// i, o, u) appears in the text, ignoring case, and return the counts as a JSON object. The
// answer function verifies the counts exactly.

export default async function ({ user, weight = 1 }) {
  const id = "q-vowel-frequency";
  const title = "Count vowel frequencies in a paragraph";

  // seeded RNG
  const random = seedrandom(`${user.email}#${id}`);
  const words = [
    "analysis",
    "dataset",
    "exploration",
    "visualization",
    "algorithm",
    "model",
    "prediction",
    "statistics",
    "regression",
    "clustering",
    "classification",
    "pipeline",
    "feature",
    "encoding",
    "normalization",
    "evaluation",
    "distribution",
    "inference",
    "validation",
    "training",
  ];

  // generate a paragraph of 100 words with punctuation
  const tokens = [];
  const punctuation = [".", ",", ";", ":", "!", "?", "(", ")"];
  for (let i = 0; i < 100; i++) {
    const w = words[Math.floor(random() * words.length)];
    tokens.push(w);
    // randomly append punctuation after some words
    if (random() < 0.3) {
      tokens[tokens.length - 1] += punctuation[Math.floor(random() * punctuation.length)];
    }
  }
  const text = tokens.join(" ");

  // compute expected vowel counts (case‑insensitive)
  const expected = { a: 0, e: 0, i: 0, o: 0, u: 0 };
  for (const char of text.toLowerCase()) {
    if (expected.hasOwnProperty(char)) {
      expected[char] += 1;
    }
  }

  const answer = (input) => {
    let obj;
    try {
      obj = JSON.parse(input);
    } catch (err) {
      throw new Error("Input must be a valid JSON object");
    }
    // ensure all vowels are present
    const expectedKeys = Object.keys(expected).sort();
    const inputKeys = Object.keys(obj).sort();
    if (JSON.stringify(expectedKeys) !== JSON.stringify(inputKeys)) {
      throw new Error("Missing or extra keys in the result");
    }
    return expectedKeys.every((vowel) => obj[vowel] === expected[vowel]);
  };

  const question = html`
    <div class="mb-3">
      <p>
        The following paragraph contains a variety of data science–related terms. Write a program
        to count how many times each vowel (<code>a</code>, <code>e</code>, <code>i</code>, <code>o</code>, <code>u</code>)
        appears in the text (case should be ignored). Return your answer as a JSON object where the
        keys are the vowels and the values are their respective counts.
      </p>
      <pre style="white-space: pre-wrap"><code>${text}</code></pre>
      <label for="${id}" class="form-label">Vowel counts (JSON object):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
