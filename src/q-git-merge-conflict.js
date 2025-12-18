import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-git-merge-conflict";
  const title = "Git Branch Merge Conflict Resolution";

  const random = seedrandom(`${user.email}#${id}`);
  const scenarios = [
    {
      question: "You created a branch 'feature-analysis' and modified analysis.py. Your teammate also modified the same file on main. When merging, you get a conflict.",
      options: [
        "Delete your branch and start over",
        "Run git merge --abort, pull main, then copy-paste changes",
        "Resolve conflicts in files, then git add and git commit",
        "Use git reset --hard to remove conflicts"
      ],
      answer: 2
    },
    {
      question: "While merging your feature branch into main, Git reports conflicts in config.json. What's the correct way to handle this?",
      options: [
        "Force push your branch to overwrite main",
        "Edit the conflicted files to resolve markers, stage them, and commit",
        "Delete config.json and recreate it from scratch",
        "Checkout the file from main and lose your changes"
      ],
      answer: 1
    }
  ];

  const scenario = scenarios[Math.floor(random() * scenarios.length)];
  const shuffledOptions = scenario.options.map((opt, idx) => ({ opt, idx }))
    .sort(() => random() - 0.5);
  
  const correctIndex = shuffledOptions.findIndex(item => item.idx === scenario.answer);
  const answer = String.fromCharCode(65 + correctIndex); // A, B, C, D

  const question = html`
    <div class="mb-3">
      <p>${scenario.question}</p>
      <p>Which of the following is the correct approach?</p>
      <div class="mt-2">
        ${shuffledOptions.map((item, idx) => html`
          <div class="form-check">
            <input class="form-check-input" type="radio" name="${id}" id="${id}-${idx}" value="${String.fromCharCode(65 + idx)}">
            <label class="form-check-label" for="${id}-${idx}">
              ${String.fromCharCode(65 + idx)}) ${item.opt}
            </label>
          </div>
        `)}
      </div>
    </div>
  `;

  return { id, title, weight, question, answer };
}
