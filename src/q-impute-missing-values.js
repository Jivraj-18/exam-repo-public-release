import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-impute-missing-values";
  const title = "Data Cleaning: Clinical Trials Data Imputation";

  const random = seedrandom(`${user.email}#${id}`);

  // Scenario Data Generation
  const size = 20;
  const rawData = Array.from({ length: size }, () => {
    // 20% chance of missing data due to "sensor error"
    if (random() < 0.2) return null;
    // Heart rate between 60 and 100
    return Math.floor(60 + random() * 40);
  });

  // Solution Logic
  const validValues = rawData.filter(v => v !== null);
  const mean = validValues.reduce((a, b) => a + b, 0) / validValues.length;
  // Round mean to 2 decimal places for consistency
  const roundedMean = Math.round(mean * 100) / 100;

  const imputedData = rawData.map(v => v === null ? roundedMean : v);
  const expectedSum = imputedData.reduce((a, b) => a + b, 0);
  const roundedExpectedSum = Math.round(expectedSum * 100) / 100;

  const answer = (input) => {
    const val = parseFloat(input);
    if (isNaN(val)) throw new Error("Answer must be a numeric value.");
    if (Math.abs(val - roundedExpectedSum) > 0.1) {
      throw new Error(`Incorrect sum. Check your mean calculation (round to 2 decimals) and imputation logic.`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Clinical Trials Data Imputation</h2>
      <h3>Context</h3>
      <p>
        <strong>MediTech Solutions</strong> manages clinical trial data for new cardiovascular drugs. 
        Reliable heart rate monitoring is critical, but wearable sensors often have connection drops, 
        resulting in missing data points (recorded as <code>null</code>).
      </p>
      <p>
        Before the statistical analysis team can run their models, "dirty" datasets must be cleaned. 
        The standard protocol is to <strong>impute</strong> missing values using the <strong>mean</strong> 
        of the available valid readings from that specific session.
      </p>
      <h3>Your Task</h3>
      <p>
        You are given a raw array of heart rate readings from a single patient session.
      </p>
      <ol>
        <li>Calculate the <strong>mean</strong> of all non-null values (round the mean to 2 decimal places).</li>
        <li>Replace every <code>null</code> value in the array with this calculated mean.</li>
        <li>Calculate the <strong>sum</strong> of the final, fully populated dataset.</li>
      </ol>
      <h3>Dataset</h3>
      <pre style="background: #f8f9fa; padding: 15px; border-radius: 5px; max-height: 200px; overflow-y: auto;"><code>${JSON.stringify(rawData)}</code></pre>
      
      <label for="${id}" class="form-label">
        What is the sum of the imputed dataset?
      </label>
      <input type="number" step="0.01" class="form-control" id="${id}" name="${id}" required />
      <p class="text-muted">Round your final answer to the nearest 2 decimal places.</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
