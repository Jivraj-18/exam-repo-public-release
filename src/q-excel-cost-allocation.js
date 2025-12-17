import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default function({ user, weight = 1 }) {
  const id = "q-excel-cost-allocation";
  const title = "Excel Cost Allocation";

  const random = seedrandom(`${user.email}#${id}`);
  const costs = Array.from({ length: 4 }, () => Math.floor(random() * 30000) + 10000);
  const overhead = Number((1.1 + random() * 0.2).toFixed(2));
  const total = costs.reduce((a, b) => a + b, 0);
  const departments = ["Sales", "Marketing", "IT", "HR"];

  const question = html`
    <div class="mb-3">
      <h3>Excel Cost Allocation</h3>
      <p>You have a spreadsheet with department costs. Use Excel to calculate the total allocated cost.</p>
      <p>Given the following data in cells A1:B5:</p>
      <pre>Department    Cost
${departments.map((dept, i) => `${dept.padEnd(13)} ${costs[i]}`).join("\n")}</pre>
      <p>Write an Excel formula to calculate the sum of all costs and multiply by ${overhead} (for overhead allocation).</p>
      <label for="${id}" class="form-label">What is the total allocated cost? (Round to 2 decimal places)</label>
      <input type="number" step="0.01" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return {
    id,
    title,
    weight,
    question,
    answer: { type: "number", decimals: 2 },
  };
}
