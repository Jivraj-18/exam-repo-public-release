import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { download } from "./download.js";

export const questionFactory = (random, id) => {
  const users = [];
  const orders = [];
  let matched = 0;

  for (let i = 1; i <= 20; i++) {
    users.push({ id: i, name: `U${i}` });
  }

  for (let j = 0; j < 40; j++) {
    const uid = Math.floor(random() * 25) + 1;
    if (uid <= 20) matched++;
    orders.push({ user_id: uid, amount: 10 });
  }

  const blob = new Blob(
    [JSON.stringify({ users, orders }, null, 2)],
    { type: "application/json" }
  );

  return {
    title: "Data Joining: Foreign Key Match",
    question: html`
      <p>
        You are given users and orders datasets.
      </p>
      <button class="btn btn-sm btn-outline-primary"
        @click=${() => download(blob, `${id}.json`)}>
        ${id}.json
      </button>
      <p class="mt-3">
        <strong>Task:</strong> Count orders that match an existing user.
      </p>
      <input class="form-control" id="${id}" />
    `,
    answer: async (value) => {
      if (Number(value) !== matched) {
        throw new Error("Incorrect join count.");
      }
      return true;
    },
  };
};