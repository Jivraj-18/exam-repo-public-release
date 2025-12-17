import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function ({ user, weight = 1 }) {
  return {
    id: "q-pandas-merge-left",
    type: "input",
    weight,
    question: html`
      <p>
        <strong>Data Prep:</strong> You have two DataFrames: <code>customers</code> and <code>orders</code>. 
        You want to merge them to see purchase history, but you must ensure that 
        <strong>all customers</strong> are retained in the result, even those who have never placed an order.
        <br><br>
        What value should you pass to the <code>how</code> parameter in <code>pd.merge()</code>?
      </p>
    `,
    answer: "left",
    check: (response) => {
      const clean = response.trim().toLowerCase().replace(/'/g, "").replace(/"/g, "");
      return clean === "left";
    },
  };
}