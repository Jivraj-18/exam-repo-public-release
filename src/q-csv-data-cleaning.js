import { en, Faker } from "https://cdn.jsdelivr.net/npm/@faker-js/faker@9/+esm";
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-csv-data-cleaning";
  const title = "Data Cleaning: Customer Transaction Data Quality";

  const random = seedrandom(`${user.email}#${id}`);
  const faker = new Faker({ locale: [en], seed: Math.round(random() * 1000000) });

  const companyName = faker.company
    .name()
    .replace(/[^a-zA-Z\s]/g, "")
    .trim();

  // Generate messy CSV data with various issues
  const transactions = [];
  const cleanTransactions = [];

  for (let i = 0; i < 100; i++) {
    const baseAmount = Math.floor(random() * 500) + 10;
    const baseDate = faker.date.past({ years: 1 });

    // Some rows have issues, some are clean
    const issueType = random();

    if (issueType < 0.15) {
      // Missing amount (15%)
      transactions.push({
        id: i + 1,
        date: baseDate.toISOString().split("T")[0],
        customer_id: faker.string.numeric(5),
        amount: "",
        category: faker.helpers.arrayElement(["Electronics", "Clothing", "Food", "Books"]),
        status: "completed",
      });
      // Don't add to clean transactions (will be removed)
    } else if (issueType < 0.25) {
      // Negative amount (10%) - data entry error
      transactions.push({
        id: i + 1,
        date: baseDate.toISOString().split("T")[0],
        customer_id: faker.string.numeric(5),
        amount: -baseAmount,
        category: faker.helpers.arrayElement(["Electronics", "Clothing", "Food", "Books"]),
        status: "completed",
      });
      // Don't add to clean (invalid negative amounts should be removed)
    } else if (issueType < 0.35) {
      // Inconsistent date format (10%)
      const messyDate = `${baseDate.getMonth() + 1}/${baseDate.getDate()}/${baseDate.getFullYear()}`;
      transactions.push({
        id: i + 1,
        date: messyDate,
        customer_id: faker.string.numeric(5),
        amount: baseAmount,
        category: faker.helpers.arrayElement(["Electronics", "Clothing", "Food", "Books"]),
        status: "completed",
      });
      cleanTransactions.push({
        id: i + 1,
        date: baseDate.toISOString().split("T")[0],
        customer_id: faker.string.numeric(5),
        amount: baseAmount,
        category: faker.helpers.arrayElement(["Electronics", "Clothing", "Food", "Books"]),
        status: "completed",
      });
    } else if (issueType < 0.45) {
      // Outlier amount (10%) - extremely high
      const outlierAmount = Math.floor(random() * 50000) + 10000;
      transactions.push({
        id: i + 1,
        date: baseDate.toISOString().split("T")[0],
        customer_id: faker.string.numeric(5),
        amount: outlierAmount,
        category: faker.helpers.arrayElement(["Electronics", "Clothing", "Food", "Books"]),
        status: "completed",
      });
      // Don't add to clean (outliers > 5000 should be removed)
    } else if (issueType < 0.50) {
      // Inconsistent category casing (5%)
      const category = faker.helpers.arrayElement(["electronics", "CLOTHING", "fOOd", "BoOkS"]);
      transactions.push({
        id: i + 1,
        date: baseDate.toISOString().split("T")[0],
        customer_id: faker.string.numeric(5),
        amount: baseAmount,
        category: category,
        status: "completed",
      });
      cleanTransactions.push({
        id: i + 1,
        date: baseDate.toISOString().split("T")[0],
        customer_id: faker.string.numeric(5),
        amount: baseAmount,
        category: category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
        status: "completed",
      });
    } else {
      // Clean data (50%)
      const category = faker.helpers.arrayElement(["Electronics", "Clothing", "Food", "Books"]);
      transactions.push({
        id: i + 1,
        date: baseDate.toISOString().split("T")[0],
        customer_id: faker.string.numeric(5),
        amount: baseAmount,
        category: category,
        status: "completed",
      });
      cleanTransactions.push({
        id: i + 1,
        date: baseDate.toISOString().split("T")[0],
        customer_id: faker.string.numeric(5),
        amount: baseAmount,
        category: category,
        status: "completed",
      });
    }
  }

  // Generate CSV content for download
  const csvContent = transactions
    .map(
      (t) =>
        `${t.id},${t.date},${t.customer_id},${t.amount},${t.category},${t.status}`
    )
    .join("\n");
  const csvBlob = new Blob(
    [`id,date,customer_id,amount,category,status\n${csvContent}`],
    { type: "text/csv" }
  );
  const csvUrl = URL.createObjectURL(csvBlob);

  // Calculate expected metrics
  const expectedCount = cleanTransactions.length;
  const expectedSum = cleanTransactions.reduce((sum, t) => sum + t.amount, 0);
  const expectedAvg = expectedSum / expectedCount;

  const answer = async (response) => {
    try {
      const result = JSON.parse(response);

      if (typeof result !== "object" || Array.isArray(result)) {
        throw new Error("Response must be a JSON object with count, sum, and average");
      }

      // Validate structure
      if (!("count" in result) || !("sum" in result) || !("average" in result)) {
        throw new Error("Response must include: count, sum, average");
      }

      // Validate count (exact)
      if (result.count !== expectedCount) {
        throw new Error(
          `Incorrect row count. Expected ${expectedCount} clean records, got ${result.count}. ` +
            `Remove rows with: missing amounts, negative amounts, and outliers > 5000.`
        );
      }

      // Validate sum (with tolerance)
      const sumTolerance = expectedSum * 0.01; // 1% tolerance
      if (Math.abs(result.sum - expectedSum) > sumTolerance) {
        throw new Error(
          `Incorrect sum. Expected approximately ${expectedSum.toFixed(2)}, got ${result.sum}. ` +
            `Check data cleaning and numeric conversions.`
        );
      }

      // Validate average (with tolerance)
      const avgTolerance = expectedAvg * 0.01; // 1% tolerance
      if (Math.abs(result.average - expectedAvg) > avgTolerance) {
        throw new Error(
          `Incorrect average. Expected approximately ${expectedAvg.toFixed(2)}, got ${result.average}`
        );
      }

      return true;
    } catch (e) {
      if (e instanceof SyntaxError) {
        throw new Error(
          'Invalid JSON format. Expected: {"count": 85, "sum": 12345.67, "average": 145.24}'
        );
      }
      throw e;
    }
  };

  const question = html`
    <h2>${companyName} Transaction Data Quality Improvement</h2>

    <p>
      <strong>${companyName}</strong> has collected customer transaction data but it contains quality
      issues that must be cleaned before analysis. Your task is to clean the data and calculate summary
      statistics.
    </p>

    <ol>
      <li>
        <a href="${csvUrl}" download="transactions.csv">Download the transactions.csv file</a>
        containing 100 transaction records with various data quality issues
      </li>
      <li>
        Clean the data by addressing the following issues:
        <ul>
          <li><strong>Missing values:</strong> Remove rows where the amount is missing or empty</li>
          <li>
            <strong>Invalid amounts:</strong> Remove rows where the amount is negative (data entry
            errors)
          </li>
          <li>
            <strong>Outliers:</strong> Remove rows where the amount exceeds 5,000 (likely errors or
            fraudulent transactions)
          </li>
          <li>
            <strong>Date format:</strong> Standardize all dates to YYYY-MM-DD format (some use
            M/D/YYYY)
          </li>
          <li>
            <strong>Category casing:</strong> Standardize category names to title case (first letter
            uppercase, rest lowercase)
          </li>
        </ul>
      </li>
      <li>
        After cleaning, calculate:
        <ul>
          <li><strong>count:</strong> Number of valid transaction records remaining</li>
          <li><strong>sum:</strong> Total sum of all transaction amounts</li>
          <li><strong>average:</strong> Average transaction amount</li>
        </ul>
      </li>
      <li>Return these three metrics as a JSON object</li>
    </ol>

    <p>
      <label>
        Paste your JSON result with count, sum, and average:
        <textarea
          name="result"
          rows="6"
          style="width: 100%; font-family: monospace;"
          placeholder='{"count": 85, "sum": 12345.67, "average": 145.24}'
        ></textarea>
      </label>
    </p>

    <p class="text-muted">
      <small>
        Hint: Use pandas (Python) or similar data processing libraries. Read the CSV, identify and
        remove problematic rows, standardize formats, then calculate aggregate statistics. For date
        parsing, use pd.to_datetime() with appropriate format parameters. For numeric validation, use
        pd.to_numeric() with errors='coerce' to handle invalid values.
      </small>
    </p>
  `;

  return { id, title, weight, question, answer };
}
