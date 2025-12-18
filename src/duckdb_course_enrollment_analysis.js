export default {
  id: "duckdb-course-enrollment-analysis",
  title: "Analyze Course Enrollment Data using DuckDB",
  marks: 1,
  difficulty: "medium",

  description: `
You are a data analyst at a university analyzing student enrollment data.
Using SQL-based analysis with DuckDB, compute the average number of credits
per department and identify which department has the highest average load.
  `,

  dataset: {
    description: "Synthetic course enrollment data with student_id, department, and credits",
    rows: 100,
    deterministic: true
  },

  requirements: [
    "Load the dataset into DuckDB or any SQL-compatible tool",
    "Compute average credits per department",
    "Identify the department with the highest average credits",
    "Round the average credits value to 2 decimal places"
  ],

  submission: {
    type: "text",
    format: "<DEPARTMENT>, <AVERAGE_CREDITS>",
    example: "CSE, 21.43"
  },

  validation: {
    numericPrecision: 2,
    expects: ["department", "average"]
  },

  allowedTools: [
    "DuckDB",
    "Python",
    "Datasette",
    "Excel",
    "AI-assisted analysis"
  ]
};
