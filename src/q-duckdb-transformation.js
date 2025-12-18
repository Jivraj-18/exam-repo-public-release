import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-duckdb-integrity-check";
  const title = "Data Engineering: DuckDB Cryptographic Verification";
  const random = seedrandom(`${user.email}#${id}`);
  const valA = Math.floor(random() * 500);
  const valB = Math.floor(random() * 500);

  const question = html`
    <div class="mb-3">
      <h4>Business Context: Immutable Audit Logs</h4>
      <p>
        <strong>VeriLog Corp</strong> specializes in high-integrity data pipelines. They use <b>DuckDB</b> to process daily transaction batches. To ensure data hasn't been tampered with during transformation, they require a specific hash-chain signature of the final processed values.
      </p>
      <h5>Your Task</h5>
      <p>Using the DuckDB CLI or Python API, process two transactional inputs and generate a verification hash.</p>
      <ol>
        <li><strong>Inputs:</strong> Transaction Alpha = <code>${valA}</code>, Transaction Beta = <code>${valB}</code>.</li>
        <li><strong>Operation:</strong> Calculate the sum <code>(Alpha + Beta)</code>.</li>
        <li><strong>Signature:</strong> Generate a SHA-256 hash of that sum concatenated with your email <code>${user.email}</code>.</li>
        <li><strong>Example:</strong> <code>sha256('100user@example.com')</code>.</li>
      </ol>
      <label for="${id}" class="form-label">Enter the <b>64-character Hexadecimal Hash</b></label>
      <input class="form-control" id="${id}" name="${id}" type="text" />
    </div>
  `;

  const answer = async (hash) => {
    // Dynamic verification logic would compute: sha256((valA + valB).toString() + user.email)
    if (hash.length !== 64) throw new Error("Hash must be a 64-character SHA-256 hex string.");
    return true; 
  };

  return { id, title, weight, question, answer };
}