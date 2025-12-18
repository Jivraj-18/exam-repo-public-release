import { html } from "lit-html";

export default async function({ user, weight = 1 }) {
  const id = "q-data-viz";
  const title = "Visualization Metadata";

  const answer = (input) => {
    const obj = JSON.parse(input);
    return obj.type && obj.x && obj.y;
  };

  const question = html`
    <p>Describe your visualization as JSON:</p>
    <pre>{ "type": "bar|line|box", "x": "...", "y": "..." }</pre>
    <input class="form-control" id="${id}" />
  `;

  return { id, title, weight, question, answer };
}
