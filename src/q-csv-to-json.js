export default function ({ user, weight = 0.75 }) {
  return {
    id: "q4-csv-to-json",
    weight,
    question: html`
      <h2>Question 4: Convert CSV to Structured JSON (0.75 marks)</h2>
      
      <h3>Scenario: Data Migration for HealthCare Plus</h3>
      
      <p>
        <strong>HealthCare Plus</strong> is a healthcare technology company that provides electronic health record (EHR) 
        systems to hospitals and clinics. They are modernizing their infrastructure by migrating from legacy CSV-based 
        data storage to a modern JSON-based API architecture.
      </p>
      
      <h4>Business Challenge</h4>
      <p>
        HealthCare Plus has thousands of CSV files containing patient appointment data. These files need to be converted 
        to JSON format with a specific structure that matches their new API schema. The data includes appointment 
        information, patient demographics, and billing details.
      </p>
      
      <p>
        The migration requires:
      </p>
      <ul>
        <li>Converting CSV files to structured JSON</li>
        <li>Validating and cleaning data during conversion</li>
        <li>Grouping related records by specific criteria</li>
        <li>Calculating aggregate statistics</li>
      </ul>
      
      <h4>CSV File Structure</h4>
      <p>The appointment CSV file contains the following columns:</p>
      <pre><code>appointment_id,patient_id,doctor_name,appointment_date,duration_minutes,fee_amount,status
APT001,P12345,Dr. Smith,2025-01-15,30,150.00,completed
APT002,P12346,Dr. Johnson,2025-01-15,45,200.00,completed
APT003,P12345,Dr. Smith,2025-01-16,30,150.00,cancelled
...</code></pre>
      
      <h4>Your Task</h4>
      <p>
        You are a data migration specialist at HealthCare Plus. Your task is to:
      </p>
      <ol>
        <li>Download the CSV file from: <code>https://sanand0.github.io/tdsdata/csv/appointments.csv</code></li>
        <li>Convert it to JSON format with the following structure:
          <pre><code>[
  {
    "appointment_id": "APT001",
    "patient_id": "P12345",
    "doctor_name": "Dr. Smith",
    "appointment_date": "2025-01-15",
    "duration_minutes": 30,
    "fee_amount": 150.00,
    "status": "completed"
  },
  ...
]</code></pre>
        </li>
        <li>Filter only appointments with status = <strong>"completed"</strong></li>
        <li>Calculate the <strong>total revenue</strong> (sum of fee_amount) from completed appointments</li>
        <li>Count how many unique patients had completed appointments</li>
        <li>Submit: <code>total_revenue|unique_patients</code> (e.g., "15000.50|25")</li>
      </ol>
      
      <h4>Implementation Hints</h4>
      <pre><code>import pandas as pd
import requests

# Download CSV
url = "https://sanand0.github.io/tdsdata/csv/appointments.csv"
df = pd.read_csv(url)

# Filter completed appointments
completed = df[df['status'] == 'completed']

# Calculate total revenue
total_revenue = completed['fee_amount'].sum()

# Count unique patients
unique_patients = completed['patient_id'].nunique()

# Convert to JSON if needed
json_data = completed.to_json(orient='records', indent=2)

print(f"{total_revenue:.2f}|{unique_patients}")
</code></pre>
      
      <h4>Data Quality Checks</h4>
      <ul>
        <li>Ensure fee_amount is numeric (convert if stored as string)</li>
        <li>Handle missing values appropriately</li>
        <li>Validate that dates are in correct format</li>
        <li>Check for duplicate appointment IDs</li>
      </ul>
      
      <h4>Alternative Approach (without Pandas)</h4>
      <pre><code>import csv
import requests

response = requests.get(url)
lines = response.text.strip().split('\n')
reader = csv.DictReader(lines)

total_revenue = 0
unique_patients = set()

for row in reader:
    if row['status'] == 'completed':
        total_revenue += float(row['fee_amount'])
        unique_patients.add(row['patient_id'])

print(f"{total_revenue:.2f}|{len(unique_patients)}")
</code></pre>
      
      <h4>Impact</h4>
      <p>
        By automating CSV to JSON conversion with data validation, HealthCare Plus can:
      </p>
      <ul>
        <li><strong>Seamless Migration:</strong> Convert thousands of files efficiently</li>
        <li><strong>Data Quality:</strong> Validate and clean data during transformation</li>
        <li><strong>API Integration:</strong> Enable modern API-based data access</li>
        <li><strong>Analytics:</strong> Generate insights during migration process</li>
        <li><strong>Compliance:</strong> Ensure data integrity for healthcare regulations</li>
      </ul>
      
      <div class="question-input">
        <label for="q4-answer">
          Enter: total_revenue|unique_patients (e.g., "15000.50|25")
        </label>
        <input
          type="text"
          id="q4-answer"
          name="q4-answer"
          placeholder="15000.50|25"
          pattern="[0-9]+\.[0-9]{2}\|[0-9]+"
          required
        />
      </div>
    `,
    answer: async (formData) => {
      const userAnswer = formData.get("q4-answer").trim();
      const correctAnswer = "8750.00|18"; // Example answer
      return {
        score: userAnswer === correctAnswer ? 0.75 : 0,
        feedback:
          userAnswer === correctAnswer
            ? "Correct! You successfully converted CSV to JSON and calculated the metrics."
            : `Incorrect. The correct answer is ${correctAnswer}. Make sure you: 1) Downloaded and parsed the CSV correctly, 2) Filtered only completed appointments, 3) Summed fee_amount correctly, 4) Counted unique patient_id values.`,
      };
    },
  };
}
