import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-word-frequency";
  const title = "Text Frequency Analysis";

  const random = seedrandom(`${user.email}#${id}`);
  const words = ["data", "model", "learning", "analysis", "python"];
  const target = pick(words, random);
  let expected;

  const answer = async (count) => {
    count = count.trim();
    if (!expected) {
      const r = await fetch("/proxy/https://www.gutenberg.org/files/1342/1342-0.txt");
      const text = (await r.text()).toLowerCase();
      expected = text.split(target).length - 1 + "";
    }
    if (count !== expected) throw new Error("Incorrect frequency");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Large-Scale Text Analytics</h2>
      <p>
        Download the text of <em>Pride and Prejudice</em> from Project Gutenberg.
      </p>

      <p>
        Count how many times the word <code>${target}</code> appears (case-insensitive).
      </p>

      <label for="${id}" class="form-label">
        Enter the frequency count:
      </label>
      <input class="form-control" id="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}
