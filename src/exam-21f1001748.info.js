export default {
  title: "TDS Exam - Roll No: 21f1001748",
  start: "2025-12-18T00:00:00+05:30",
  hours: 3.0,

  admin: (email) => email === "21f1001748@ds.study.iitm.ac.in",
  allowed: (email) => email.endsWith("@ds.study.iitm.ac.in"),

  instructions: /* html */ `
    <h1>TDS Exam Questions</h1>
    <h2>Roll Number: 21f1001748</h2>
    
    <h3>Instructions:</h3>
    <ol>
      <li>Answer all 5 questions</li>
      <li>Each question covers a different TDS module</li>
      <li>Provide complete, working code solutions</li>
      <li>Include necessary imports and dependencies</li>
      <li>Time limit: 3 hours</li>
    </ol>
    
    <h3>Topics Covered:</h3>
    <ul>
      <li>Question 1: Docker & FastAPI Deployment</li>
      <li>Question 2: Web Scraping & Data Transformation</li>
      <li>Question 3: Geospatial Analysis</li>
      <li>Question 4: RAG System with LLMs</li>
      <li>Question 5: Data Visualization Dashboard</li>
    </ul>
  `,
};