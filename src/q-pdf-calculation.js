export default function ({ user, weight }) {
  const invoiceItems = [
    { item: "Server", quantity: 1, unit_price: 3200.50 },
    { item: "SSD", quantity: 4, unit_price: 180.75 },
    { item: "RAM", quantity: 8, unit_price: 95.25 },
  ];

  return {
    id: "pdf-calculation",
    weight,
    question: `
      <h2>PDF Invoice Calculator</h2>
      <p><strong>Difficulty:</strong> 2</p>
      <p><strong>Personalized:</strong> No</p>

      <table border="1" style="border-collapse: collapse;">
        ${invoiceItems.map(i => `
          <tr>
            <td>${i.item}</td>
            <td>${i.quantity}</td>
            <td>$${i.unit_price.toFixed(2)}</td>
          </tr>
        `).join("")}
      </table>

      <p>Calculate the total invoice value.</p>
      <p><strong>Round to 2 decimals</strong></p>
    `,
    validate: (answer) => {
      const total = invoiceItems.reduce(
        (s, i) => s + i.quantity * i.unit_price,
        0
      );
      const expected = +total.toFixed(2);

      if (Math.abs(parseFloat(answer) - expected) < 0.01) {
        return { correct: true };
      }

      return {
        correct: false,
        feedback: `Expected ${expected}`,
      };
    },
  };
}
