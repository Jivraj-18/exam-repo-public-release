export default {
  title: "Bonus Activity Exam – Roll 25ds2000003",
  start: "2025-12-18T00:00:00+05:30",
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
      <p>This exam contains <strong>5 questions</strong> covering various aspects of automated quiz solving, data processing, and LLM integration.</p>
      
      <h3>📋 Question Topics</h3>
      <ol>
        <li><strong>Git Log Formatting</strong> - Custom format strings for version control analytics (personalized)</li>
        <li><strong>OpenAI Embeddings API</strong> - Constructing JSON requests for text embeddings (personalized)</li>
        <li><strong>GitHub API Integration</strong> - Repository tree analysis with recursive parameter (personalized)</li>
        <li><strong>Pandas CSV Aggregation</strong> - Data processing and grouping operations (personalized)</li>
        <li><strong>LLM Prompt Engineering</strong> - Critical rules for automated system design (personalized)</li>
      </ol>
      
      <h3>⚠️ Important Rules</h3>
      <ul>
        <li>✅ All questions are <strong>mandatory</strong></li>
        <li>✅ Read each question carefully - some are personalized based on your email</li>
        <li>✅ Submit answers in the exact format requested</li>
        <li>⏱️ You have <strong>1 hour</strong> to complete the exam</li>
        <li>🚫 Do NOT refresh the page or switch tabs unnecessarily</li>
        <li>🚫 Do NOT submit before reviewing your answers</li>
      </ul>
      
      <h3>💡 Tips for Success</h3>
      <ul>
        <li>Pay attention to whether questions are personalized or not</li>
        <li>When extracting values, return ONLY the requested value (not the entire payload)</li>
        <li>Double-check calculations and offsets based on email length</li>
        <li>For multiple choice, submit only the letter (A, B, C, or D)</li>
      </ul>
      
      <h3>✨ Good Luck!</h3>
      <p>This exam tests your understanding of the automated quiz-solving system architecture. Apply what you've learned!</p>
      
      <hr>
      <p style="text-align: center; color: #666; font-size: 0.9em;">
        Questions created based on TDS Project 2 Quiz Automation System<br>
        Roll Number: 25ds2000003
      </p>
    </div>
  `,
};
