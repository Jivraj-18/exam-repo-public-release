import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 0.75 }) {
  const id = "q-duckdb-generate";
  const title = "DuckDB Data Generation";

  const validate = async (answer) => {
    const cmd = answer.trim().toUpperCase();
    
    // Check for required components:
    // 1. COPY command
    // 2. range(100) -> Generates 0-99
    // 3. TO 'test.csv'
    
    const hasCopy = /COPY/.test(cmd);
    const hasRange = /RANGE\s*\(\s*100\s*\)/.test(cmd);
    const hasFile = /TO\s+['"]TEST\.CSV['"]/.test(cmd);

    if (!hasCopy) throw new Error("Command must start with COPY.");
    if (!hasRange) throw new Error("Command must use range(100) to generate the data.");
    if (!hasFile) throw new Error("Command must output TO 'test.csv'.");

    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        You need to create a dummy dataset for testing. 
        Write a <strong>DuckDB SQL command</strong> (CLI) that:
        <br>1. Generates a sequence of numbers from 0 to 99 using the <code>range()</code> function.
        <br>2. Exports this sequence directly to a file named <code>test.csv</code>.
      </p>
      <label for="${id}" class="form-label">SQL Command:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="COPY ... TO ..." />
    </div>
  `;

  return { id, title, weight, question, validate };
}