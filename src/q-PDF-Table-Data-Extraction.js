// Question 4: PDF table extraction
export async function question4({ user, weight = 1 }) {
  const id = "q-pdf-table-extract";
  const title = "PDF Table Data Extraction (1 mark)";

  const answer = "3847";

  const question = html`
    <div class="mb-3">
      <h4>Financial Report Analysis</h4>
      <p>
        <strong>Scenario:</strong> FinanceBot Analytics processes quarterly reports for investment firms. 
        You need to extract revenue data from a PDF financial statement.
      </p>
      <p>
        <strong>Your Task:</strong><br/>
        Download the PDF: 
        <a href="https://example.com/reports/Q4-2024-revenue.pdf" target="_blank">Q4 2024 Revenue Report</a><br/>
        1. Use a PDF extraction library (Tabula, Camelot, or PyMuPDF)<br/>
        2. Locate the "Regional Sales" table on page 3<br/>
        3. Extract revenue values for regions: APAC, EMEA, and Americas<br/>
        4. Filter rows where growth rate is >= 15%<br/>
        5. Calculate the total revenue for filtered regions
      </p>
      <p>
        <strong>Tools:</strong> Python with <code>tabula-py</code> or <code>camelot-py</code>
      </p>
      <label for="${id}" class="form-label">Total revenue (in thousands):</label>
      <input type="number" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}