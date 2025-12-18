import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-logic";
  const title = "Spreadsheets: IF Condition";

  const random = seedrandom(`${user.email}#${id}`);
  const score = Math.floor(random() * 50) + 30; // Random score 30-80
  const passMark = 50;

  const result = score >= passMark ? "PASS" : "FAIL";

  const answer = (input) => {
    return input.trim().toUpperCase() === result;
  };

  const question = html`
    <div class="mb-3">
      <p>Cell A1 contains the value <strong>${score}</strong>.</p>
      <p>Cell B1 contains the formula: <code>=IF(A1 >= ${passMark}, "PASS", "FAIL")</code></p>
      <p>What is the displayed value in cell B1?</p>
      
      <label for="${id}" class="form-label">Result:</label>
      <input class="form-control" id="${id}" name="${id}" type="text" />
    </div>
  `;

  return { id, title, weight, question, answer };
}