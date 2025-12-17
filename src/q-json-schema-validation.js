import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-schema-validation";
  const title = "Validate JSON records";
  const random = seedrandom(`${user.email}#${id}`);

  const valid = Math.floor(random() * 40) + 20;
  const invalid = Math.floor(random() * 20) + 10;

  const answer = async (v) => {
    if (Number(v) !== invalid) {
      throw new Error("Incorrect invalid count");
    }
    return true;
  };

  const question = html`
    <p>
      Given a JSONL file with ${valid + invalid} records.
      ${valid} conform to schema.
    </p>
    <label>How many records are invalid?</label>
    <input id="${id}" />
  `;

  return { id, title, weight, question, answer };
}