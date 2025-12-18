import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

const expectNumber = (output) => {
  if (!output.match(/\d+/)) throw new Error("Expected a numeric score");
};

export default async function ({ weight = 1 }) {
  const id = "q-hn-api-score";
  const title = "Hacker News API Score Aggregation";

  const question = html`
    <h4>Hacker News API</h4>
    <p>
      Use the official Hacker News Firebase API.
    </p>
    <ol>
      <li>Fetch the latest <strong>top stories</strong></li>
      <li>Take the first <strong>10</strong> items</li>
      <li>Compute the <strong>sum of their scores</strong></li>
    </ol>
    <p>Return only the final number.</p>

    <input class="form-control" id="${id}" />
  `;

  const answer = async (output) => {
    expectNumber(output);
    return true;
  };

  return { id, title, weight, question, answer };
}
