import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-wordcount";
  const title = "CLI Word Count";

  const random = seedrandom(`${user.email}#${id}`);

  const words = ["data", "science", "tools", "python", "json"];
  const text = Array.from({ length: 20 }, () =>
    words[Math.floor(random() * words.length)],
  );

  const target = words[Math.floor(random() * words.length)];
  const answer = text.filter((w) => w === target).length;

  const question = html`
    <div class="mb-3">
      <p>Suppose a text file contains the following words (one per line):</p>

      <pre><code>${text.join("\n")}</code></pre>

      <p>
        Using a command-line tool like <code>grep</code> or <code>wc</code>,
        how many times does the word <strong>${target}</strong> appear?
      </p>

      <label for="${id}" class="form-label">Enter the count</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
