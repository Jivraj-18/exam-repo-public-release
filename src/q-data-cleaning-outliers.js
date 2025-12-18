// Question 3: Data Cleaning - Outlier Detection
import { html } from "lit";

export default function ({ user, weight = 1 }) {
  const email = user?.email || "student@example.com";
  const rollNumber = email.split("@")[0];
  const seed = rollNumber.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  
  const dataset = Array.from({ length: 20 }, (_, i) => {
    const base = 100 + ((seed + i * 7) % 30);
    if (i === 5 || i === 15) return base + 200; // Artificial Outliers
    return base;
  });

  return {
    id: "data-cleaning-outliers",
    title: "Outlier Detection",
    weight,
    question: html`
      <h3>Data Cleaning: Outlier Detection</h3>
      <p>Identify outliers in this dataset using the IQR (Interquartile Range) method:</p>
      <code>${JSON.stringify(dataset)}</code>
      <textarea class="form-control" rows="6" name="outlier_code" style="margin-top:15px;"></textarea>
    `,
    answer: (formData) => formData.get("outlier_code")?.length > 10
  };
}