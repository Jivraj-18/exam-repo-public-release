export default ({ user, weight }) => ({
  id: "log-count",
  weight: weight || 1.0,
  question: /* html */ `
    <h3>4. Case Study: Production Log Forensics</h3>
    <p>Download the log file: <a href="/files/production.log" target="_blank">production.log</a>.</p>
    <p>Use a combination of <code>grep</code> and <code>wc</code> to count how many lines contain the word <b>"TIMEOUT"</b> specifically for the <b>"APAC"</b> region:</p>
    <pre><code>grep "APAC" production.log | grep "TIMEOUT" | wc -l</code></pre>
    <p>Enter the <b>total count</b> below:</p>
  `,
  type: "text-input",
  validate: (input) => !isNaN(parseInt(input)),
});