// Question 2: Correlation Analysis and Feature Selection
import { html } from "https://cdn.jsdelivr.net/npm/lit@3/index.js";

export default function ({ user, weight = 1 }) {
  const email = user?.email || "student@example.com";
  const rollNumber = email.split("@")[0];
  const seed = rollNumber.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  const feature1 = Array.from({ length: 5 }, (_, i) => 10 + ((seed + i * 7) % 20));
  const target = feature1.map((val, i) => Math.round(val * 1.5 + ((seed + i * 3) % 10)));

  return {
    id: "correlation-analysis",
    weight,
    question: html`
      <h3>Correlation Analysis</h3>
      <p>Analyze the correlation between <b>Feature 1</b> and the <b>Target</b>:</p>
      <ul>
        <li><b>Feature 1:</b> ${JSON.stringify(feature1)}</li>
        <li><b>Target:</b> ${JSON.stringify(target)}</li>
      </ul>
      <textarea class="form-control" rows="5" name="corr_ans" placeholder="Explain your analysis here..."></textarea>
    `,
    answer: (formData) => formData.get("corr_ans")?.length > 15
  };
}