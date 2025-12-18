import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1.25 }) {
  const id = "q-python-data-cleaning";
  const title = "Python: Data Cleaning and Aggregation";

  const random = seedrandom(`${user.email}#${id}`);

  const firstNames = ["John", "Jane", "Robert", "Mary", "Michael", "Patricia", "David", "Linda", "James", "Barbara"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];

  // Generate messy data with 25-35 rows
  const rowCount = 25 + Math.floor(random() * 11);
  const rows = [["customer_id", "name", "date", "amount"]];

  const customerData = new Map(); // Track customer purchases for correct answer

  // Generate date in different formats
  const generateMessyDate = (year, month, day) => {
    const formats = [
      `${month}/${day}/${year}`, // MM/DD/YYYY
      `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`, // YYYY-MM-DD (clean)
      `${day}-${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month - 1]}-${year}`, // DD-Mon-YYYY
    ];
    return formats[Math.floor(random() * formats.length)];
  };

  // Generate messy name
  const generateMessyName = (firstName, lastName) => {
    const formats = [
      `${firstName.toUpperCase()} ${lastName.toUpperCase()}`, // UPPERCASE
      `${firstName.toLowerCase()} ${lastName.toLowerCase()}`, // lowercase
      `${firstName} ${lastName}`, // Normal Case
      `${firstName.toUpperCase()} ${lastName.toLowerCase()}`, // MiXeD
    ];
    return formats[Math.floor(random() * formats.length)];
  };

  const usedCustomerIds = new Set();
  const customerNames = new Map(); // Map customer_id to clean name

  for (let i = 0; i < rowCount; i++) {
    const customerId = `C${String(Math.floor(random() * 30) + 1).padStart(3, "0")}`; // C001-C030
    const firstName = firstNames[Math.floor(random() * firstNames.length)];
    const lastName = lastNames[Math.floor(random() * lastNames.length)];
    const name = generateMessyName(firstName, lastName);
    const cleanName = `${firstName} ${lastName}`; // Title case version
    
    // Store clean name for this customer_id
    if (!customerNames.has(customerId)) {
      customerNames.set(customerId, cleanName);
    }

    const year = 2024;
    const month = Math.floor(random() * 6) + 1; // Jan-Jun
    const day = Math.floor(random() * 28) + 1;
    const date = generateMessyDate(year, month, day);

    // Amount - some will be null
    let amount = null;
    const hasAmount = random() > 0.15; // 85% have amounts, 15% null
    if (hasAmount) {
      amount = Math.round((20 + random() * 480) * 100) / 100; // $20-$500
    }

    rows.push([customerId, name, date, amount === null ? "" : amount.toFixed(2)]);

    // Track for answer calculation (only if amount is not null)
    if (amount !== null) {
      if (!customerData.has(customerId)) {
        customerData.set(customerId, { cleanName: customerNames.get(customerId), total: 0 });
      }
      customerData.get(customerId).total += amount;
    }

    usedCustomerIds.add(customerId);
  }

  // Add some duplicates (same customer_id appearing multiple times)
  const duplicateCount = Math.floor(random() * 3) + 2; // 2-4 duplicates
  for (let i = 0; i < duplicateCount; i++) {
    const existingIds = Array.from(usedCustomerIds);
    const customerId = existingIds[Math.floor(random() * existingIds.length)];
    const cleanName = customerNames.get(customerId);
    const [firstName, lastName] = cleanName.split(" ");
    const name = generateMessyName(firstName, lastName);

    const year = 2024;
    const month = Math.floor(random() * 6) + 1;
    const day = Math.floor(random() * 28) + 1;
    const date = generateMessyDate(year, month, day);

    const amount = Math.round((20 + random() * 480) * 100) / 100;

    rows.push([customerId, name, date, amount.toFixed(2)]);

    // This is a duplicate - in proper cleaning, we'd keep first occurrence
    // So we don't add this to our expected calculation
  }

  // Calculate expected answer: unique customers with total purchases over threshold
  const threshold = 100 + Math.floor(random() * 200); // $100-$300
  let expectedCount = 0;

  for (const [customerId, data] of customerData.entries()) {
    if (data.total > threshold) {
      expectedCount++;
    }
  }

  // Generate CSV content
  const csvContent = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  const answer = async (file) => {
    if (!file || !(file instanceof File)) {
      throw new Error("Please upload a CSV file.");
    }

    if (!file.name.endsWith(".csv")) {
      throw new Error("Please upload a file with .csv extension.");
    }

    const content = await file.text();
    const lines = content.trim().split("\n");

    if (lines.length < 2) {
      throw new Error("CSV file appears to be empty or has no data rows.");
    }

    // Parse CSV (simple parser for comma-separated values)
    const parsedRows = lines.map((line) => {
      const cells = [];
      let current = "";
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          cells.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      cells.push(current.trim());
      return cells;
    });

    const header = parsedRows[0];
    const dataRows = parsedRows.slice(1);

    // Validation checks with specific feedback
    const issues = [];

    // Check header
    const expectedHeaders = ["customer_id", "name", "date", "amount"];
    if (JSON.stringify(header) !== JSON.stringify(expectedHeaders)) {
      issues.push(`❌ Header mismatch. Expected: ${expectedHeaders.join(", ")} but got: ${header.join(", ")}`);
    }

    // Track issues by type
    let datesNotStandardized = 0;
    let namesNotTitleCase = 0;
    let nullAmountsPresent = 0;
    const customerIdSeen = new Map(); // Track first occurrence of each customer_id
    let duplicatesPresent = 0;

    // Check each row for cleaning issues
    dataRows.forEach((row, idx) => {
      const [customerId, name, date, amount] = row;

      // Check for null amounts
      if (!amount || amount === "" || amount.toLowerCase() === "null") {
        nullAmountsPresent++;
        return; // Should have been removed
      }

      // Check date format (should be YYYY-MM-DD)
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (!datePattern.test(date)) {
        datesNotStandardized++;
      }

      // Check name format (should be Title Case: "John Smith")
      const words = name.split(" ");
      const isTitleCase = words.every(
        (word) => word.length > 0 && word[0] === word[0].toUpperCase() && word.slice(1) === word.slice(1).toLowerCase(),
      );
      if (!isTitleCase) {
        namesNotTitleCase++;
      }

      // Check for duplicates (same customer_id appearing multiple times)
      if (customerIdSeen.has(customerId)) {
        duplicatesPresent++;
      } else {
        customerIdSeen.set(customerId, true);
      }
    });

    // Report specific issues
    if (nullAmountsPresent > 0) {
      issues.push(`❌ Found ${nullAmountsPresent} row(s) with null/empty amounts. These should be removed.`);
    }

    if (datesNotStandardized > 0) {
      issues.push(
        `❌ Found ${datesNotStandardized} date(s) not in YYYY-MM-DD format. Example of correct format: 2024-01-15`,
      );
    }

    if (namesNotTitleCase > 0) {
      issues.push(
        `❌ Found ${namesNotTitleCase} name(s) not in Title Case. Names should look like: "John Smith" (capitalize first letter of each word, lowercase rest).`,
      );
    }

    if (duplicatesPresent > 0) {
      issues.push(
        `❌ Found ${duplicatesPresent} duplicate customer_id(s). When a customer_id appears multiple times, keep only the FIRST occurrence.`,
      );
    }

    // If there are any issues, report them
    if (issues.length > 0) {
      throw new Error(
        `Your CSV has cleaning issues:\n\n${issues.join("\n")}\n\nPlease fix these and re-upload. Remember to apply cleaning steps in order: 1) Standardize dates 2) Title Case names 3) Remove null amounts 4) Deduplicate by customer_id`,
      );
    }

    // Calculate the answer from the cleaned data
    const customerTotals = new Map();
    dataRows.forEach((row) => {
      const [customerId, name, date, amount] = row;
      const amountValue = parseFloat(amount);
      if (!isNaN(amountValue)) {
        customerTotals.set(customerId, (customerTotals.get(customerId) || 0) + amountValue);
      }
    });

    let userCount = 0;
    for (const [customerId, total] of customerTotals.entries()) {
      if (total > threshold) {
        userCount++;
      }
    }

    // Final check: does the result match expected?
    if (userCount !== expectedCount) {
      throw new Error(
        `Your CSV is properly cleaned, but the aggregation result is incorrect. After cleaning and aggregating by customer_id, you should find ${expectedCount} customer(s) with total purchases over $${threshold}, but your file shows ${userCount}. Double-check your cleaning steps.`,
      );
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Customer Purchase Data Cleaning Challenge</h2>
      <p>
        <strong>RetailPro Analytics</strong> has received a customer transaction dataset from a legacy system that
        needs cleaning before analysis. The data contains inconsistent date formats, mixed text casing, null values,
        and duplicate entries that must be resolved before calculating customer metrics.
      </p>
      <p>
        As a data analyst, you need to clean this messy dataset and then calculate a specific business metric for the
        executive dashboard.
      </p>

      <h3>Dataset Preview (Messy Data)</h3>
      <div style="max-height: 300px; overflow-y: auto; border: 1px solid #ddd; margin-bottom: 10px;">
        <table class="table table-sm table-striped">
          <thead style="position: sticky; top: 0; background-color: white;">
            <tr>
              ${rows[0].map((header) => html`<th>${header}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${rows.slice(1).map(
              (row) => html`<tr>
                ${row.map((cell) => html`<td>${cell === "" ? html`<em style="color: #999;">null</em>` : cell}</td>`)}
              </tr>`,
            )}
          </tbody>
        </table>
      </div>

      <p>
        Download the messy data:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <h3>Data Cleaning Steps (Apply in Order)</h3>
      <ol>
        <li>
          <strong>Standardize dates to YYYY-MM-DD format</strong>: Convert all date formats (MM/DD/YYYY,
          DD-Mon-YYYY, etc.) to the standard YYYY-MM-DD format
        </li>
        <li>
          <strong>Convert names to Title Case</strong>: Standardize all names (currently in UPPERCASE, lowercase, or
          MiXeD case) to proper Title Case (e.g., "John Smith")
        </li>
        <li>
          <strong>Remove rows with null amounts</strong>: Remove any transaction record where the amount column is
          empty or null
        </li>
        <li>
          <strong>Deduplicate by customer_id</strong>: When the same customer_id appears multiple times, keep only
          the <strong>first occurrence</strong> and remove subsequent duplicates
        </li>
      </ol>

      <h3>Your Task</h3>
      <p>
        Clean the data following the steps above, then save the cleaned data as a new CSV file.
        <strong>Upload your cleaned CSV</strong> for validation.
      </p>
      <p>
        The system will check:
      </p>
      <ul>
        <li>✓ All dates are in YYYY-MM-DD format</li>
        <li>✓ All names are in Title Case</li>
        <li>✓ All rows with null/empty amounts have been removed</li>
        <li>✓ Duplicates (by customer_id) have been removed (keeping first occurrence)</li>
        <li>✓ The final count of unique customers with total purchases over $${threshold} is correct</li>
      </ul>

      <h3>Suggested Tools</h3>
      <ul>
        <li><strong>Python Pandas</strong>: Use pd.read_csv(), pd.to_datetime(), str.title(), dropna(), drop_duplicates(), groupby()</li>
        <li><strong>Excel</strong>: Power Query for data transformation, or formulas with pivot tables</li>
        <li><strong>Any data tool</strong> that can handle these transformations</li>
      </ul>

      <label for="${id}" class="form-label">
        Upload your cleaned CSV file
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="file"
        accept=".csv"
        required
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}
