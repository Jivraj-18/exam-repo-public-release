import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-linux-grep";
  const title = "Linux: grep";

  const random = seedrandom(`${user.email}#${id}`);
  const word = ["error", "warning", "failed", "timeout"][Math.floor(random() * 4)];

  const text = `
INFO: system boot
WARNING: disk slow
ERROR: request failed
INFO: retry succeeded
`;

  const expected = text.split("\n").filter((l) => l.toLowerCase().includes(word)).length;

  const answer = (value) => {
    const n = Number(value);
    if (n !== expected) throw new Error("Incorrect count");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>You run the following command:</p>
      <pre><code>grep -i "${word}" log.txt</code></pre>
      <p>Where <code>log.txt</code> contains:</p>
      <pre><code>${text}</code></pre>
      <label class="form-label">How many lines are printed?</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
