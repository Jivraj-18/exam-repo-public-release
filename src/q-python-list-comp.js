import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-python-list-comp";
    const title = "Python List Comprehension";

    const random = seedrandom(`${user.email}#${id}`);

    const threshold = Math.floor(random() * 10) + 5; // 5-14
    const multiplier = Math.floor(random() * 5) + 2; // 2-6

    const question = html`
    <div class="mb-3">
      <p>
        Write a Python list comprehension that takes a list <code>numbers</code>,
        keeps only the values strictly greater than <code>${threshold}</code>,
        and multiplies them by <code>${multiplier}</code>.
      </p>
      <p>
        Example: If numbers = [4, 10, 2] and threshold = 5, multiplier = 2.
        Keep 10 (since 10 > 5). Result: [20].
      </p>
      <label for="${id}" class="form-label">Python Code:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="[x * ${multiplier} for x in numbers if ...]" />
    </div>
  `;

    // We'll create a simple validator by actually running expected logic on a test set
    // But since we can't run python, we'll check the string or use a JS implementation to verify if we were running it.
    // Ideally we expect the exact code string or similar.
    // For simplicity giving the flexible nature, I'll allow simple string match or simple regex.
    // Actually, let's just make them output the Resulting list for a *given* input to make it easier to validate in JS?
    // User prompt: "Paste the result of this list comprehension given numbers = [...]"
    // Let's change the question to be "Calculate the result" so we can validate deeply.

    const testInput = Array.from({ length: 5 }, () => Math.floor(random() * 20)); // random nums
    const expected = testInput.filter(x => x > threshold).map(x => x * multiplier);

    // Re-define question to ask for output
    const questionRevised = html`
    <div class="mb-3">
      <p>
        Given the Python list <code>numbers = ${JSON.stringify(testInput)}</code>.
      </p>
      <p>
        Apply the following logic: Keep numbers strictly greater than <code>${threshold}</code>,
        and multiply them by <code>${multiplier}</code>.
      </p>
      <p>
        Enter the resulting list as a JSON array (e.g. <code>[20, 40]</code>).
      </p>
      <label for="${id}" class="form-label">Result:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    const answer = (input) => {
        try {
            const arr = JSON.parse(input);
            if (!Array.isArray(arr)) return false;
            if (arr.length !== expected.length) return false;
            return arr.every((val, i) => val === expected[i]);
        } catch (e) {
            return false;
        }
    };

    return { id, title, weight, question: questionRevised, answer };
}
