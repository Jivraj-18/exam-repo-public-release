import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1.25 }) {
  const id = "q-correlation-inverse";
  const title = "Analysis: Negative Correlation";
  const random = seedrandom(`${user.email}#${id}`);

  const rows = [];
  // Factor A: Positive corr
  // Factor B: Near zero
  // Factor C: Strong Negative corr (Target)
  
  for(let i=0; i<100; i++) {
    const outcome = Math.floor(random() * 100);
    
    // Reverse engineer inputs
    const factorA = outcome + (random() * 20); // Positive
    const factorB = Math.floor(random() * 100); // Random
    const factorC = 200 - outcome + (random() * 10); // Negative
    
    rows.push({ outcome, factorA, factorB, factorC });
  }

  const csv = "outcome,factor_a,factor_b,factor_c\n" + 
    rows.map(r => `${r.outcome},${r.factorA.toFixed(1)},${r.factorB},${r.factorC.toFixed(1)}`).join("\n");

  const answer = async (value) => {
    const cleaned = value.toLowerCase().replace(/[_\s]/g, "");
    const factors = ["factora", "factorb", "factorc"];
    
    if (!factors.includes(cleaned)) throw new Error("Please enter one of the factor names: factor_a, factor_b, or factor_c.");

    if (cleaned === "factora") {
        throw new Error("Incorrect. Factor_a has a positive correlation. We are looking for the strongest NEGATIVE correlation.");
    }
    
    if (cleaned !== "factorc") {
        throw new Error("Incorrect. This factor does not have the strongest negative relationship with the outcome.");
    }
    return true;
    };

  const question = html`
    <div class="mb-3">
      <h2>Identifying Friction Points</h2>
      <p>
        You are analyzing which factor most heavily <strong>hurts</strong> the outcome (Outcome decreases as Factor increases).
      </p>
      <p>
        Calculate the correlation coefficient for <code>factor_a</code>, <code>factor_b</code>, and <code>factor_c</code> against the <code>outcome</code>. 
        Identify which factor has the <strong>strongest negative</strong> correlation (closest to -1).
      </p>
      <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(new Blob([csv], {type: "text/csv"}), `${id}.csv`)}>
        Download factors.csv
      </button>
      <div class="mt-3">
        <label>Which factor has the strongest negative correlation? (e.g., factor_a)</label>
        <input type="text" class="form-control" id="${id}" name="${id}" required />
      </div>
    </div>
  `;

  return { id, title, weight, question, answer };
}