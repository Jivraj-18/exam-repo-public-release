import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function () {
  const id = "q-sentiment-validation";
  const title = "Validate Sentiment Classification";

  const answer = async () => {
    const value = document.getElementById(id).value.trim();
    if (!["GOOD", "BAD", "NEUTRAL"].includes(value)) {
      throw new Error("Sentiment must be GOOD, BAD, or NEUTRAL");
    }
    return true;
  };

  const question = html`
    <p>
      An AI system classifies text into three sentiment categories.
      Enter a valid sentiment value.
    </p>
    <input id="${id}" class="form-control" placeholder="GOOD / BAD / NEUTRAL" />
  `;

  return { id, title, question, answer };
}
