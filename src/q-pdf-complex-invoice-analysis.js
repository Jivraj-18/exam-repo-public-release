import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function ({ user, weight }) {
  const invoiceData = {
    invoiceNumber: "INV-2024-11567",
    invoiceDate: "2024-11-15",
    dueDate: "2024-12-15",
    customer: "Tech Solutions Inc.",
    items: [
      { 
        itemCode: "HW-001",
        description: "Enterprise Server", 
        quantity: 3, 
        unitPrice: 2499.99,
        category: "Hardware",
        taxRate: 0.15,
        discountPercent: 5,
        warrantyYears: 3
      },
      { 
        itemCode: "SW-045",
        description: "Database License", 
        quantity: 10, 
        unitPrice: 599.00,
        category: "Software",
        taxRate: 0.08,
        discountPercent: 10,
        warrantyYears: 1
      },
      { 
        itemCode: "HW-023",
        description: "Network Switch", 
        quantity: 5, 
        unitPrice: 875.50,
        category: "Hardware",
        taxRate: 0.15,
        discountPercent: 0,
        warrantyYears: 2
      },
      { 
        itemCode: "SV-102",
        description: "Installation Service", 
        quantity: 8, 
        unitPrice: 150.00,
        category: "Service",
        taxRate: 0.12,
        discountPercent: 0,
        warrantyYears: 0
      },
      { 
        itemCode: "SW-078",
        description: "Security Suite", 
        quantity: 15, 
        unitPrice: 299.99,
        category: "Software",
        taxRate: 0.08,
        discountPercent: 15,
        warrantyYears: 1
      },
      { 
        itemCode: "HW-067",
        description: "Backup Storage Array", 
        quantity: 2, 
        unitPrice: 3200.00,
        category: "Hardware",
        taxRate: 0.15,
        discountPercent: 8,
        warrantyYears: 5
      },
      { 
        itemCode: "SV-205",
        description: "Training Session", 
        quantity: 4, 
        unitPrice: 450.00,
        category: "Service",
        taxRate: 0.12,
        discountPercent: 0,
        warrantyYears: 0
      },
      { 
        itemCode: "SW-091",
        description: "Monitoring Tools", 
        quantity: 12, 
        unitPrice: 125.00,
        category: "Software",
        taxRate: 0.08,
        discountPercent: 10,
        warrantyYears: 1
      },
    ],
    paymentTerms: {
      earlyPaymentDays: 10,
      earlyPaymentDiscount: 0.02, // 2% discount if paid within 10 days
      latePaymentFeePercent: 0.015 // 1.5% monthly late fee
    }
  };

  return {
    id: "pdf-complex-invoice-analysis",
    weight,
    question: html`
      <h2>Advanced PDF Invoice Processing & Analysis</h2>
      
      <h3>Scenario:</h3>
      <p>You are processing a complex B2B invoice with multiple product categories, variable tax rates, quantity discounts, and early payment incentives.</p>
      
      <h3>Multi-Step Calculation Task:</h3>
      <ol>
        <li><strong>For EACH line item, calculate:</strong>
          <ul>
            <li>Subtotal = Quantity × Unit Price</li>
            <li>Discount Amount = Subtotal × (Discount % / 100)</li>
            <li>Subtotal After Discount = Subtotal - Discount Amount</li>
            <li>Tax Amount = Subtotal After Discount × Tax Rate</li>
            <li>Line Total = Subtotal After Discount + Tax Amount</li>
          </ul>
        </li>
        <li><strong>Calculate invoice totals:</strong>
          <ul>
            <li>Sum all line totals = Invoice Total</li>
          </ul>
        </li>
        <li><strong>Filter and calculate Hardware-only metrics:</strong>
          <ul>
            <li>Count only items where category = "Hardware"</li>
            <li>Sum the warranty years for Hardware items only</li>
            <li>Hardware Bonus = (Hardware Item Count × 10) + (Total Hardware Warranty Years × 5)</li>
          </ul>
        </li>
        <li><strong>Apply early payment discount:</strong>
          <ul>
            <li>If customer pays within 10 days, they get 2% off the Invoice Total</li>
            <li>Final Amount = Invoice Total × 0.98</li>
          </ul>
        </li>
        <li><strong>Final Answer Calculation:</strong>
          <br><code>Final Answer = Final Amount + Hardware Bonus</code>
          <br>(Round to 2 decimal places)
        </li>
      </ol>
      
      <h3>Invoice Details:</h3>
      <div style="background: #f5f5f5; padding: 10px; margin: 10px 0; border-radius: 5px;">
        <strong>Invoice #:</strong> ${invoiceData.invoiceNumber}<br>
        <strong>Date:</strong> ${invoiceData.invoiceDate}<br>
        <strong>Due Date:</strong> ${invoiceData.dueDate}<br>
        <strong>Customer:</strong> ${invoiceData.customer}<br>
        <strong>Payment Terms:</strong> 2% discount if paid within ${invoiceData.paymentTerms.earlyPaymentDays} days
      </div>
      
      <table border="1" style="border-collapse: collapse; margin: 10px 0; width: 100%; font-size: 13px;">
        <thead>
          <tr style="background-color: #e0e0e0;">
            <th style="padding: 6px;">Code</th>
            <th style="padding: 6px;">Description</th>
            <th style="padding: 6px;">Category</th>
            <th style="padding: 6px;">Qty</th>
            <th style="padding: 6px;">Unit Price</th>
            <th style="padding: 6px;">Discount %</th>
            <th style="padding: 6px;">Tax Rate</th>
            <th style="padding: 6px;">Warranty (Yrs)</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceData.items.map(item => html`
            <tr>
              <td style="padding: 6px;">${item.itemCode}</td>
              <td style="padding: 6px;">${item.description}</td>
              <td style="padding: 6px;"><strong>${item.category}</strong></td>
              <td style="padding: 6px; text-align: center;">${item.quantity}</td>
              <td style="padding: 6px; text-align: right;">$${item.unitPrice.toFixed(2)}</td>
              <td style="padding: 6px; text-align: center;">${item.discountPercent}%</td>
              <td style="padding: 6px; text-align: center;">${(item.taxRate * 100).toFixed(0)}%</td>
              <td style="padding: 6px; text-align: center;">${item.warrantyYears}</td>
            </tr>
          `)}
        </tbody>
      </table>
      
      <p><strong>Important Notes:</strong></p>
      <ul>
        <li>Discounts are applied BEFORE tax calculation</li>
        <li>Early payment discount applies to the entire invoice total</li>
        <li>Hardware Bonus = (Hardware Items × 10) + (Hardware Warranty Years × 5)</li>
        <li>Assume customer will pay early to receive the 2% discount</li>
      </ul>
      
      <p><strong>Submit your final calculated amount rounded to 2 decimal places</strong></p>
    `,
    validate: (answer) => {
      // Your validation code here (same as before)
    },
  };
}
