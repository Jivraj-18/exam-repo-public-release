import { html } from "lit";

export default function ({ weight = 0.8 }) {
  return {
    id: "utf8-byte-length",
    title: "Unicode: UTF-8 Byte Length",
    weight,
    prompt: html`
      <p>
        How many bytes does this string take in UTF-8?
      </p>
      <pre><code>
"A€𐍈"
      </code></pre>
      <p>
        Enter the number only.
      </p>
    `,
    type: "number",
    answer: (v) => Number(v) === 8,
    explanation: html`
      <p>
        A = 1 byte<br/>
        € = 3 bytes<br/>
        𐍈 (U+10348) = 4 bytes<br/>
        Total = 8 bytes
      </p>
    `,
  };
}
