import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-serverless-latency";
  const title = "Data Analysis: Serverless Cold Start Analysis";
  const random = seedrandom(`${user.email}#${id}`);

  const logs = [];
  const latencies = [];
  
  // Generate log entries
  for (let i = 0; i < 50; i++) {
    const isCold = random() > 0.8;
    const latency = isCold ? 2000 + random() * 1000 : 100 + random() * 200;
    latencies.push(latency);
    logs.push(`REPORT RequestId: req-${i} Duration: ${latency.toFixed(2)} ms Billed Duration: ${Math.ceil(latency)} ms Init Duration: ${isCold ? (random()*500).toFixed(2) : '0'} ms`);
  }

  // Calculate p99 manually
  latencies.sort((a, b) => a - b);
  const p99Index = Math.ceil(latencies.length * 0.99) - 1;
  const p99 = latencies[p99Index];

  const blob = new Blob([logs.join("\n")], { type: "text/plain" });

  const answer = async (response) => {
    const val = parseFloat(response);
    if (Math.abs(val - p99) > 10) throw new Error(`Incorrect. Expected ~${p99.toFixed(2)}`);
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Case Study: Lambda Performance Tuning</h2>
      <p>
        Your manager thinks the new Python Lambda function is too slow. You need to calculate the <strong>p99 latency</strong> (the 99th percentile duration) from the raw logs.
      </p>
      <h3>Task</h3>
      <ol>
        <li>Download the log file.</li>
        <li>Extract the <code>Duration</code> value from each line.</li>
        <li>Calculate the 99th percentile (sort and find the value at index <code>ceil(0.99 * N) - 1</code>).</li>
      </ol>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `lambda.log`)}>
          Download lambda.log
        </button>
      </p>
      <label for="${id}" class="form-label">p99 Latency (ms)</label>
      <input class="form-control" id="${id}" name="${id}" type="number" step="0.01" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution

import math

# 1. Read the file
latencies = []
try:
    with open("lambda.log", "r") as f:
        for line in f:
            # Extract the value between "Duration: " and " ms"
            if "Duration:" in line:
                parts = line.split("Duration: ")[1]
                latency_str = parts.split(" ms")[0]
                latencies.append(float(latency_str))

    # 2. Sort the data (Required for percentile calculation)
    latencies.sort()

    # 3. Calculate p99 Index
    # Formula: ceil(0.99 * N) - 1 (since lists are 0-indexed)
    index = math.ceil(len(latencies) * 0.99) - 1
    p99 = latencies[index]

    print(f"Answer: {p99}")

except FileNotFoundError:
    print("Please download 'lambda.log' first.")

*/