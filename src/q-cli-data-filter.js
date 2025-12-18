import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-cli-data-filter";
    const title = "Command Line Data Processing";

    const random = seedrandom(`${user.email}#${id}`);

    // Randomize threshold and column
    const threshold = [70, 75, 80, 85, 90][Math.floor(random() * 5)];
    const column = [2, 3, 4][Math.floor(random() * 3)];
    const columnName = ["age", "marks", "score"][column - 2];

    const answer = `awk -F',' '$${column} > ${threshold}' data.csv | wc -l`;

    const question = html`
    <div class="mb-3">
      <p>
        You have a CSV file called <code>data.csv</code> with a header row. 
        The ${columnName} is in column ${column}. 
        You need to quickly count how many rows have ${columnName} greater than ${threshold} 
        without writing a Python script.
      </p>
      <p>Which command would you use?</p>
      
      <label for="${id}" class="form-label">
        Enter the command (use tools like awk, grep, cut, wc as needed):
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., awk ... | wc -l" />
      
      <p class="text-muted mt-2">
        <small>
          Hint: Consider using <code>awk</code> with <code>-F</code> flag for field separation 
          and <code>wc -l</code> for counting lines.
        </small>
      </p>
    </div>
  `;

    return { id, title, weight, question, answer };
}
