import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;

const generateSalesData = (random, count) => {
  const regions = ["North", "South", "East", "West"];
  const products = ["Laptop", "Phone", "Tablet", "Watch"];
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      region: pick(regions, random),
      product: pick(products, random),
      sales: randInt(random, 100, 1000),
      quantity: randInt(random, 1, 20),
    });
  }
  return data;
};

const taskFactories = [
  (random, data) => {
    const region = pick(["North", "South", "East", "West"], random);
    const total = data.filter((r) => r.region === region).reduce((sum, r) => sum + r.sales, 0);
    return {
      id: "sum-by-region",
      groupBy: "region",
      filterValue: region,
      operation: "sum",
      column: "sales",
      expected: total,
      description: `total sales for region "${region}"`,
    };
  },
  (random, data) => {
    const product = pick(["Laptop", "Phone", "Tablet", "Watch"], random);
    const filtered = data.filter((r) => r.product === product);
    const avg = Math.round((filtered.reduce((sum, r) => sum + r.sales, 0) / filtered.length) * 100) / 100;
    return {
      id: "avg-by-product",
      groupBy: "product",
      filterValue: product,
      operation: "mean",
      column: "sales",
      expected: avg,
      description: `average sales for product "${product}"`,
    };
  },
  (random, data) => {
    const region = pick(["North", "South", "East", "West"], random);
    const total = data.filter((r) => r.region === region).reduce((sum, r) => sum + r.quantity, 0);
    return {
      id: "sum-qty-region",
      groupBy: "region",
      filterValue: region,
      operation: "sum",
      column: "quantity",
      expected: total,
      description: `total quantity sold in region "${region}"`,
    };
  },
  (random, data) => {
    const product = pick(["Laptop", "Phone", "Tablet", "Watch"], random);
    const max = Math.max(...data.filter((r) => r.product === product).map((r) => r.sales));
    return {
      id: "max-by-product",
      groupBy: "product",
      filterValue: product,
      operation: "max",
      column: "sales",
      expected: max,
      description: `maximum sales for product "${product}"`,
    };
  },
  (random, data) => {
    const region = pick(["North", "South", "East", "West"], random);
    const count = data.filter((r) => r.region === region).length;
    return {
      id: "count-by-region",
      groupBy: "region",
      filterValue: region,
      operation: "count",
      column: "sales",
      expected: count,
      description: `number of transactions in region "${region}"`,
    };
  },
];

export default async function ({ user, weight = 1 }) {
  const id = "q-pandas-groupby";
  const title = "Pandas GroupBy Operations";
  const random = seedrandom(`${user.email}#${id}`);

  const rowCount = randInt(random, 15, 25);
  const data = generateSalesData(random, rowCount);
  const task = pick(taskFactories, random)(random, data);

  const csvContent = "id,region,product,sales,quantity\n" + data.map((r) => `${r.id},${r.region},${r.product},${r.sales},${r.quantity}`).join("\n");

  const question = html`
    <div class="mb-3">
      <h4>Pandas GroupBy Operations</h4>
      <p>
        <strong>Scenario:</strong> You have sales data and need to perform groupby aggregations using Pandas.
        Build a FastAPI endpoint that accepts CSV data and returns the aggregated result.
      </p>
      <ol>
        <li>Implement a FastAPI app with a <code>POST /aggregate</code> route.</li>
        <li>Accept JSON: <code>{ "csv": "...", "group_by": "...", "filter_value": "...", "operation": "sum|mean|max|min|count", "column": "..." }</code></li>
        <li>Use Pandas to: filter rows where <code>group_by</code> column equals <code>filter_value</code>, then apply <code>operation</code> on <code>column</code>.</li>
        <li>Respond with: <code>{ "result": number, "email": "${user.email}" }</code></li>
        <li>Enable CORS for cross-origin requests.</li>
      </ol>
      <p>For grading, we will send this CSV data:</p>
      <pre class="bg-light p-2" style="font-size: 0.8em; max-height: 150px; overflow: auto;">${csvContent}</pre>
      <p>
        Task: Find the <strong>${task.description}</strong><br />
        Group by: <code>${task.groupBy}</code> | Filter: <code>${task.filterValue}</code> | Operation: <code>${task.operation}</code> | Column: <code>${task.column}</code>
      </p>
      <label for="${id}" class="form-label">Enter the base URL of your API</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");

    const endpoint = url.replace(/\/$/, "") + "/aggregate";
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        csv: csvContent,
        group_by: task.groupBy,
        filter_value: task.filterValue,
        operation: task.operation,
        column: task.column,
      }),
    });

    if (!resp.ok) throw new Error(`Endpoint returned ${resp.status}`);

    let respData;
    try {
      respData = await resp.json();
    } catch {
      throw new Error("Invalid JSON response");
    }

    if (respData.email !== user.email) throw new Error("Email must match");

    const result = Number(respData.result);
    const expected = Number(task.expected);
    if (Math.abs(result - expected) > 0.01) {
      throw new Error(`Expected ${expected}, got ${result}`);
    }

    return true;
  };

  return { id, title, weight, question, answer };
}

/*
Python solution sketch: main.py

# /// script
# requires-python = ">=3.12"
# dependencies = ["fastapi", "uvicorn", "pandas"]
# ///

import pandas as pd
from io import StringIO
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class AggregateInput(BaseModel):
    csv: str
    group_by: str
    filter_value: str
    operation: str
    column: str

@app.post("/aggregate")
async def aggregate(data: AggregateInput):
    df = pd.read_csv(StringIO(data.csv))
    filtered = df[df[data.group_by] == data.filter_value]
    
    if data.operation == "sum":
        result = filtered[data.column].sum()
    elif data.operation == "mean":
        result = round(filtered[data.column].mean(), 2)
    elif data.operation == "max":
        result = filtered[data.column].max()
    elif data.operation == "min":
        result = filtered[data.column].min()
    elif data.operation == "count":
        result = len(filtered)
    
    return {"result": result, "email": "YOUR_EMAIL@ds.study.iitm.ac.in"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
*/