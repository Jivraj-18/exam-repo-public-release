# Tools in Data Science – Bonus Questions



## Question 1: Pandas GroupBy and Aggregation

Consider the following DataFrame:

```python
import pandas as pd

df = pd.DataFrame({
    "team": ["A", "A", "B", "B"],
    "points": [10, 20, 15, 25]
})

What will be the output of the following code?

```python
df.groupby("team")["points"].sum()
import numpy as np

x = np.array([1, 2, 3])
y = np.array([[10], [20]])

x + y
git checkout -b feature-auth
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    price: int

@app.post("/items")
def create_item(item: Item):
    return item
SELECT customer_id, SUM(amount)
FROM orders
GROUP BY customer_id;
