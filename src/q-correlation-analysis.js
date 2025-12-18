// Question 2: Correlation Analysis and Feature Selection
import { html } from "lit";

export default function ({ user, weight = 1 }) {
  const email = user?.email || "student@example.com";
  const rollNumber = email.split("@")[0];
  const seed = rollNumber.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const n = 15;
  
  const feature1 = Array.from({ length: n }, (_, i) => 10 + ((seed + i * 7) % 20));
  const feature2 = Array.from({ length: n }, (_, i) => 5 + ((seed + i * 11) % 15));
  const target = feature1.map((val, i) => Math.round(val * 1.5 + ((seed + i * 3) % 10) - 5));

  return {
    id: "correlation-analysis",
    title: "Correlation Analysis",
    weight,
    question: html`
      <h3>Correlation Analysis for Feature Selection</h3>
      <p>Given the features below, calculate the Pearson correlation with the target variable.</p>
      <ul>
        <li><strong>Feature 1:</strong> ${JSON.stringify(feature1)}</li>
        <li><strong>Feature 2:</strong> ${JSON.stringify(feature2)}</li>
        <li><strong>Target:</strong> ${JSON.stringify(target)}</li>
      </ul>
      <textarea class="form-control" rows="6" name="corr_code"></textarea>
    `,
    answer: (formData) => formData.get("corr_code")?.length > 20
  };
}