import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-storage-conversion-24f2007692";
    const title = "Data Unit Conversion";
    const rng = seedrandom(`${user.email}#${id}`);

    const gb = Math.floor(rng() * 5) + 1;
    const expectedMb = gb * 1024;

    const question = html`
    <div class="mb-3">
      <p>How many <strong>MiB</strong> (Mebibytes) are there in <strong>${gb} GiB</strong> (Gibibytes)?</p>
      <label for="${id}" class="form-label">Answer in MiB:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" required>
    </div>
  `;

    const answer = (val) => Number(val) === expectedMb;

    return { id, title, weight, question, answer };
}
