import { html } from "lit-html";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-deployment-choice";
  const title = "Choose Correct Deployment Tool";

  const random = seedrandom(`${user.email}#${id}`);
  const apps = [
    { app: "Static website", expected: "GitHub Pages" },
    { app: "React frontend", expected: "Vercel" },
    { app: "Python API", expected: "Render" },
  ];

  const answer = (input) => {
    const arr = JSON.parse(input);
    return arr.every((v, i) => v === apps[i].expected);
  };

  const question = html`
    <p>Select the most appropriate deployment tool:</p>
    <pre>${JSON.stringify(apps.map(a => a.app))}</pre>
    <label>Answer as JSON array:</label>
    <input class="form-control" id="${id}" />
  `;

  return { id, title, weight, question, answer };
}
