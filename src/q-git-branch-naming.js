import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-git-branch-naming";
  const title = "Git Branch Naming Convention";

  const random = seedrandom(`${user.email}#${id}`);
  const rollNumbers = ["B001", "A123", "C456", "D789", "E012"];
  const selectedRoll = rollNumbers[Math.floor(random() * rollNumbers.length)];
  const answer = `exam-${selectedRoll}`;

  const question = html`
    <div class="mb-3">
      <p>According to the README file, what is the correct branch name format when creating a pull request to add new questions to an exam?</p>
      <p>If your roll number is <strong>${selectedRoll}</strong>, what should be the exact branch name?</p>
      
      <label for="${id}" class="form-label">Branch name:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="Enter the correct branch name" />
    </div>
  `;

  return { id, title, weight, question, answer };
}