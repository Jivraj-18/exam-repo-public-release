export default {
  title: "TDS 2025 Sep Bonus Activity - 23f3004233",
  start: "2024-12-01T00:00:00+05:30",
  end: () => "2026-12-31T23:59:59+05:30",
  allowed: () => true, // Allow all logged-in users to submit
  read: () => true, // Allow all to read (non-logged-in users in reader mode)
  admin: (email) =>
    email == "22f3001919@ds.study.iitm.ac.in" // Carlton D'Silva
    || email == "prasanna@study.iitm.ac.in" // PRASANNA S
    || email == "22f3002542@ds.study.iitm.ac.in" // JIVRAJ SINGH SHEKHAWAT
    || email == "22f3002460@ds.study.iitm.ac.in" // Hritik Roshan Maurya
    || email == "jkm@study.iitm.ac.in" // Jayakrishnan Warriem
    || email == "narayanan@study.iitm.ac.in" // Narayanan R
    || email == "sivaadithya@study.iitm.ac.in" // Sivaadithya M
    || email == "anand@study.iitm.ac.in", // Anand S
  instructions: /* html */ `
    <h1 class="display-3 my-5">
      TDS 2025 Sep Bonus Activity - 23f3004233
    </h1>

    <h2>Instructions</h2>
    <ol>
      <li><strong>Total Questions:</strong> 5 questions covering different TDS modules</li>
      <li><strong>Time Limit:</strong> 2 hours</li>
      <li><strong>Scoring:</strong> Each question carries equal weight (1 mark each)</li>
      <li>Write your code in the provided text areas</li>
      <li>Make sure your code is well-commented and follows best practices</li>
      <li>You can use any libraries mentioned in the question requirements</li>
    </ol>

    <h2>Topics Covered</h2>
    <ul>
      <li><strong>Question 1:</strong> FastAPI + Pydantic Validation (Deployment)</li>
      <li><strong>Question 2:</strong> HTML Parsing with BeautifulSoup (Data Sourcing)</li>
      <li><strong>Question 3:</strong> DuckDB Data Pipeline (Data Preparation)</li>
      <li><strong>Question 4:</strong> SQL Window Functions (Data Analysis)</li>
      <li><strong>Question 5:</strong> LLM Structured Extraction (AI/LLMs)</li>
    </ul>

    <h2>Important Notes</h2>
    <ul>
      <li>Read each question carefully before starting</li>
      <li>Check the "Help" sections for hints and tips</li>
      <li>Ensure your code handles edge cases</li>
      <li>Test your solutions with the provided examples</li>
    </ul>

    <p><strong>Good luck!</strong></p>
  `,
};