import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-algo-fizzbuzz-sum";
  const title = "Algorithms: Condition-Based Summation";

  const random = seedrandom(`${user.email}#${id}`);

  const numbers = [];
  const count = 100;
  
  // Random range of numbers
  for(let i=0; i<count; i++) {
    numbers.push(Math.floor(random() * 1000) + 1);
  }

  // Divisors unique to the user
  const divA = 3 + Math.floor(random() * 3); // e.g., 3, 4, or 5
  const divB = 7 + Math.floor(random() * 3); // e.g., 7, 8, or 9

  let magicSum = 0;
  
  // Logic: Sum numbers divisible by divA OR divB, but NOT both.
  for(const num of numbers) {
    const a = num % divA === 0;
    const b = num % divB === 0;
    if ((a || b) && !(a && b)) {
        magicSum += num;
    }
  }

  const blob = new Blob([numbers.join("\n")], { type: "text/plain" });

  const answer = async (value) => {
    if (Number(value) !== magicSum) throw new Error("Sum is incorrect. Check your XOR logic (divisible by A or B, but not both).");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2 id="algo-sum">Logic: The "XOR" Sum</h2>
      <p>
        Download the list of integers. Calculate a specific sum based on divisors <strong>${divA}</strong> and <strong>${divB}</strong>.
      </p>
      <h3>Task</h3>
      <ol>
        <li>Iterate through the numbers.</li>
        <li>Include the number in the sum if it is divisible by <strong>${divA}</strong> OR <strong>${divB}</strong>...</li>
        <li>...but <strong>EXCLUDE</strong> it if it is divisible by BOTH.</li>
      </ol>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.txt`)}>
          ${id}.txt
        </button>
      </p>
      <label for="${id}" class="form-label">
        What is the final sum?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}