export default {
  title: "Data Science Assessment - Set A",
  start: "2024-12-20T09:00:00+05:30", 
  hours: 1.5, 

  admin: (email) => email === "admin@example.com", 
  allowed: (email) => true, 

  instructions: /* html */ `
    <h1>Assessment Instructions</h1>
    <ol>
      <li>This exam contains 5 computational questions.</li>
      <li>Each dataset is generated uniquely for your ID (24f1001482).</li>
      <li>You may use Python, Excel, or SQL to find the answers.</li>
    </ol>
  `,
};