export default function ({ user, weight }) {
  return {
    id: "csv-aggregate",
    weight,
    question: `
      <h2>CSV Data Aggregation</h2>
      <p><strong>Difficulty:</strong> 2 (next URL revealed even if wrong)</p>
      <p><strong>Personalized:</strong> Yes (based on email length).</p>
      <ol>
        <li>Download the CSV file from this URL: <code>/data/sales_2024.csv</code></li>
        <li>Calculate the total revenue by summing all values in the <code>revenue</code> column</li>
        <li>Apply offset: <code>(length of your email) mod 10</code></li>
        <li>Final answer = base_sum + offset, rounded to 2 decimal places</li>
        <li>Submit the number as your answer</li>
      </ol>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>CSV Content (for testing):</strong></p>
      <pre>
Product ID,Product Name,Revenue,Date
P001,Widget A,1250.50,2024-01-15
P002,Widget B,890.25,2024-01-16
P003,Widget C,2340.75,2024-01-17
P004,Widget D,567.00,2024-01-18
P005,Widget E,1823.50,2024-01-19
      </pre>
    `,
    validate: (answer) => {
      const baseSum = 1250.50 + 890.25 + 2340.75 + 567.00 + 1823.50; // 6872.00
      const offset = user.email.length % 10;
      const expected = (baseSum + offset).toFixed(2);
      const submitted = parseFloat(answer).toFixed(2);
      
      if (submitted === expected) {
        return { correct: true };
      }
      return {
        correct: false,
        feedback: `Expected ${expected}, got ${answer}. Base sum is 6872.00, offset is ${offset}.`,
      };
    },
  };
}
