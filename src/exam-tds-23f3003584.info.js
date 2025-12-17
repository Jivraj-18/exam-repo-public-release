export default {
  title: "TDS 23f3003584 Exam Questions",
  start: "2025-12-17T00:00:00+05:30", // Exam start time
  end: () => "2025-12-31T23:59:59+05:30", // Exam end time
  allowed: (email) => true, // Allow everyone to take the exam
  read: () => true, // Allow read-only access if needed
  admin: (email) =>
    email == "22f3001919@ds.study.iitm.ac.in" // Carlton D'Silva
    || email == "prasanna@study.iitm.ac.in" // PRASANNA S
    || email == "22f3002542@ds.study.iitm.ac.in" // JIVRAJ SINGH SHEKHAWAT
    || email == "22f3002460@ds.study.iitm.ac.in" // Hritik Roshan Maurya
    || email == "jkm@study.iitm.ac.in" // Jayakrishnan Warriem
    || email == "narayanan@study.iitm.ac.in" // Narayanan R
    || email == "sivaadithya@study.iitm.ac.in" // Sivaadithya M
    || email == "anand@study.iitm.ac.in" // Anand S
    || email == "23f3003584@study.iitm.ac.in", // T Gunavathy
  instructions: /* html */ `
    <h1 class="display-3 my-5">TDS 23f3003584 Exam</h1>

    <h2 class="display-6 my-5">Overview</h2>
    <p>This exam contains 5 custom questions covering CSV, JSON, and Time Series analysis.</p>

    <h2 class="display-6 my-5">Instructions</h2>
    <ol>
      <li>Answer all questions carefully.</li>
      <li>Check your answers using the provided "Check" button.</li>
      <li>Use any resources available to you.</li>
      <li>Submit your answers before the end time.</li>
    </ol>

    <h2 class="display-6 my-5">Questions Included</h2>
    <ol>
      <li>Validate CSV Column Types</li>
      <li>Extract Unique Nested Values from JSON</li>
      <li>Weighted Moving Average</li>
      <li>Filter and Aggregate JSON Data</li>
      <li>Flatten Nested Customer Orders</li>
    </ol>
  `,
};
