export default {
  id: "q_pandas_missing_aggregation",
  title: "Pandas: Handle missing values and compute grouped mean",
  description: `
You are given a CSV file with columns:
- department
- salary (may contain missing values)

Tasks:
1. Replace missing salary values with the median salary.
2. Compute mean salary per department.
3. Return the department with the highest mean salary.
`,
  evaluate: async ({ python }) => {
    const code = `
import pandas as pd

df = pd.read_csv("data.csv")
df["salary"] = df["salary"].fillna(df["salary"].median())
print(df.groupby("department")["salary"].mean().idxmax())
`;
    return python(code);
  },
};
