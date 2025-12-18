import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-incidence-cycle-basis";
  const title = "Incidence Matrix Cycle Basis Dimension";
  const answer = "2";

  const question = html`
    <div class="mb-3">
      <p>
        In graph analysis, the dimension of the cycle space indicates
        structural redundancy.
      </p>

      <p>
        Given the following signed incidence matrix
        (rows = nodes, columns = edges):
      </p>

      <pre>
[ 1 -1  0  0  0 ]
[ 0  1 -1  0  0 ]
[ 0  0  1 -1  0 ]
[ 0  0  0  1 -1 ]
[-1  0  0  0  1 ]
      </pre>

      <p>
        The cycle basis dimension is computed as:
      </p>

      <pre>edges − nodes + connected components</pre>

      <p>
        Enter the cycle basis dimension.
      </p>

      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
