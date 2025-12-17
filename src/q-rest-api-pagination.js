import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-rest-api-pagination";
  const title = "Paginated API aggregation";
  const random = seedrandom(`${user.email}#${id}`);

  const pageSize = Math.floor(random() * 20) + 10;
  const totalItems = Math.floor(random() * 200) + 100;
  const pages = Math.ceil(totalItems / pageSize);

  const answer = async (v) => {
    if (Number(v) !== pages) {
      throw new Error("Incorrect page count");
    }
    return true;
  };

  const question = html`
    <p>
      An API returns <code>${pageSize}</code> items per page.
      Total items = <code>${totalItems}</code>.
    </p>
    <label>How many API calls are required?</label>
    <input id="${id}" />
  `;

  return { id, title, weight, question, answer };
}