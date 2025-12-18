import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-len";
  const title = "Python: len()";

  const random = seedrandom(`${user.email}#${id}`);
  const listLength = Math.floor(random() * 10) + 3;
  const list = Array.from({ length: listLength }, (_, i) => i);

  const answer = (value) => {
    if (Number(value) !== listLength) throw new Error("Incorrect length");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>Consider the Python code:</p>
      <pre><code>items = ${JSON.stringify(list)}
len(items)</code></pre>
      <label class="form-label">What is the output?</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
