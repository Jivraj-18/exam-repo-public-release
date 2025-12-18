export default {
  // Basic exam settings
  title: "TDS 2025 - Data Sourcing Advanced (Custom Questions)",
  start: "2025-01-15T18:30:00+05:30", // When exam becomes available
  hours: 2.0, // Time limit

  // Access control
  admin: (email) => email.endsWith("@ds.study.iitm.ac.in"), // Who can administer
  allowed: (email) => email.endsWith("@ds.study.iitm.ac.in"), // Who can take exam

  // Pre-exam display
  instructions: /* html */ `
    <h1>TDS 2025 - Data Sourcing Advanced</h1>
    <h2>Instructions</h2>
    <ol>
      <li><strong>Learn what you need.</strong> Reading material is provided, but feel free to skip it if you can answer the question.</li>
      <li><strong>Check answers regularly</strong> by pressing Check.</li>
      <li><strong>Save regularly</strong> by pressing Save.</li>
      <li><strong>Reloading is OK.</strong> Your answers are stored locally.</li>
      <li><strong>Browser may struggle.</strong> If you face issues, turn off security restrictions or try another browser.</li>
      <li><strong>Use anything.</strong> You can use any resources you want.</li>
      <li><strong>It's hackable.</strong> It's possible to get the answer to some questions by hacking the code for this quiz. That's allowed.</li>
      <li><strong>Have questions?</strong> Join the discussion on Discourse</li>
    </ol>
    
    <h2>Questions Overview</h2>
    <ul>
      <li>Scrape JSON API with Pagination (1 mark)</li>
      <li>Extract News from RSS Feeds (0.75 marks)</li>
      <li>Web Scraping with Authentication (1 mark)</li>
      <li>Convert CSV to Structured JSON (0.75 marks)</li>
      <li>Geocode Multiple Addresses in Bulk (0.5 marks)</li>
    </ul>
    
    <p><strong>Total: 4 marks</strong></p>
  `,
};
