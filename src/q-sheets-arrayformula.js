import { en, Faker } from "https://cdn.jsdelivr.net/npm/@faker-js/faker@9/+esm";
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-sheets-bulk-transformation";
  const title = "Google Sheets: Bulk Data Transformation at Scale";

  const random = seedrandom(`${user.email}#${id}`);
  const faker = new Faker({ locale: [en], seed: Math.round(random() * 1000000) });

  const companyName = faker.company.name().replace(/[^a-zA-Z\s]/g, "").trim();
  const rowCount = [5000, 8000, 10000, 15000][Math.floor(random() * 4)];
  const transformations = [
    { func: "UPPER", desc: "uppercase standardization", column: "product_names" },
    { func: "TRIM", desc: "whitespace removal", column: "customer_emails" },
    { func: "PROPER", desc: "title case formatting", column: "city_names" },
    { func: "LOWER", desc: "lowercase normalization", column: "tags" }
  ];
  const selectedTransform = transformations[Math.floor(random() * transformations.length)];
  const verificationCode = Math.random().toString(36).substring(2, 10).toUpperCase();

  const answer = async (response) => {
    try {
      const url = new URL(response);
      if (!url.hostname.includes("docs.google.com") || !url.pathname.includes("/spreadsheets/")) {
        throw new Error("Must be a Google Sheets URL");
      }

      const sheetIdMatch = url.pathname.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (!sheetIdMatch) {
        throw new Error("Invalid Google Sheets URL format");
      }

      const sheetId = sheetIdMatch[1];
      const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=0`;

      const csvResponse = await fetch(csvUrl);
      if (!csvResponse.ok) {
        throw new Error("Sheet must be publicly accessible. Share with 'Anyone with the link can view'");
      }

      const csvText = await csvResponse.text();
      const rows = csvText.trim().split('\n');

      if (rows.length < rowCount * 0.9) {
        throw new Error(`Sheet must have approximately ${rowCount} rows, found ${rows.length}`);
      }

      const firstRow = rows[0].split(',');
      
      if (firstRow.length < 2) {
        throw new Error("Sheet must have at least 2 columns (A and B)");
      }

      let transformedCount = 0;
      for (let i = 1; i < Math.min(10, rows.length); i++) {
        const cols = rows[i].split(',');
        if (cols.length >= 2 && cols[1].trim() !== "") {
          transformedCount++;
        }
      }

      if (transformedCount < 5) {
        throw new Error("Column B must contain transformed values from ARRAYFORMULA");
      }

      if (!csvText.includes(verificationCode)) {
        throw new Error(`Sheet must include verification code: ${verificationCode}`);
      }

      if (!csvText.includes(user.email)) {
        throw new Error("Sheet must contain your email address");
      }

      return true;
    } catch (error) {
      throw new Error(`Validation failed: ${error.message}`);
    }
  };

  const question = html`
    <div class="mb-3">
      <h2>Data Operations: Bulk Text Transformation at Enterprise Scale</h2>
      <p>
        <strong>${companyName}</strong> manages a customer database with ${rowCount.toLocaleString()} records in Google Sheets. 
        The data quality team discovered that the <em>${selectedTransform.column}</em> column has inconsistent formatting, 
        causing CRM integration failures and costing $12K monthly in manual data cleanup.
      </p>

      <h3>Business Context</h3>
      <p>
        The operations team currently spends 40 hours per month manually correcting ${selectedTransform.column} data. 
        Previous attempts using dragged formulas caused sheet performance issues (5+ minute load times) and formula maintenance 
        nightmares when rows were inserted. The VP of Operations mandated a scalable solution using ARRAYFORMULA to enable 
        real-time ${selectedTransform.desc} across all ${rowCount.toLocaleString()} records.
      </p>

      <h3>Your Task</h3>
      <p>
        Create a Google Sheet demonstrating efficient bulk ${selectedTransform.desc} using ARRAYFORMULA. 
        This will serve as the reference implementation for ${companyName}'s data quality standards.
      </p>

      <h3>Requirements</h3>
      <ol>
        <li><strong>Column A:</strong> Generate ${rowCount.toLocaleString()} sample text values</li>
        <li><strong>Column B:</strong> Single ARRAYFORMULA in B1: <code>=ARRAYFORMULA(${selectedTransform.func}(A:A))</code></li>
        <li><strong>Verification:</strong> Add cell with code <code>${verificationCode}</code> (e.g., in C1)</li>
        <li><strong>Email:</strong> Include ${user.email} somewhere in the sheet (e.g., in D1)</li>
        <li><strong>Sharing:</strong> Set to "Anyone with the link can view"</li>
      </ol>

      <h3>Data Generation Options</h3>
      
      <h4>Option 1: Generate Synthetic Data (Recommended - Fast)</h4>
      <p>Use built-in Google Sheets formulas to generate ${rowCount.toLocaleString()} rows instantly:</p>
      <pre>// In A1, use:
=ARRAYFORMULA("Item " & SEQUENCE(${rowCount}, 1, 1, 1))

// Or with random text:
=ARRAYFORMULA("Product-" & RANDARRAY(${rowCount}, 1, 1000, 9999, TRUE))

// Or realistic names:
=ARRAYFORMULA("customer_" & SEQUENCE(${rowCount}) & "@example.com")</pre>

      <h4>Option 2: Use Real Public Datasets</h4>
      <p>Download CSV datasets and import into Google Sheets:</p>
      <ul>
        <li><strong>Kaggle Datasets:</strong> <a href="https://www.kaggle.com/datasets" target="_blank">https://www.kaggle.com/datasets</a> 
            (search for datasets with 10K+ rows like customer data, product catalogs)</li>
        <li><strong>Google Dataset Search:</strong> <a href="https://datasetsearch.research.google.com/" target="_blank">https://datasetsearch.research.google.com/</a>
            (find CSV files with product names, cities, tags)</li>
        <li><strong>Data.gov:</strong> <a href="https://data.gov/" target="_blank">https://data.gov/</a>
            (US government datasets - business registrations, city data)</li>
        <li><strong>UCI Machine Learning Repository:</strong> <a href="https://archive.ics.uci.edu/ml/index.php" target="_blank">https://archive.ics.uci.edu/</a>
            (classic datasets with text columns)</li>
        <li><strong>GitHub Awesome Public Datasets:</strong> <a href="https://github.com/awesomedata/awesome-public-datasets" target="_blank">https://github.com/awesomedata/awesome-public-datasets</a>
            (curated list of free datasets)</li>
      </ul>

      <h4>Option 3: Import from Google Sheets Template Gallery</h4>
      <ul>
        <li>Google Sheets → Template Gallery → Search "inventory" or "customer list"</li>
        <li>Duplicate template and extend to ${rowCount.toLocaleString()} rows</li>
      </ul>

      <h4>Option 4: Use Faker.js or Mockaroo</h4>
      <ul>
        <li><strong>Mockaroo:</strong> <a href="https://www.mockaroo.com/" target="_blank">https://www.mockaroo.com/</a>
            (generate realistic fake data, download CSV, import to Sheets)</li>
        <li><strong>Generatedata.com:</strong> <a href="https://generatedata.com/" target="_blank">https://generatedata.com/</a>
            (bulk generate names, emails, addresses)</li>
      </ul>

      <h3>ARRAYFORMULA Best Practices</h3>
      <ul>
        <li>Place single formula in B1, not B2 or below</li>
        <li>Reference entire column: <code>A:A</code>, not fixed range like <code>A1:A${rowCount}</code></li>
        <li>Formula auto-expands when new rows added to column A</li>
        <li>Sheet recalculates instantly vs. ${rowCount.toLocaleString()} individual formulas taking minutes</li>
      </ul>

      <h3>Expected Result</h3>
      <p>After applying <code>=ARRAYFORMULA(${selectedTransform.func}(A:A))</code> in B1:</p>
      <ul>
        <li>Column B shows transformed values for all ${rowCount.toLocaleString()} rows</li>
        <li>Sheet loads quickly (under 3 seconds)</li>
        <li>Adding new row in column A automatically applies transformation in column B</li>
        <li>Single formula is easier to audit and maintain</li>
      </ul>

      <label for="${id}" class="form-label">
        Google Sheets sharing link (must be public with "Anyone with the link can view")
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        required 
        placeholder="https://docs.google.com/spreadsheets/d/SHEET_ID/edit?usp=sharing" 
      />
      <p class="text-muted">
        Your sheet will be validated for: (1) ~${rowCount.toLocaleString()} rows in column A, 
        (2) ARRAYFORMULA in column B, (3) verification code ${verificationCode}, 
        (4) your email ${user.email}, and (5) public access.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

