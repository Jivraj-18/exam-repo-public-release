import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function () {
  const id = "q-cosine-similarity";
  const title = "Cosine Similarity Basics";

  const answer = async () => {
    const val = document.getElementById(id).value.trim().toLowerCase();
    if (val !== "similarity") {
      throw new Error("Incorrect answer");
    }
    return true;
  };

  const question = html`
    <p>
      What does cosine similarity primarily measure between two vectors?
    </p>
    <input id="${id}" class="form-control" placeholder="Your answer" />
  `;

  return { id, title, question, answer };
}
