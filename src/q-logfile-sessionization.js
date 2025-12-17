import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-logfile-sessionization";
  const title = "Sessionize server logs";
  const random = seedrandom(`${user.email}#${id}`);

  const sessions = [];
  let count = 0;

  for (let i = 0; i < 200; i++) {
    const gap = random() * 40;
    if (gap > 30) count++;
    sessions.push(gap);
  }

  const expected = count + 1;

  const answer = async (v) => {
    if (Number(v) !== expected) {
      throw new Error("Incorrect session count");
    }
    return true;
  };

  const question = html`
    <p>
      You are given timestamps of web requests.
      A new session starts if the gap &gt; 30 minutes.
    </p>
    <p>How many sessions are there?</p>
    <input id="${id}" />
  `;

  return { id, title, weight, question, answer };
}