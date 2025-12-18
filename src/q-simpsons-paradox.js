import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-simpsons-paradox";
  const title = "Detecting Simpson’s Paradox";

  const answer = "Segment-level reversal";

  const question = html`
    <div class="mb-3">
      <p>
        In Excel, overall conversion rate for Campaign A is higher than Campaign B.
        However, when broken down by region, Campaign B performs better in every region.
      </p>
      <p>
        What statistical phenomenon explains this contradiction?
      </p>
      <label for="${id}" class="form-label">Phenomenon:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
