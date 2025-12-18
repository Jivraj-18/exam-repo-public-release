import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-exam-url-structure";
  const title = "Exam URL Structure";

  const random = seedrandom(`${user.email}#${id}`);
  const examNames = ["midterm", "final", "quiz1", "assessment", "practice"];
  const selectedExam = examNames[Math.floor(random() * examNames.length)];
  const answer = `https://exam.sanand.workers.dev/${selectedExam}`;

  const question = html`
    <div class="mb-3">
      <p>According to the README file, what is the URL structure for accessing an exam?</p>
      <p>If you create an exam named <strong>${selectedExam}</strong>, what would be the complete URL to access it?</p>
      
      <label for="${id}" class="form-label">Complete URL:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="Enter the complete URL" />
    </div>
  `;

  return { id, title, weight, question, answer };
}