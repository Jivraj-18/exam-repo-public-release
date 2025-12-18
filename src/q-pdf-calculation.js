export default function ({ user, weight }) {
  const invoiceItems = [
    { item: "Laptop", quantity: 2, unit_price: 899.99 },
    { item: "Mouse", quantity: 5, unit_price: 25.50 },
    { item: "Keyboard", quantity: 3, unit_price: 75.00 },
    { item: "Monitor", quantity: 2, unit_price: 450.75 },
  ];

  return {
    id: "pdf-calculation",
    weight,
    question: `
      <h2>PDF Invoice Calculator</h2>
      <p><strong>Difficulty:</strong> 2 (next URL revealed even if wrong)</p>
      <p><strong>Personalized:</strong> No.</p>
      <ol>
        <li>Extract all line items from the invoice below</li>
        <li>Calculate: <code>sum(Quantity × Unit Price)</code> for all items</li>
        <li>Round the total to 2 decimal places</li>
        <li>Submit as a number (e.g., 1234.56)</li>
      </ol>
      <h3>Invoice Line Items:</h3>
      <table border="1" style="border-collapse: collapse; margin: 10px 0;">
        <thead>
          <tr>
            <th style="padding: 8px;">Item</th>
            <th style="padding: 8px;">Quantity</th>
            <th style="padding: 8px;">Unit Price</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceItems.map(item => `
            <tr>
              <td style="padding: 8px;">${item.item}</td>
              <td style="padding: 8px;">${item.quantity}</td>
              <td style="padding: 8px;">$${item.unit_price.toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p><strong>Note:</strong> This simulates extracting text from a PDF and performing calculations.</p>
    `,
    validate: (answer) => {
      const total = invoiceItems.reduce((sum, item) => {
        return sum + (item.quantity * item.unit_price);
      }, 0);
      const expected = parseFloat(total.toFixed(2));
      const submitted = parseFloat(answer);
      
      if (Math.abs(submitted - expected) < 0.01) {
        return { correct: true };
      }
      
      return {
        correct: false,
        feedback: `Expected ${expected.toFixed(2)}. Calculation: (2×899.99) + (5×25.50) + (3×75.00) + (2×450.75)`,
      };
    },
  };
}
