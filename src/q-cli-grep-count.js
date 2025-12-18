import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function qCliGrepCount() {
  return {
    id: "q-cli-grep-count",
    title: "CLI: grep count",
    weight: 1,
    question: html`
      <div class="mb-3">
        <p>
          You are given a log file <code>server.log</code>.
          Write a Linux command to count how many lines contain the word
          <code>ERROR</code>, ignoring case.
        </p>
        <label class="form-label">Command:</label>
        <input class="form-control" name="q-cli-grep-count" />
      </div>
    `,
    answer: "grep -i ERROR server.log | wc -l",
  };
}
