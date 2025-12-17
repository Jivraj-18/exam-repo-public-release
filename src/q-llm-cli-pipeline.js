import { html } from "./utils/display.js";

export default function ({ user, weight = 1 }) {
  const id = "q-llm-cli-pipeline";
  
  return {
    id,
    weight,
    question: html`
      <h3>Simon Willison's llm CLI Pipeline</h3>
      <p>You want to analyze your git commit history to identify commits that might have introduced security vulnerabilities. Which command pipeline would work best?</p>
    `,
    type: "multiple-choice",
    options: [
      {
        value: "a",
        label: html`<code>git log --oneline | llm "find security issues"</code>`,
      },
      {
        value: "b",
        label: html`<code>git log --patch --since="1 month ago" | llm "Analyze these commits for potential security vulnerabilities. Flag any code that handles authentication, file operations, or user input unsafely."</code>`,
      },
      {
        value: "c",
        label: html`<code>llm "show me security issues in git" | git log</code>`,
      },
      {
        value: "d",
        label: html`<code>git diff HEAD~10 | llm</code>`,
      },
    ],
    answer: "b",
  };
}
