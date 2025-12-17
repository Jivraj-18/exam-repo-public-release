import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-json-filter-aggregate";
  const title = "Filter and Aggregate JSON Data";

  // Sample JSON dataset
  const data = [
    { id: 1, category: "A", score: 85, passed: true },
    { id: 2, category: "B", score: 70, passed: false },
    { id: 3, category: "A", score: 90, passed: true },
    { id: 4, category: "C", score: 65, passed: false },
    { id: 5, category: "B", score: 75, passed: true },
    { id: 6, category: "A", score: 80, passed: true },
    { id: 7, category: "C", score: 95, passed: true }
  ];

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });

  const answer = async (value) => {
    let parsed;
    try { parsed = JSON.parse(value); }
    catch { throw new Error("Enter a valid JSON object."); }

    // Compute average score for category A where passed is true
    const filtered = data.filter(d => d.category === "A" && d.passed);
    const avgScore = Math.round(filtered.reduce((sum, d) => sum + d.score, 0) / filtered.length);
    if (parsed.average !== avgScore) {
      throw new Error(`Incorrect. Correct average: ${avgScore}`);
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Filter and Aggregate JSON Data</h2>
      <p>
        You are given a JSON dataset of test results. Compute the <strong>average score</strong> of students in 
        <strong>category A</strong> who have <code>passed: true</code>.
      </p>
      <p>
        Download the dataset:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.json`)}>
          ${id}.json
        </button>
      </p>
      <label for="${id}" class="form-label">
        Enter a JSON object with the format: {"average": VALUE}
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
      <p class="text-muted">Example: {"average": 85}</p>
    </div>
  `;

  return { id, title, weight, question, answer };
};
