import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-cron-parsing-24f2007692";
    const title = "Interpret Cron Schedule";
    const rng = seedrandom(`${user.email}#${id}`);

    const minute = Math.floor(rng() * 59);
    const hour = Math.floor(rng() * 23);

    const question = html`
    <div class="mb-3">
      <p>A cron job is scheduled with the expression:</p>
      <pre><code>${minute} ${hour} * * *</code></pre>
      <p>At what hour (0-23) does this job run every day?</p>
      <label for="${id}" class="form-label">Hour:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" required>
    </div>
  `;

    const answer = (val) => Number(val) === hour;

    return { id, title, weight, question, answer };
}
