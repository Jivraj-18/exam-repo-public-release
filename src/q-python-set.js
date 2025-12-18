import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default function ({ user, weight }) {
  const id = "q-python-set";
  const title = "Python Set";
  const rng = seedrandom(user.email + id);

  const nums = [];
  const unique = new Set();

  for (let i = 0; i < 50; i++) {
    const n = Math.floor(rng() * 30); // 0-29
    nums.push(n);
    unique.add(n);
  }

  const question = html`
    <div>
      <h3>${title}</h3>
      <p>Given the following list of numbers in Python, what would be the result of <code>len(set(nums))</code>?</p>
      <pre class="overflow-auto" style="max-height: 100px; background: #f8f9fa; padding: 10px;">nums = [${nums.join(", ")}]</pre>
      <label>Result:</label>
      <input type="number" name="${id}" />
    </div>
  `;

  return {
    id,
    title,
    weight,
    question,
    answer: (answer) => parseInt(answer) === unique.size,
  };
}
