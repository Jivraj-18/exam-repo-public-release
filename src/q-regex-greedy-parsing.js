import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1.5 }) {
  const id = "q-regex-greedy-parsing";
  const title = "Regex Greedy Quantifiers";
  const random = seedrandom(`${user.email}#${id}`);

  const tag = ["div", "span", "p"][Math.floor(random() * 3)];
  const content1 = "First";
  const content2 = "Second";
  const text = `<${tag}>${content1}</${tag}><${tag}>${content2}</${tag}>`;

  const question = html`
    <p>You are scraping a messy HTML file using standard Regex (Python <code>re</code> or JavaScript).</p>
    <p>The text is: <code>${text}</code></p>
    <p>You run the pattern: <code>&lt;${tag}&gt;.*&lt;/${tag}&gt;</code></p>
    <p>What is the <strong>exact full match</strong> returned?</p>
    <p>(Copy and paste the exact string from the start of the match to the end).</p>
  `;

  return {
    id,
    title,
    question,
    // Syllabus mapping: Data Prep > Regex
    check: (answer) => {
      const ans = String(answer).trim();
      // Logic: .* is greedy. It will match from the first opening tag to the LAST closing tag.
      if (ans === text) return true;
      throw new Error("Incorrect. Remember that '*' is greedy and will consume as much text as possible while still allowing the pattern to end.");
    },
    weight,
  };
}
