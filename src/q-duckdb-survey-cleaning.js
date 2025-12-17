import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-duckdb-survey-cleaning";
  const title = "DuckDB: Unnesting Survey Responses";

  const random = seedrandom(`${user.email}#${id}`);

  // Configuration
  const features = ["Dark Mode", "Offline Sync", "API Access", "Multi-user", "Export PDF"];
  const ageGroups = ["18-24", "25-34", "35-44", "45+"];
  const rowCount = 200 + Math.floor(random() * 100); 

  let csvContent = "response_id,age_group,requested_features\n";
  let targetCount = 0;

  // Generate Data
  for (let i = 1; i <= rowCount; i++) {
    const age = ageGroups[Math.floor(random() * ageGroups.length)];
    
    const selected = features.filter(() => random() > 0.5);
    const delimiter = random() > 0.5 ? "|" : ";";
    const joinedFeatures = selected.join(`${delimiter} `); 

    csvContent += `${i},${age},"${joinedFeatures}"\n`;

    if (age === "25-34" && selected.includes("Offline Sync")) {
      targetCount++;
    }
  }

  const blob = new Blob([csvContent], { type: "text/csv" });

  const answer = async (response) => {
    const input = parseInt(response, 10);
    if (isNaN(input)) throw new Error("Please enter a valid integer.");
    if (input !== targetCount) throw new Error(`Incorrect count. Expected ${targetCount}.`);
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>ProdSurv: Splitting Multi-Value Columns</h2>
      <p>
        The product manager needs to know exactly how many users in the <strong>25-34</strong> age group 
        requested <strong>Offline Sync</strong>.
      </p>
      <h3>Your Task</h3>
      <ol>
        <li>Download the survey export CSV below.</li>
        <li>Load it into DuckDB (or use Python/Excel).</li>
        <li>Split the <code>requested_features</code> column (delimiters are <code>|</code> or <code>;</code>).</li>
        <li>Filter for <code>age_group = '25-34'</code> and feature <code>Offline Sync</code>.</li>
      </ol>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, "survey_responses.csv")}>
          <i class="bi bi-download"></i> Download survey_responses.csv
        </button>
      </p>
      <label for="${id}" class="form-label">Count:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}