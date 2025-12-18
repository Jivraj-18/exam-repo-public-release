// Question 3: Data Cleaning - Outlier Detection
import { html } from "https://cdn.jsdelivr.net/npm/lit@3/index.js";

export default function ({ user, weight = 1 }) {
  const email = user?.email || "student@example.com";
  const rollNumber = email.split("@")[0];
  const seed = rollNumber.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const dataset = Array.from({ length: 10 }, (_, i) => {
    const base = 100 + ((seed + i * 7) % 30);
    return i === 5 ? base + 200 : base;
  });

  return {
    id: "data-cleaning-outliers",
    weight,
    question: html`
      <h3>Outlier Detection</h3>
      <p>Identify the outlier in the following dataset: <code>${JSON.stringify(dataset)}</code></p>
      <input type="number" name="outlier_val" class="form-control" placeholder="Enter the outlier value">
    `,
    answer: (formData) => parseInt(formData.get("outlier_val")) > 200
  };
}