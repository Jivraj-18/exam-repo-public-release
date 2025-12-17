export default {
  title: "TDS 2025 Sep Bonus Activity - Example Questions",
  start: "2025-09-01T00:00:00+05:30",
  end: () => "2025-12-31T23:59:59+05:30",
  allowed: () => true,
  read: () => true,
  admin: (email) => true,
  instructions: /* html */ `
    <h1 class="display-3 my-5">
      TDS 2025 Sep Bonus Activity - Bonus Output
    </h1>

    <h2 class="display-6 my-5">Questions</h2>
    <p>These are the 5 custom questions created for the bonus activity:</p>
    <ol>
      <li>Calculate Sum from CSV Data</li>
      <li>Log Parsing - Count Errors</li>
      <li>Unit Conversion - Fahrenheit to Celsius</li>
      <li>Text Analysis - Most Frequent Word</li>
      <li>JSON Schema Validator</li>
    </ol>
  `,
};
