import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-markdown-to-html";
  const title = "Convert Markdown to HTML";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  // Generate random content elements
  const headings = ["Introduction", "Overview", "Summary", "Analysis", "Results", "Conclusion", "Background", "Methods"];
  const adjectives = ["important", "critical", "essential", "valuable", "significant", "notable", "remarkable"];
  const nouns = ["data", "analysis", "insight", "finding", "result", "observation", "pattern", "trend"];
  const verbs = ["reveals", "shows", "demonstrates", "indicates", "suggests", "proves", "confirms"];

  const heading = pick(headings);
  const boldWord = pick(adjectives);
  const italicWord = pick(nouns);
  const linkText = pick(["documentation", "reference", "guide", "tutorial", "resource"]);
  const verb = pick(verbs);

  // Generate random numbers for list items
  const num1 = Math.floor(random() * 100) + 1;
  const num2 = Math.floor(random() * 100) + 1;
  const num3 = Math.floor(random() * 100) + 1;

  const items = [
    `First item with value ${num1}`,
    `Second item with value ${num2}`,
    `Third item with value ${num3}`
  ];

  // Randomly decide list order (shuffle based on random)
  const sortedItems = [...items].sort(() => random() - 0.5);

  const markdown = `## ${heading}

This **${boldWord}** ${italicWord} ${verb} key insights.

- ${sortedItems[0]}
- ${sortedItems[1]}
- ${sortedItems[2]}

See the [${linkText}](https://example.com) for more details.`;

  // Expected HTML output (minified)
  const expectedHtml = `<h2>${heading}</h2>
<p>This <strong>${boldWord}</strong> ${italicWord} ${verb} key insights.</p>
<ul>
<li>${sortedItems[0]}</li>
<li>${sortedItems[1]}</li>
<li>${sortedItems[2]}</li>
</ul>
<p>See the <a href="https://example.com">${linkText}</a> for more details.</p>`;

  const answer = (input) => {
    // Normalize both strings for comparison
    const normalize = (str) => str.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim().toLowerCase();
    const inputNorm = normalize(input);
    const expectedNorm = normalize(expectedHtml);

    if (inputNorm !== expectedNorm) {
      throw new Error("HTML output does not match expected. Check heading levels, bold/italic tags, list structure, and link format.");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>TechDocs: Markdown Documentation System</h2>
      <p>
        <strong>TechDocs Inc.</strong> is modernizing their documentation pipeline. They need to convert
        Markdown content to clean HTML for their web publishing system. Your task is to demonstrate
        understanding of Markdown syntax by converting the following Markdown to HTML.
      </p>

      <h3>Markdown Input</h3>
      <pre style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;"><code>${markdown}</code></pre>

      <h3>Requirements</h3>
      <ul>
        <li><code>##</code> becomes <code>&lt;h2&gt;</code></li>
        <li><code>**text**</code> becomes <code>&lt;strong&gt;text&lt;/strong&gt;</code></li>
        <li>Paragraphs wrapped in <code>&lt;p&gt;</code> tags</li>
        <li><code>- item</code> becomes <code>&lt;li&gt;</code> inside <code>&lt;ul&gt;</code></li>
        <li><code>[text](url)</code> becomes <code>&lt;a href="url"&gt;text&lt;/a&gt;</code></li>
      </ul>

      <label for="${id}" class="form-label">
        Paste the converted HTML (formatting/whitespace doesn't matter):
      </label>
      <textarea class="form-control" id="${id}" name="${id}" rows="8" required></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution

Use any Markdown parser like Python's markdown library:

# /// script
# requires-python = ">=3.12"
# dependencies = ["markdown"]
# ///
import markdown

md_text = """## Heading

This **bold** text shows key insights.

- First item
- Second item
- Third item

See the [link](https://example.com) for more details."""

html_output = markdown.markdown(md_text)
print(html_output)

Or use online tools like:
- https://markdowntohtml.com/
- Pandoc: pandoc -f markdown -t html input.md

*/
