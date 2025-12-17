import { html } from "lit-html";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1.25 }) {
  const id = "q-sql-rolling-spike";
  const title = "SQL: Identify Trailing Activation Spikes";

  const random = seedrandom(`${user.email}#${id}`);
  let maxLift = 0.74 + random() * 0.05;

  const answer = (v) => {
    const n = Number(v.replace("%", "")) / (v.includes("%") ? 100 : 1);
    if (Math.abs(n - maxLift) > 0.05) throw new Error("Incorrect lift.");
    return true;
  };

  const question = html`
    <h2>${title}</h2>
    <p>Using SQL window functions, compute the maximum activation lift vs trailing 7-day average for EMEA.</p>
    <input class="form-control" id="${id}" />
    <p class="text-muted">Answer as decimal or percentage.</p>
  `;

  return { id, title, weight, question, answer };
}
