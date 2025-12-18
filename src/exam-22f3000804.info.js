export default {
    // Basic exam settings
    title: "TDS Bonus Activity - 22f3000804",
    start: "2024-12-18T00:00:00+05:30",
    hours: 2.0,

    // Access control
    admin: (email) => email === "22f3000804@ds.study.iitm.ac.in",
    allowed: (email) => email.endsWith(".iitm.ac.in") || email.endsWith("@ds.study.iitm.ac.in"),

    // Pre-exam display
    instructions: /* html */ `
    <h1>TDS Bonus Activity Questions</h1>
    <p><strong>Created by:</strong> 22f3000804</p>
    
    <h2>Instructions</h2>
    <ol>
      <li>This exam contains 5 questions covering various TDS topics.</li>
      <li>Each question tests a different skill from the Tools in Data Science course.</li>
      <li>You may use any tools, documentation, or resources to solve the problems.</li>
      <li>Ensure your answers are precise and match the expected format.</li>
    </ol>

    <h2>Topics Covered</h2>
    <ul>
      <li><strong>Markdown Processing:</strong> Converting Markdown to HTML</li>
      <li><strong>Data Transformation:</strong> CSV to JSON conversion with grouping</li>
      <li><strong>HTTP APIs:</strong> Using httpx to fetch and process API data</li>
      <li><strong>Pandas Analysis:</strong> DataFrame aggregation and groupby operations</li>
      <li><strong>Data Encoding:</strong> Base64 encoding and decoding</li>
    </ul>

    <h2>Scoring</h2>
    <p>Questions are weighted based on complexity. Total weight: 5.0</p>
  `,
};
