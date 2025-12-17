import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-commandline-data-reduction";
  const title = "Reduce dataset using CLI";
  const random = seedrandom(`${user.email}#${id}`);

  const rows = Math.floor(random() * 500) + 500;
  const filtered = Math.floor(rows * 0.37);

  const answer = async (v) => {
    if (Number(v) !== filtered) {
      throw new Error("Incorrect row count");
    }
    return true;
  };

  const question = html`
    <p>
      A dataset has ${rows} rows.
      After applying a filter, 37% remain.
    </p>
    <label>How many rows remain?</label>
    <input id="${id}" />
  `;

  return { id, title, weight, question, answer };
}