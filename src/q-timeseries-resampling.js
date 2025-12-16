export default {
  id: "timeseries-resampling",
  title: "Time-Series Resampling in Python",
  description: "Resample time-series data using Pandas.",
  question: `
A Pandas DataFrame df has:
- a DateTimeIndex
- a column named "sales"

Write Python code to:
- Resample the data to monthly frequency
- Compute the total sales per month
`,
  answer: `
monthly_sales = df.resample("M")["sales"].sum()
`
};
