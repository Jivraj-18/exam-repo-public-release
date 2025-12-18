import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-python-transformation";
    const title = "Python: List Comprehension";

    const random = seedrandom(`${user.email}#${id}`);

    const length = 10 + Math.floor(random() * 10); // 10-20 numbers
    const numbers = Array.from({ length }, () => Math.floor(random() * 100));
    const threshold = Math.floor(random() * 50);

    const answer = numbers.filter(n => n > threshold).reduce((a, b) => a + b, 0);

    const question = html`
    <div class="mb-3">
      <p>
        Consider the following Python list <code>data</code>:
      </p>
      <pre><code class="language-python">data = [${numbers.join(", ")}]</code></pre>
      <p>
        <strong>Question:</strong> What is the result of the following Python expression?
      </p>
      <pre><code class="language-python">sum([x for x in data if x > ${threshold}])</code></pre>

      <label for="${id}" class="form-label">Result:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
