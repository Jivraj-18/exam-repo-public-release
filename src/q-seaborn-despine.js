import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function ({ user, weight = 1 }) {
  return {
    id: "q-seaborn-despine",
    type: "input",
    weight,
    question: html`
      <p>
        <strong>Visualization:</strong> In Seaborn, which function is specifically designed to 
        remove the <strong>top and right spines</strong> (borders) from a plot to make it look cleaner?
      </p>
    `,
    answer: "despine",
    check: (response) => {
      const clean = response.trim().toLowerCase().replace("sns.", "").replace("()", "");
      return clean === "despine";
    },
  };
}