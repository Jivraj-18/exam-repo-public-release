import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;

const generateData = (random, count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      value: randInt(random, 10, 100),
      category: pick(["A", "B", "C"], random),
    });
  }
  return data;
};

const taskFactories = [
  (random, data) => {
    const sum = data.reduce((acc, row) => acc + row.value, 0);
    return {
      id: "sum-all",
      operation: "sum",
      column: "value",
      filter: null,
      expected: sum,
      description: "sum of all values",
    };
  },
  (random, data) => {
    const sum = data.reduce((acc, row) => acc + row.value, 0);
    const avg = Math.round((sum / data.length) * 100) / 100;
    return {
      id: "avg-all",
      operation: "average",
      column: "value",
      filter: null,
      expected: avg,
      description: "average of all values",
    };
  },
  (random, data) => {
    const category = pick(["A", "B", "C"], random);
    const filtered = data.filter((row) => row.category === category);
    const sum = filtered.reduce((acc, row) => acc + row.value, 0);
    return {
      id: `sum-${category}`,
      operation: "sum",
      column: "value",
      filter: { category },
      expected: sum,
      description: `sum of values where category=${category}`,
    };
  },
  (random, data) => {
    const max = Math.max(...data.map((row) => row.value));
    return {
      id: "max-value",
      operation: "max",
      column: "value",
      filter: null,
      expected: max,
      description: "maximum value",
    };
  },
  (random, data) => {
    const min = Math.min(...data.map((row) => row.value));
    return {
      id: "min-value",
      operation: "min",
      column: "value",
      filter: null,
      expected: min,
      description: "minimum value",
    };
  },
  (random, data) => {
    const category = pick(["A", "B", "C"], random);
    const count = data.filter((row) => row.category === category).length;
    return {
      id: `count-${category}`,
      operation: "count",
      column: "category",
      filter: { category },
      expected: count,
      description: `count of rows where category=${category}`,
    };
  },
];

export default async function ({ user, weight = 1 }) {
  const id = "q-csv-stats";
  const title = "CSV Statistics Calculator API";
  const random = seedrandom(`${user.email}#${id}`);
  
  const rowCount = randInt(random, 8, 15);
  const data = generateData(random, rowCount);
  const task = pick(taskFactories, random)(random, data);

  const csvContent = "id,value,category\n" + data.map((r) => `${r.id},${r.value},${r.category}`).join("\n");

  const question = html`
    <div class="mb-3">
      <h4>CSV Statistics Calculator</h4>
      <p>
        <strong>Scenario:</strong> Build a FastAPI endpoint that calculates statistics from CSV data.
      </p>
      <ol>
        <li>Implement a FastAPI app with a <code>POST /stats</code> route.</li>
        <li>Accept JSON: <code>{ "csv": "...", "operation": "sum|average|max|min|count", "column": "...", "filter": {...} }</code></li>
        <li>Respond with: <code>{ "result": number, "email": "${user.email}" }</code></li>
        <li>Enable CORS for cross-origin requests.</li>
      </ol>
      <p>For grading, we will send this CSV data:</p>
      <pre class="bg-light p-2" style="font-size: 0.85em; max-height: 150px; overflow: auto;">${csvContent}</pre>
      <p>
        Operation: <code>${task.operation}</code> on column <code>${task.column}</code>
        ${task.filter ? html`with filter <code>${JSON.stringify(task.filter)}</code>` : ""}
      </p>
      <label for="${id}" class="form-label">Enter the base URL of your API</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");

    const endpoint = url.replace(/\/$/, "") + "/stats";
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        csv: csvContent,
        operation: task.operation,
        column: task.column,
        filter: task.filter,
      }),
    });

    if (!resp.ok) throw new Error(`Endpoint returned ${resp.status}`);

    let data;
    try {
      data = await resp.json();
    } catch {
      throw new Error("Invalid JSON response");
    }

    if (data.email !== user.email) throw new Error("Email must match");
    
    const result = Number(data.result);
    const expected = Number(task.expected);
    if (Math.abs(result - expected) > 0.01) {
      throw new Error(`Expected ${expected}, got ${result}`);
    }

    return true;
  };

  return { id, title, weight, question, answer };
}