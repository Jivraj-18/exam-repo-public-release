import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import _ from "https://cdn.jsdelivr.net/npm/lodash@4/+esm";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 0.5 }) {
  const id = "q-excel-sales-forecast";
  const title = "Use Excel: Sales Forecast Formula";

  const random = seedrandom(`${user.email}#${id}`);

  const sales = Array.from({ length: 12 }, () => Math.floor(random() * 1000));
  const n = Math.floor(random() * 5) + 3;
  const answer = _.sum(_.takeRight(_.sortBy(sales), n));

  const question = html`
    <p>
      A retail analyst is forecasting revenue using Excel 365 dynamic arrays.
    </p>

    <p>
      Enter the following formula into Excel:
    </p>

    <pre><code class="language-excel">
=SUM(TAKE(SORT({${sales.join(",")}}), -${n}))
    </code></pre>

    <p>
      What is the result?
    </p>

    <label class="form-label" for="${id}">Result</label>
    <input class="form-control" id="${id}" name="${id}" />

    <p class="text-muted">
      Note: This only works in Excel 365 or Excel Online.
    </p>
  `;

  return { id, title, weight, question, answer };
}
