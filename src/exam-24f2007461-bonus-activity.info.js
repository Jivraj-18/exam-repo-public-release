export default {
  title: "TDS Bonus Activity - Student 24f2007461",
  start: "2025-12-17T00:00:00+05:30",
  end: () => "2025-12-18T23:59:59+05:30",
  allowed: (email) => email === "24f2007461@ds.study.iitm.ac.in" || email.includes("admin"), // Allow specific student and admins
  read: () => true, // Allow all to read
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
      TDS Bonus Activity - Student 24f2007461
    </h1>

    <h2 class="display-6 my-5">Student Information</h2>
    <ul>
      <li><strong>Roll Number:</strong> 24f2007461</li>
      <li><strong>Branch:</strong> exam-24f2007461</li>
      <li><strong>Submission Date:</strong> December 17, 2025</li>
      <li><strong>Total Questions:</strong> 5</li>
      <li><strong>Points:</strong> 5 marks</li>
    </ul>

    <h2 class="display-6 my-5">Questions Overview</h2>
    <p>This bonus activity contains 5 original questions covering key concepts from the Tools in Data Science course:</p>
    
    <ol>
      <li><strong>Pandas DataFrame Merging and Aggregation</strong> (Medium)
        <ul>
          <li>Advanced DataFrame operations</li>
          <li>Merging, grouping, and conditional logic</li>
          <li>Business analytics with Pandas</li>
        </ul>
      </li>
      
      <li><strong>FastAPI Request Validation with Custom Validators</strong> (Medium-Hard)
        <ul>
          <li>API development with FastAPI</li>
          <li>Pydantic model validation</li>
          <li>Custom validators with regex</li>
        </ul>
      </li>
      
      <li><strong>Ethical Web Scraping with Rate Limiting</strong> (Medium)
        <ul>
          <li>Responsible web scraping practices</li>
          <li>Rate limiting and backoff strategies</li>
          <li>Error handling and logging</li>
        </ul>
      </li>
      
      <li><strong>Data Visualization Dashboard with Plotly</strong> (Medium)
        <ul>
          <li>Interactive visualizations</li>
          <li>Multi-plot dashboards</li>
          <li>Statistical analysis and correlation</li>
        </ul>
      </li>
      
      <li><strong>Git Collaborative Workflow Simulation</strong> (Easy-Medium)
        <ul>
          <li>Version control best practices</li>
          <li>Branching and merging strategies</li>
          <li>Collaboration workflows</li>
        </ul>
      </li>
    </ol>

    <h2 class="display-6 my-5">Learning Outcomes Covered</h2>
    <ul>
      <li><strong>Data Manipulation:</strong> Advanced Pandas operations for real-world data analysis</li>
      <li><strong>API Development:</strong> Creating robust backend services with validation</li>
      <li><strong>Web Scraping:</strong> Ethical data extraction with proper rate limiting</li>
      <li><strong>Data Visualization:</strong> Interactive dashboards for data storytelling</li>
      <li><strong>Version Control:</strong> Professional Git workflows for team collaboration</li>
    </ul>

    <h2 class="display-6 my-5">Question Difficulty Distribution</h2>
    <ul>
      <li><strong>Easy-Medium:</strong> 1 question (Git Workflow)</li>
      <li><strong>Medium:</strong> 3 questions (Pandas, Web Scraping, Visualization)</li>
      <li><strong>Medium-Hard:</strong> 1 question (FastAPI Validation)</li>
    </ul>

    <h2 class="display-6 my-5">How to Approach These Questions</h2>
    <ol>
      <li><strong>Read the problem statement carefully</strong> - Each question includes detailed requirements</li>
      <li><strong>Understand the expected output</strong> - Sample code templates are provided</li>
      <li><strong>Test your solutions</strong> - Sample data generation is included</li>
      <li><strong>Follow best practices</strong> - Code should be clean, documented, and efficient</li>
      <li><strong>Use appropriate libraries</strong> - Leverage the right tools for each task</li>
    </ol>

    <h2 class="display-6 my-5">Submission Guidelines</h2>
    <p>These questions are designed to be:</p>
    <ul>
      <li>Practical and applicable to real-world scenarios</li>
      <li>Comprehensive in testing TDS concepts</li>
      <li>Suitable for use in future graded assignments</li>
      <li>Progressive in difficulty to accommodate different skill levels</li>
    </ul>

    <div class="alert alert-info mt-4">
      <h4>Note for Instructors</h4>
      <p>These questions have been created as part of the TDS Bonus Activity and are ready for integration into the main course material for January 2026.</p>
    </div>
  `,
};
