export default function ({ weight = 1 }) {
  return {
    id: "css-selector-active-row",

    question: `
      You are scraping tabular data from an HTML page using
      browser DevTools or a web scraping tool.

      <br><br>
      The page contains multiple <code>&lt;table&gt;</code> elements.
      Each table contains multiple rows (<code>&lt;tr&gt;</code>),
      and some rows have the class <code>active</code>.

      <br><br>
      What <strong>CSS selector</strong> selects the
      <strong>last active row</strong> from the
      <strong>second table only</strong>?

      <br><br>
      <strong>Answer format:</strong><br>
      A valid CSS selector string.
    `,

    answer: "table:nth-of-type(2) tr.active:last-of-type",

    weight,
  };
}
