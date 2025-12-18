export default {
  id: "pandas-filter-orders",
  title: "Filter valid orders with pandas",
  description: `
Write a script that:

- Reads "orders.csv" with columns: order_id, amount, status.
- Keeps only rows where:
  - amount is not missing AND amount >= 100
  - status is exactly "PAID"
- Writes the result to "orders_filtered.csv" in the same directory.
`,
  starter: `import pandas as pd

def main():
    # TODO: read orders.csv
    # filter rows with amount >= 100 and status == "PAID"
    # write to orders_filtered.csv
    pass

if __name__ == "__main__":
    main()
`,
  tests: [
    {
      id: "filters_paid_and_amount",
      description: "Keeps only PAID orders with amount >= 100",
      code: `
import pandas as pd
from pathlib import Path
from q_pandas_filter_orders import main

data = pd.DataFrame([
    {"order_id": 1, "amount": 50,  "status": "PAID"},
    {"order_id": 2, "amount": 150, "status": "PAID"},
    {"order_id": 3, "amount": 200, "status": "PENDING"},
    {"order_id": 4, "amount": None,"status": "PAID"},
])
data.to_csv("orders.csv", index=False)

main()

out_path = Path("orders_filtered.csv")
assert out_path.exists()
out = pd.read_csv(out_path)
assert list(out["order_id"]) == [2]
`
    }
  ]
};
