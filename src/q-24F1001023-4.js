export default function({ user, weight }) {
  return {
    id: "q-24F1001023-4",
    type: "mcq",
    text: "You are using `tabula-py` to extract a table from a PDF file named `report.pdf`. Which function call returns the list of DataFrames containing the extracted tables?",
    options: [
      "tabula.read_pdf('report.pdf', pages='all')",
      "tabula.convert_into('report.pdf', 'output.csv')",
      "tabula.parse('report.pdf')",
      "tabula.extract_tables('report.pdf')"
    ],
    answer: "tabula.read_pdf('report.pdf', pages='all')",
    weight: weight
  }
}