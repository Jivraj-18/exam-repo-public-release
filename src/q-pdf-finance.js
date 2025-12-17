import { html } from "lit-html";

export default function ({ user, weight }) {
  return {
    id: "q-pdf-finance",
    title: "Quarterly Financial Extraction",
    weight: weight || 1,
    description: html`
      <p>Access the directory of reports at <code>https://sanand0.github.io/tdsdata/reports/</code>.</p>
      <p>Extract tables from all PDFs starting with <code>fin_2024_</code>. Calculate the <b>Total Revenue</b> for all rows where the 'Status' is marked as <b>'Audited'</b> and 'Region' is <b>'North'</b>.</p>
    `,
    help: [
      html`Use <code>tabula-py</code> or <code>camelot-py</code> to handle multi-page PDF tables.`,
      html`Clean currency strings like "$1,200.00" by removing symbols and commas before summation.`
    ]
  };
}