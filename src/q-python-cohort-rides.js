import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-cohort-rides";
  const title = "Python: Ride-Hailing Cohort Retention";

  const random = seedrandom(`${user.email}#${id}`);

  const cohortSize = Math.floor(random() * 50) + 100;
  const activeMonth2 = Math.floor(cohortSize * (0.4 + random() * 0.4));
  const answer = (activeMonth2 / cohortSize).toFixed(2);

  const question = html`
    <p>
      A ride-hailing company tracks monthly rider retention.
    </p>

    <p>
      For a cohort of <strong>${cohortSize}</strong> users who signed up in January:
    </p>

    <ul>
      <li><strong>${activeMonth2}</strong> users were active in Month 2</li>
    </ul>

    <p>
      Compute the <strong>Month 2 retention rate</strong>.
      Return the answer as a decimal rounded to two decimals.
    </p>

    <label class="form-label" for="${id}">Retention rate</label>
    <input class="form-control" id="${id}" name="${id}" />
  `;

  return { id, title, weight, question, answer };
}
