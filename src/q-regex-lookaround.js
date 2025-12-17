import { html } from "lit";

export default function ({ weight = 0.7 }) {
  return {
    id: "regex-lookaround",
    title: "Regex: Lookaround Logic",
    weight,
    prompt: html`
      <p>
        Consider the regex:
      </p>
      <pre><code>
/^(?=.*a)(?!.*bb)[a-z]+$/
      </code></pre>
      <p>
        How many of the following strings match?
      </p>
      <pre><code>
ab
abb
ba
baba
bbb
aaab
      </code></pre>
      <p>
        Enter the number only.
      </p>
    `,
    type: "number",
    answer: (v) => Number(v) === 3,
    explanation: html`
      <p>
        Must contain <code>a</code>, must NOT contain <code>bb</code>, lowercase only.
        Matches: ab, ba, baba.
      </p>
    `,
  };
}
