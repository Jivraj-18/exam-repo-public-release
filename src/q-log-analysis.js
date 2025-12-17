import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { download } from "./download.js";

const pick = (r, a) => a[Math.floor(r() * a.length)];

export const questionFactory = (random, id) => {
  const levels = ["INFO", "WARN", "ERROR"];
  const logs = [];
  let errorCount = 0;

  for (let i = 0; i < 120; i++) {
    const level = pick(random, levels);
    if (level === "ERROR") errorCount++;
    logs.push({ level, msg: `Message ${i}` });
  }

  const blob = new Blob([logs.map(JSON.stringify).join("\n")], {
    type: "application/jsonl",
  });

  return {
    title: "Log Analysis: Severity Counting",
    question: html`
      <p>
        You are given application logs in JSONL format.
      </p>
      <button class="btn btn-sm btn-outline-primary"
        @click=${() => download(blob, `${id}.jsonl`)}>
        ${id}.jsonl
      </button>
      <p class="mt-3">
        <strong>Task:</strong> Count how many logs have level <code>ERROR</code>.
      </p>
      <input class="form-control" id="${id}" />
    `,
    answer: async (value) => {
      if (Number(value) !== errorCount) {
        throw new Error("Incorrect ERROR count.");
      }
      return true;
    },
  };
};