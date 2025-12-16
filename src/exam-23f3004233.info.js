export default {
  // Basic exam settings
  title: "Tools in Data Science - Practice Questions (23f3004233)",
  start: "2024-12-01T00:00:00+05:30", // Exam available from this date
  hours: 2.0, // Time limit: 2 hours

  // Access control
  admin: (email) => email === "23f3004233@ds.study.iitm.ac.in", // Admin access
  allowed: (email) => true, // Allow anyone to take the exam for testing

  // Pre-exam instructions
  instructions: /* html */ `
    <h1>Tools in Data Science - Practice Questions</h1>
    <p><strong>Roll Number:</strong> 23f3004233</p>
    
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