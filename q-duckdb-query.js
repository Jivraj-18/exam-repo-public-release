export default {
  title: "DuckDB: Parquet Analysis",
  question: "In DuckDB, what is the correct syntax to query a local Parquet file named <b>'sales.parquet'</b> without importing it?",
  options: [
    "SELECT * FROM 'sales.parquet';",
    "LOAD 'sales.parquet';",
    "IMPORT FROM 'sales.parquet';",
    "READ_PARQUET('sales.parquet');"
  ],
  answer: "SELECT * FROM 'sales.parquet';",
  marks: 1
};
