export default {
  title: "Bonus Activity Exam",
  start: "2025-12-19T00:00:00+05:30",
  hours: 1.0,

  // Admin access - customize as needed
  admin: (email) => email === "admin@example.com",

  // Allow all .edu email addresses
  allowed: (email) => email.endsWith(".edu") || email.includes("iitm.ac.in"),

  instructions: `
    <h1>📝 Exam Instructions</h1>
    <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
      <h2>Welcome to the TDS Quiz Automation Exam!</h2>
      
      <h3>🎯 Exam Overview</h3>
      <p>This exam contains <strong>5 questions</strong> covering various aspects of data processing and LLM integration.</p>
      
      <h3>📋 Question Topics</h3>
      <ol>
        <li><strong>CSV Department Salary Analysis</strong></li>
        <li><strong>JSON Endpoint Analysis</strong></li>
        <li><strong>JSON Success Count</strong></li>
        <li><strong>LLM No Bypass Test</strong></li>
        <li><strong>PDF Complex Invoice Analysis</strong></li>
      </ol>
      
      <h3>✨ Good Luck!</h3>
      <p>If you have any questions, please reach out to the exam administrator.</p>
    </div>
  `,
};
