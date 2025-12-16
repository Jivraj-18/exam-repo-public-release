export default {
  id: "python-missing-values",
  title: "Handling Missing Values in Pandas",
  description: "Identify and handle missing data in a DataFrame.",
  question: `
A Pandas DataFrame df contains missing values in multiple columns.

Write Python code to:
- Identify columns containing missing values
- Fill numeric columns with their mean
- Fill non-numeric columns with the string "Unknown"
`,
  answer: `
import pandas as pd

numeric_cols = df.select_dtypes(include="number").columns
non_numeric_cols = df.select_dtypes(exclude="number").columns

df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].mean())
df[non_numeric_cols] = df[non_numeric_cols].fillna("Unknown")
`
};
