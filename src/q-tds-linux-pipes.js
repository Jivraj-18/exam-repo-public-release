import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-tds-linux-pipes";
  const title = "Linux Pipes Basics";

  const answer = (response) => {
    const text = response.toLowerCase();
    if (!text.includes("pipe") && !text.includes("|")) {
      throw new Error("Mention pipe operator |");
    }
    if (!text.includes("output") || !text.includes("input")) {
      throw new Error("Explain output to input flow");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        Linux allows chaining commands using pipes.
      </p>
      <p>
        What does the pipe operator (<code>|</code>) do in Linux commands?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
