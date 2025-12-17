import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-palindrome-check";
  const title = "Filter Palindromes";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];
  
  const chars = "abcdef";
  const genString = () => {
    const len = 3 + Math.floor(random() * 5); // 3-7 chars
    let s = "";
    for (let i = 0; i < len; i++) s += pick(chars.split(""));
    // 30% chance to force palindrome
    if (random() < 0.3) {
      const half = s.slice(0, Math.ceil(len/2));
      s = half + half.split("").reverse().slice(len%2).join("");
    }
    return s;
  };

  const words = Array.from({ length: 50 }, genString);
  
  const isPalindrome = (s) => {
    const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
    return clean === clean.split("").reverse().join("");
  };

  const expected = words.filter(isPalindrome);

  const answer = (input) => {
    const arr = JSON.parse(input);
    if (!Array.isArray(arr)) throw new Error("Expected a JSON array");
    if (arr.length !== expected.length) throw new Error("Length mismatch");
    // Sort before comparing to be lenient on order
    const sortedUser = [...arr].sort();
    const sortedExp = [...expected].sort();
    return sortedUser.every((val, i) => val === sortedExp[i]);
  };

  const question = html`
    <div class="mb-3">
      <p>
        Currently, you have a list of <strong>${words.length}</strong> strings.
      </p>
      <ol>
        <li>Identify which of these strings are palindromes (reads the same forwards and backwards).</li>
        <li>Return the list of palindromes as a JSON array.</li>
      </ol>
      <pre style="white-space: pre-wrap; max-height: 200px; overflow-y: auto; background: #f8f9fa; padding: 10px; border-radius: 5px;"><code class="language-json">
${JSON.stringify(words, null, 2)}
      </code></pre>
      <label for="${id}" class="form-label">Result (JSON Array):</label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}
