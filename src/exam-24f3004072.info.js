export default {
    // Basic exam settings
    title: "Python Data Preparation",
    start: "2025-12-31T00:00:00+05:30", // When exam becomes available
    hours: 3.0, // Time limit
  
    // Access control
    admin: (email) => email == "22f3001919@ds.study.iitm.ac.in", // Who can administer
    allowed: (email) => String(email || "").endsWith("@ds.study.iitm.ac.in"), // Who can take exam
  
    // Pre-exam display
    instructions: /* html */ `
      <h1>Instructions</h1>
      <ol>
        <li>Good Luck!</li>
      </ol>
    `,
  };