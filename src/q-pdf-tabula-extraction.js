import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function ({ user, weight = 1.25 }) {
  const id = "q-pdf-tabula-extraction";
  const title = "CSV Financial Data Analysis";

  const random = seedrandom(`${user.email}#${id}`);

  const companies = ["TechCorp", "DataSys", "CloudNet", "AIVentures", "WebScale"];
  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  const selectedCompanies = [];
  for (let i = 0; i < 5; i++) {
    const revenue = Math.floor(random() * 5000) + 1000;
    const profit = Math.floor(random() * 1000) + 100;
    selectedCompanies.push({
      company: companies[i],
      quarter: quarters[Math.floor(random() * 4)],
      revenue,
      profit,
      margin: ((profit / revenue) * 100).toFixed(2),
    });
  }

  const minMargin = (Math.floor(random() * 10) + 10).toFixed(2);

  const csvContent = `Company,Quarter,Revenue,Profit,Margin
${selectedCompanies.map((c) => `${c.company},${c.quarter},${c.revenue},${c.profit},${c.margin}`).join("\n")}`;

  const blob = new Blob([csvContent], { type: "text/csv" });

  const answer = (input) => {
    const lines = input
      .trim()
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);
    const expected = selectedCompanies
      .filter((company) => parseFloat(company.margin) >= parseFloat(minMargin))
      .sort((a, b) => parseFloat(b.margin) - parseFloat(a.margin))
      .map((company) => company.company);

    if (lines.length !== expected.length) {
      throw new Error(`Expected ${expected.length} companies, got ${lines.length}`);
    }

    for (let i = 0; i < expected.length; i++) {
      if (!lines[i].includes(expected[i])) {
        throw new Error(`Expected ${expected[i]} at position ${i + 1}`);
      }
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>FinanceTrack: Automated Report Analysis</h2>
      <p>
        <strong>FinanceTrack</strong> is a financial analytics firm that processes hundreds of CSV reports daily. They
        need to extract tabular data, filter by profit margin criteria, and rank companies.
      </p>

      <h3>Task</h3>
      <ol>
        <li>Download the financial report CSV below</li>
        <li>Use spreadsheet software or Python/pandas to analyze the data</li>
        <li>Filter companies with profit margin <strong>&ge; ${minMargin}%</strong></li>
        <li>Sort by profit margin (highest first)</li>
        <li>Submit company names, one per line</li>
      </ol>

      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          Download Report (${id}.csv)
        </button>
      </p>

      <label for="${id}" class="form-label">List companies (one per line, sorted by margin):</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="5" required></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
