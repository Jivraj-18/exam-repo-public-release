import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-23f2001072-1";
  const title = "Python List Slicing";

  // deterministic RNG
  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  // Generate random list
  const length = 5 + Math.floor(random() * 5); // 5 to 9
  const list = Array.from({ length }, () => Math.floor(random() * 20));

  // Random start/end/step
  const start = Math.floor(random() * (length - 2));
  const end = start + 1 + Math.floor(random() * (length - start - 1));
  const sliceStr = `[${start}:${end}]`;

  const expected = JSON.stringify(list.slice(start, end));

  const answer = (input) => {
    return input.replace(/\s+/g, '') === expected.replace(/\s+/g, '');
  };

  const question = html`
    <div class="mb-3">
      <p>Consider the following Python list:</p>
      <pre class="p-3 bg-light border rounded"><code>my_list = ${JSON.stringify(list, null, 2).replace(/\n/g, '')}</code></pre>
      <p>What is the output of <code>my_list${sliceStr}</code>?</p>
      <p>Enter the result as a list, e.g., <code>[1, 2, 3]</code>.</p>
      
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
