export default function ({ user, weight = 1 }) {
  return {
    id: "q_pandas_outlier_removal",
    title: "Pandas: Remove outliers using IQR",
    description: `
Given a CSV with a numeric column 'price',
remove outliers using the IQR method and
return the number of remaining rows.
`,
    weight,
    evaluate: async ({ python }) => {
      const code = `
import pandas as pd

df = pd.read_csv("data.csv")

Q1 = df["price"].quantile(0.25)
Q3 = df["price"].quantile(0.75)
IQR = Q3 - Q1

filtered = df[(df["price"] >= Q1 - 1.5*IQR) & (df["price"] <= Q3 + 1.5*IQR)]
print(len(filtered))
`;
      return python(code);
    },
  };
}