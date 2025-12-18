import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-pdf-table-extraction";
  const title = "PDF Table Extraction";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  // Generate invoice data
  const companies = ["TechCorp Inc.", "DataSoft Ltd.", "CloudBase Systems", "Nexus Solutions", "InnovateTech"];
  const products = ["Cloud Storage", "API Access", "Analytics Suite", "Security Module", "Support Plan"];
  
  const invoiceItems = [];
  const itemCount = randInt(4, 7);
  
  for (let i = 0; i < itemCount; i++) {
    invoiceItems.push({
      item: pick(products) + " " + String.fromCharCode(65 + randInt(0, 5)),
      quantity: randInt(1, 10),
      unitPrice: randInt(50, 500),
    });
  }

  invoiceItems.forEach(item => {
    item.total = item.quantity * item.unitPrice;
  });
  
  const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);
  const taxRate = pick([0.05, 0.08, 0.10, 0.12, 0.18]);
  const taxAmount = Math.round(subtotal * taxRate * 100) / 100;
  const grandTotal = Math.round((subtotal + taxAmount) * 100) / 100;

  const invoiceNumber = `INV-${randInt(10000, 99999)}`;
  const company = pick(companies);
  const invoiceDate = `2024-${String(randInt(1, 12)).padStart(2, "0")}-${String(randInt(1, 28)).padStart(2, "0")}`;

  // Create HTML content for PDF-like display
  let tableRows = invoiceItems.map(item => 
    `<tr><td>${item.item}</td><td>${item.quantity}</td><td>$${item.unitPrice}</td><td>$${item.total}</td></tr>`
  ).join('\n');

  const pdfHtmlContent = `<!DOCTYPE html>
<html>
<head>
  <title>Invoice ${invoiceNumber}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
    h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
    .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
    .info { margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
    th { background-color: #4CAF50; color: white; }
    tr:nth-child(even) { background-color: #f2f2f2; }
    .totals { text-align: right; margin-top: 20px; }
    .totals p { margin: 5px 0; }
    .grand-total { font-size: 1.2em; font-weight: bold; color: #4CAF50; }
  </style>
</head>
<body>
  <h1>INVOICE</h1>
  <div class="header">
    <div class="info">
      <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
      <p><strong>Date:</strong> ${invoiceDate}</p>
    </div>
    <div class="info">
      <p><strong>From:</strong> ${company}</p>
    </div>
  </div>
  
  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Quantity</th>
        <th>Unit Price</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      ${tableRows}
    </tbody>
  </table>
  
  <div class="totals">
    <p>Subtotal: $${subtotal}</p>
    <p>Tax (${Math.round(taxRate * 100)}%): $${taxAmount}</p>
    <p class="grand-total">GRAND TOTAL: $${grandTotal}</p>
  </div>
</body>
</html>`;

  // Create blob for download
  const blob = new Blob([pdfHtmlContent], { type: "text/html" });

  // Questions about the invoice
  const questions = [
    { ask: "grand total", answer: grandTotal },
    { ask: "subtotal (before tax)", answer: subtotal },
    { ask: "tax amount", answer: taxAmount },
    { ask: "total number of items (sum of all quantities)", answer: invoiceItems.reduce((sum, item) => sum + item.quantity, 0) },
    { ask: "number of line items in the invoice", answer: itemCount },
  ];
  
  const targetQuestion = pick(questions);
  const expectedAnswer = targetQuestion.answer;

  const answer = (input) => {
    const cleaned = String(input).trim().replace(/[$,\s]/g, "");
    const num = parseFloat(cleaned);
    if (Math.abs(num - expectedAnswer) > 0.01) {
      throw new Error(`Expected ${expectedAnswer}`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>PDF Invoice Data Extraction</h2>
      <p>
        <strong>Scenario:</strong> You're automating accounts payable. 
        Download the invoice file and extract data from the table.
      </p>
      
      <p>
        Download the invoice:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `invoice-${invoiceNumber}.html`)}>
          📄 Download Invoice (${invoiceNumber})
        </button>
      </p>
      
      <p class="text-muted">
        <strong>Note:</strong> This is an HTML invoice file. You can:
        <ul>
          <li>Open it in a browser and use DevTools to extract data</li>
          <li>Parse it with Python's <code>BeautifulSoup</code></li>
          <li>Use <code>pandas.read_html()</code> to extract the table</li>
          <li>Print to PDF if you want to practice with PDF tools like <code>tabula-py</code></li>
        </ul>
      </p>
      
      <h3>Your Task</h3>
      <ol>
        <li>Download and open the invoice</li>
        <li>Extract the table data</li>
        <li>Calculate or find the <strong>${targetQuestion.ask}</strong></li>
      </ol>

      <label for="${id}" class="form-label">
        What is the ${targetQuestion.ask}? (without $ sign)
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}
