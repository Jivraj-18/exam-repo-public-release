// Exam metadata for roll number 22f1001438
export default {
  // Basic exam settings
  title: "TDS Exam - Roll No: 22f1001438",
  start: "2024-12-17T00:00:00+05:30", // Exam available from Dec 17, 2024
  hours: 2.5, // 2.5 hour time limit

  // Access control
  admin: (email) => email === "22f1001438@ds.study.iitm.ac.in" || email.endsWith("@iitm.ac.in"),
  allowed: (email) => email === "22f1001438@ds.study.iitm.ac.in" || email.endsWith("@ds.study.iitm.ac.in"),

  // Pre-exam display
  instructions: /* html */ `
    <h1>Tools in Data Science - Exam Questions</h1>
    <h2>Roll Number: 22f1001438</h2>
    
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 10px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: white;">📋 Exam Overview</h3>
      <p style="font-size: 1.1em; margin-bottom: 0;">
        This exam contains <strong>5 comprehensive coding questions</strong> covering modern data science topics
        including API integration, LLM applications, data processing, web scraping, and AI-assisted development.
      </p>
    </div>

    <div style="background: #f0f8ff; padding: 20px; border-left: 4px solid #2196F3; margin: 20px 0;">
      <h3>⏱️ Time and Submission</h3>
      <ul style="line-height: 1.8;">
        <li><strong>Time Limit:</strong> 2.5 hours to complete all questions</li>
        <li><strong>Auto-Save:</strong> Your work is automatically saved as you type</li>
        <li><strong>Testing:</strong> Click "Run Tests" to validate your solution</li>
        <li><strong>Final Submission:</strong> Submit when all tests pass</li>
      </ul>
    </div>

    <div style="background: #fff3cd; padding: 20px; border-left: 4px solid #ffc107; margin: 20px 0;">
      <h3>⚠️ Important Guidelines</h3>
      <ul style="line-height: 1.8;">
        <li><strong>Personalized Data:</strong> Each question uses data generated from your roll number</li>
        <li><strong>Read Carefully:</strong> Pay close attention to return formats and data structures</li>
        <li><strong>Edge Cases:</strong> Your solution should handle invalid inputs gracefully</li>
        <li><strong>Standard Library:</strong> Use only Python standard library unless specified</li>
        <li><strong>Function Signatures:</strong> Do not modify the provided function names or parameters</li>
        <li><strong>Comments:</strong> Add comments to explain complex logic</li>
      </ul>
    </div>

    <div style="background: #d4edda; padding: 20px; border-left: 4px solid #28a745; margin: 20px 0;">
      <h3>✅ Questions Overview</h3>
      
      <div style="margin: 15px 0;">
        <h4 style="margin-bottom: 5px;">Question 1: API Data Fetching and Processing</h4>
        <p style="margin: 5px 0; color: #666;">
          <strong>Topics:</strong> REST APIs, JSON parsing, data transformation, validation<br>
          <strong>Skills:</strong> Working with nested JSON, flattening data structures, computing aggregates
        </p>
      </div>

      <div style="margin: 15px 0;">
        <h4 style="margin-bottom: 5px;">Question 2: LLM Prompt Engineering</h4>
        <p style="margin: 5px 0; color: #666;">
          <strong>Topics:</strong> Large Language Models, prompt design, sentiment analysis, response parsing<br>
          <strong>Skills:</strong> Creating effective prompts, simulating LLM responses, extracting insights
        </p>
      </div>

      <div style="margin: 15px 0;">
        <h4 style="margin-bottom: 5px;">Question 3: CSV Data Cleaning</h4>
        <p style="margin: 5px 0; color: #666;">
          <strong>Topics:</strong> CSV parsing, data validation, error handling, imputation<br>
          <strong>Skills:</strong> Pattern matching, data type conversion, quality reporting
        </p>
      </div>

      <div style="margin: 15px 0;">
        <h4 style="margin-bottom: 5px;">Question 4: HTML Parsing and Extraction</h4>
        <p style="margin: 5px 0; color: #666;">
          <strong>Topics:</strong> Web scraping, regex patterns, HTML structure, data extraction<br>
          <strong>Skills:</strong> Pattern recognition, text processing, structured data creation
        </p>
      </div>

      <div style="margin: 15px 0;">
        <h4 style="margin-bottom: 5px;">Question 5: AI Code Generation</h4>
        <p style="margin: 5px 0; color: #666;">
          <strong>Topics:</strong> Code generation, specification parsing, validation, quality metrics<br>
          <strong>Skills:</strong> Template generation, rule-based validation, code analysis
        </p>
      </div>
    </div>

    <div style="background: #f8d7da; padding: 20px; border-left: 4px solid #dc3545; margin: 20px 0;">
      <h3>🚫 Academic Integrity</h3>
      <ul style="line-height: 1.8;">
        <li>This is an <strong>individual assessment</strong> - no collaboration allowed</li>
        <li>Do not share your solutions with others or use others' work</li>
        <li>You may refer to Python documentation and standard resources</li>
        <li>Do not use external AI tools (ChatGPT, Claude, etc.) during the exam</li>
        <li>Violations will be reported and may result in disciplinary action</li>
      </ul>
    </div>

    <div style="background: #e7f3ff; padding: 20px; border-left: 4px solid #0066cc; margin: 20px 0;">
      <h3>💡 Tips for Success</h3>
      <ul style="line-height: 1.8;">
        <li><strong>Start Simple:</strong> Get basic functionality working first, then handle edge cases</li>
        <li><strong>Test Frequently:</strong> Run tests after each major change to catch errors early</li>
        <li><strong>Read Error Messages:</strong> Test failures provide helpful hints about what's wrong</li>
        <li><strong>Time Management:</strong> Spend ~30 minutes per question, save time for review</li>
        <li><strong>Use Print Statements:</strong> Debug by printing intermediate values</li>
        <li><strong>Review Requirements:</strong> Make sure your return structure matches exactly</li>
      </ul>
    </div>

    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
      <h3 style="margin-top: 0; color: white;">🎯 Scoring Information</h3>
      <p style="font-size: 1.1em; margin-bottom: 10px;">
        Each question is worth <strong>1 point</strong> (Total: 5 points)
      </p>
      <p style="margin-bottom: 0;">
        Partial credit may be awarded based on test case results<br>
        All test cases must pass for full credit on each question
      </p>
    </div>

    <hr style="margin: 30px 0; border: none; border-top: 2px solid #ddd;">
    
    <div style="text-align: center; padding: 20px;">
      <h2 style="color: #667eea; margin-bottom: 10px;">Ready to Begin?</h2>
      <p style="font-size: 1.2em; color: #555;">
        Take a deep breath, read each question carefully, and show what you've learned! 🚀
      </p>
      <p style="font-size: 1.1em; margin-top: 20px;">
        <strong>Good luck! 🎓</strong>
      </p>
    </div>
  `,
};