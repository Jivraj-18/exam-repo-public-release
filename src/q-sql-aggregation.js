import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;

const generateEmployeeData = (random, count) => {
  const departments = ["Engineering", "Sales", "Marketing", "HR", "Finance"];
  const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad"];
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      emp_id: i + 1,
      name: `Employee_${i + 1}`,
      department: pick(departments, random),
      city: pick(cities, random),
      salary: randInt(random, 30000, 150000),
      experience: randInt(random, 1, 15),
    });
  }
  return data;
};

const taskFactories = [
  (random, data) => {
    const dept = pick(["Engineering", "Sales", "Marketing", "HR", "Finance"], random);
    const filtered = data.filter((r) => r.department === dept);
    const avg = Math.round(filtered.reduce((sum, r) => sum + r.salary, 0) / filtered.length);
    return {
      id: "avg-salary-dept",
      query: `SELECT AVG(salary) FROM employees WHERE department = '${dept}'`,
      expected: avg,
      description: `average salary in ${dept} department`,
      hint: `Filter by department='${dept}', then calculate AVG(salary)`,
    };
  },
  (random, data) => {
    const city = pick(["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad"], random);
    const count = data.filter((r) => r.city === city).length;
    return {
      id: "count-city",
      query: `SELECT COUNT(*) FROM employees WHERE city = '${city}'`,
      expected: count,
      description: `number of employees in ${city}`,
      hint: `Filter by city='${city}', then COUNT(*)`,
    };
  },
  (random, data) => {
    const dept = pick(["Engineering", "Sales", "Marketing", "HR", "Finance"], random);
    const max = Math.max(...data.filter((r) => r.department === dept).map((r) => r.salary));
    return {
      id: "max-salary-dept",
      query: `SELECT MAX(salary) FROM employees WHERE department = '${dept}'`,
      expected: max,
      description: `maximum salary in ${dept} department`,
      hint: `Filter by department='${dept}', then calculate MAX(salary)`,
    };
  },
  (random, data) => {
    const minExp = randInt(random, 3, 7);
    const sum = data.filter((r) => r.experience >= minExp).reduce((sum, r) => sum + r.salary, 0);
    return {
      id: "sum-salary-exp",
      query: `SELECT SUM(salary) FROM employees WHERE experience >= ${minExp}`,
      expected: sum,
      description: `total salary of employees with ${minExp}+ years experience`,
      hint: `Filter by experience >= ${minExp}, then calculate SUM(salary)`,
    };
  },
  (random, data) => {
    const city = pick(["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad"], random);
    const filtered = data.filter((r) => r.city === city);
    const totalExp = filtered.reduce((sum, r) => sum + r.experience, 0);
    return {
      id: "sum-exp-city",
      query: `SELECT SUM(experience) FROM employees WHERE city = '${city}'`,
      expected: totalExp,
      description: `total years of experience of employees in ${city}`,
      hint: `Filter by city='${city}', then calculate SUM(experience)`,
    };
  },
];

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-aggregation";
  const title = "SQL Aggregation Query";
  const random = seedrandom(`${user.email}#${id}`);

  const rowCount = randInt(random, 20, 30);
  const data = generateEmployeeData(random, rowCount);
  const task = pick(taskFactories, random)(random, data);

  const csvContent = "emp_id,name,department,city,salary,experience\n" + 
    data.map((r) => `${r.emp_id},${r.name},${r.department},${r.city},${r.salary},${r.experience}`).join("\n");

  const question = html`
    <div class="mb-3">
      <h4>SQL Aggregation Query</h4>
      <p>
        <strong>Scenario:</strong> You have employee data and need to execute SQL aggregation queries.
        Build a FastAPI endpoint that loads CSV into SQLite and executes the given SQL query.
      </p>
      <ol>
        <li>Implement a FastAPI app with a <code>POST /sql</code> route.</li>
        <li>Accept JSON: <code>{ "csv": "...", "query": "..." }</code></li>
        <li>Load CSV into an in-memory SQLite table named <code>employees</code>.</li>
        <li>Execute the SQL query and return the result.</li>
        <li>Respond with: <code>{ "result": number, "email": "${user.email}" }</code></li>
        <li>Enable CORS for cross-origin requests.</li>
      </ol>
      <p>For grading, we will send this CSV data:</p>
      <pre class="bg-light p-2" style="font-size: 0.8em; max-height: 150px; overflow: auto;">${csvContent}</pre>
      <p>
        SQL Query: <code>${task.query}</code><br />
        Task: Find the <strong>${task.description}</strong>
      </p>
      <label for="${id}" class="form-label">Enter the base URL of your API</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");

    const endpoint = url.replace(/\/$/, "") + "/sql";
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ csv: csvContent, query: task.query }),
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
    if (Math.abs(result - expected) > 1) {
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
import sqlite3
from io import StringIO
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class SQLInput(BaseModel):
    csv: str
    query: str

@app.post("/sql")
async def run_sql(data: SQLInput):
    df = pd.read_csv(StringIO(data.csv))
    conn = sqlite3.connect(":memory:")
    df.to_sql("employees", conn, index=False, if_exists="replace")
    
    cursor = conn.execute(data.query)
    result = cursor.fetchone()[0]
    conn.close()
    
    return {"result": result, "email": "YOUR_EMAIL@ds.study.iitm.ac.in"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
*/