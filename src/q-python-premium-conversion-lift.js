// File: q-python-premium-conversion-lift.js
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-premium-conversion-lift";
  const title = "Python Conversion Lift Analysis";
  const answer = "Email";

  const question = html`
    <div class="mb-3">
      <p>
        After aggregating sessions and conversions in Pandas and computing
        conversion rates for <strong>Premium</strong> and
        <strong>Standard</strong> users, which
        <strong>marketing channel</strong> shows the
        <strong>highest positive conversion lift</strong>
        (Premium − Standard)?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
