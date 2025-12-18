import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-llm-medical-extraction";
  const title = "LLM: Advanced Clinical Entity Extraction";
  const random = seedrandom(`${user.email}#${id}`);

  // 1. Generate Dates for Age Calculation
  const today = new Date();
  const currentYear = today.getFullYear();
  const birthYear = currentYear - (Math.floor(random() * 40) + 30); // Age 30-70
  const birthMonth = Math.floor(random() * 12) + 1;
  const birthDay = Math.floor(random() * 28) + 1;
  const dob = `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`;
  
  // Calculate exact age for validation
  let age = currentYear - birthYear;
  const m = (today.getMonth() + 1) - birthMonth;
  if (m < 0 || (m === 0 && today.getDate() < birthDay)) {
      age--;
  }

  // 2. Generate Medication Distractors (Active vs Discontinued)
  const medPairs = [
    { old: "Lisinopril", new: "Amlodipine", dose: "5mg", reason: "persistent cough" },
    { old: "Metformin", new: "Glipizide", dose: "10mg", reason: "GI upset" },
    { old: "Simvastatin", new: "Rosuvastatin", dose: "20mg", reason: "muscle pain" }
  ];
  const selectedMeds = medPairs[Math.floor(random() * medPairs.length)];

  // 3. Generate Vitals for formatting complexity
  const systolic = 120 + Math.floor(random() * 20);
  const diastolic = 75 + Math.floor(random() * 10);

  // 4. Construct Complex Text
  const text = `
    CLINICAL NOTE - CARDIOLOGY
    Patient Name: J. Doe
    DOB: ${dob}
    
    HPI: Patient returns for follow-up. 
    Review of Systems: Denies chest pain. 
    
    Medication Reconciliation:
    Patient was previously taking ${selectedMeds.old} but discontinued it last month due to ${selectedMeds.reason}. 
    Switched to ${selectedMeds.new} ${selectedMeds.dose} once daily, which is tolerated well.
    
    Vitals: BP ${systolic}/${diastolic} mmHg. HR 72 bpm.
    Allergies: NKDA (No Known Drug Allergies).
  `;

  const answer = async (response) => {
    try {
      const parsed = JSON.parse(response);
      
      // Validation 1: Age Calculation
      if (parsed.patient_age !== age) {
        throw new Error(`Incorrect Age. Expected ${age} based on DOB ${dob}.`);
      }

      // Validation 2: Active Meds Only (Distractor Check)
      if (parsed.current_medication?.name !== selectedMeds.new) {
        throw new Error("Incorrect Medication. Did you include the discontinued drug?");
      }
      
      // Validation 3: Dosage Extraction
      if (parsed.current_medication?.dosage !== selectedMeds.dose) {
        throw new Error("Incorrect Dosage extraction.");
      }

      // Validation 4: BP Parsing
      if (parsed.vitals?.systolic !== systolic || parsed.vitals?.diastolic !== diastolic) {
        throw new Error("Incorrect Vitals parsing.");
      }

      return true;
    } catch (e) {
      if (e instanceof SyntaxError) throw new Error("Invalid JSON format.");
      throw e;
    }
  };

  const question = html`
    <div class="mb-3">
      <h2>Case Study: Clinical Trial Data Normalization</h2>
      <p>
        <strong>Scenario:</strong> You are processing unstructured clinical notes for a real-time patient dashboard. 
        Unlike simple extraction, you must <strong>calculate</strong> derived fields (like Age), <strong>filter</strong> out irrelevant history (discontinued meds), and <strong>structure</strong> nested data.
      </p>
      
      <h3>Input Clinical Note</h3>
      <blockquote class="blockquote" style="font-size: 0.9em; background: #181818ff; padding: 15px; border-left: 5px solid #007bff;">
        <pre style="white-space: pre-wrap; margin: 0;">${text}</pre>
      </blockquote>

      <h3>Task</h3>
      <p>Extract and compute the following data into the exact JSON schema below:</p>
      <ol>
        <li><strong>patient_age</strong>: Calculate integer age from DOB (assume today is <code>${today.toISOString().split('T')[0]}</code>).</li>
        <li><strong>current_medication</strong>: The name and dosage of the <em>active</em> drug only. Ignore discontinued drugs.</li>
        <li><strong>vitals</strong>: Parse blood pressure into systolic and diastolic integers.</li>
      </ol>

      <p><strong>Required JSON Schema:</strong></p>
      <pre><code>
{
  "patient_age": 0,
  "current_medication": {
    "name": "String",
    "dosage": "String"
  },
  "vitals": {
    "systolic": 0,
    "diastolic": 0
  }
}
      </code></pre>

      <label for="${id}" class="form-label">JSON Output</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="8" style="font-family: monospace;"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution Explanation:

- Calculate Age:
  - Find the DOB in the text (e.g., 1980-05-12).
  - Calculate the age based on today's date.
  - Formula: Current Year - Birth Year (subtract 1 if the current month/day is before the birth month/day).

- Identify Current Medication:
  - Ignore the drug mentioned after "previously taking" or "discontinued".
  - Find the drug mentioned after "Switched to". This is the name.
  - The dosage (e.g., "5mg", "10mg") is listed right next to it.

- Parse Vitals:
  - Find the text "BP X/Y".
  - X is the systolic value.
  - Y is the diastolic value.

*/