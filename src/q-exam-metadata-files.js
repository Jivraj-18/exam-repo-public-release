import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-exam-metadata-files";
  const title = "Exam Metadata Files";

  const random = seedrandom(`${user.email}#${id}`);
  const examNames = ["statistics", "programming", "algorithms", "databases", "networks"];
  const selectedExam = examNames[Math.floor(random() * examNames.length)];
  const answer = `exam-${selectedExam}.info.js`;

  const question = html`
    <div class="mb-3">
      <p>According to the README file, when creating a new exam, you need two files: one for questions and one for metadata.</p>
      <p>If you create an exam named <strong>${selectedExam}</strong>, what should be the exact filename for the metadata file that defines exam settings and instructions?</p>
      
      <label for="${id}" class="form-label">Metadata filename:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="Enter the metadata filename" />
    </div>
  `;

  return { id, title, weight, question, answer };
}