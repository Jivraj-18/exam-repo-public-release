export default {
  title: "TDS Practice Exam - Student 1",
  start: "2024-12-01T00:00:00+05:30",
  hours: 2,
  admin: (email) => email.endsWith("@iitm.ac.in"),
  allowed: (email) => email.endsWith("@ds.study.iitm.ac.in") || email.endsWith("@iitm.ac.in"),
  instructions: /* html */ `
    <h1>TDS Practice Exam</h1>
    <p>This exam covers fundamental data science tools and techniques.</p>
    <h2>Topics</h2>
    <ul>
      <li>JSON data extraction</li>
      <li>CSV data cleaning</li>
      <li>SQL queries</li>
      <li>Git commit analysis</li>
      <li>Data visualization</li>
    </ul>
  `,
};
