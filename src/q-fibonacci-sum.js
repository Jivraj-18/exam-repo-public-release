import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-fibonacci-sum";
    const title = "Sum of Fibonacci Numbers";

    const random = seedrandom(`${user.email}#${id}`);

    // Random N between 10 and 30
    const n = 10 + Math.floor(random() * 21);

    // Generate fib sequence: 0, 1, 1, 2, 3, 5...
    const fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }

    const expected = fib.slice(0, n).reduce((a, b) => a + b, 0);

    const answer = (input) => {
        const val = Number(input);
        if (val !== expected) {
            throw new Error(`Expected ${expected}, got ${val}`);
        }
        return true;
    };

    const question = html`
    <div class="mb-3">
      <p>
        Consider the Fibonacci sequence starting with 0, 1, 1, 2, 3...
      </p>
      <ol>
        <li>Calculate the sum of the first <strong>${n}</strong> Fibonacci numbers.</li>
        <li>Note: The 1st number is 0, the 2nd is 1.</li>
        <li>Enter the integer sum below.</li>
      </ol>
      <label for="${id}" class="form-label">Sum:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

    return { id, title, weight, question, answer };
}
