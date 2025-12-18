import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export async function questions(user, elementMap) {
  const results = {};

  const questions = [
    {
      id: "q-cli-grep-basic",
      title: "Count matching lines using grep",
      weight: 1,
      question: html`
        <p>
          You have a file <code>logs.txt</code>.  
          Write a <code>grep</code> command to count how many lines contain the word
          <code>ERROR</code>.
        </p>
        <input class="form-control" name="q-cli-grep-basic" />
        <button
          type="button"
          class="btn btn-sm btn-outline-primary check-answer"
          data-question="q-cli-grep-basic"
        >
          Check
        </button>
      `,
      answer: "grep -c ERROR logs.txt",
    },
  ];

  const container = elementMap.get(document.getElementById("questions"));

  for (const q of questions) {
    container.insertAdjacentHTML(
      "beforeend",
      `<div class="mb-4" data-question="${q.id}" id="${q.id}"></div>`
    );

    document.getElementById(q.id).append(q.question);

    results[q.id] = {
      weight: q.weight,
      answer: q.answer,
    };
  }

  return results;
}
