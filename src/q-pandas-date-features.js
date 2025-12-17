export default {
  id: "q_pandas_date_features",
  title: "Pandas: Date feature extraction",
  description: `
Given a CSV with column order_date (YYYY-MM-DD):
1. Convert to datetime
2. Extract day of week
3. Return most frequent day
`,
  evaluate: async ({ python }) => {
    const code = `
import pandas as pd

df = pd.read_csv("orders.csv")
df["order_date"] = pd.to_datetime(df["order_date"])
df["day"] = df["order_date"].dt.day_name()
print(df["day"].mode()[0])
`;
    return python(code);
  },
};
