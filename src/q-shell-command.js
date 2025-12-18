import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

// Question 1: Shell Command for CSV Field Extraction
export async function question1({ user, weight = 1 }) {
  const id = "q-csv-delimiter";
  const title = "CSV Field Extraction";
  const answer = "cut -d',' -f3";
  
  const question = html`
    <div class="mb-3">
      <p>
        You have a CSV file with columns: <code>id,name,email,department,salary</code>.
        Which shell command extracts <strong>only the email column</strong> (3rd field)?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., cut ..." />
      <small class="form-text text-muted">Use standard Unix tools like cut, awk, or grep</small>
    </div>
  `;
  
  return { id, title, weight, question, answer };
}
