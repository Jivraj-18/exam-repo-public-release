import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-xml-data-extraction";
  const title = "Extract Data from XML Structure";

  // deterministic RNG
  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  const categories = ["Fiction", "Science", "History", "Technology"];
  const publishers = ["Penguin", "O'Reilly", "McGraw-Hill", "Wiley"];
  
  // generate 20 books
  const books = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Book ${i + 1}`,
    author: `Author ${String.fromCharCode(65 + Math.floor(random() * 10))}`,
    year: 2000 + Math.floor(random() * 25),
    price: Number((10 + random() * 90).toFixed(2)),
    category: pick(categories),
    publisher: pick(publishers),
    pages: Math.floor(random() * 500) + 100,
  }));

  // find books published after a certain year with price under threshold
  const thresholdYear = 2010 + Math.floor(random() * 10);
  const maxPrice = Number((30 + random() * 40).toFixed(2));
  
  const matchingBooks = books.filter(b => b.year > thresholdYear && b.price < maxPrice);
  const expectedCount = matchingBooks.length;

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<library>
${books.map(b => `  <book id="${b.id}">
    <title>${b.title}</title>
    <author>${b.author}</author>
    <year>${b.year}</year>
    <price>${b.price}</price>
    <category>${b.category}</category>
    <publisher>${b.publisher}</publisher>
    <pages>${b.pages}</pages>
  </book>`).join('\n')}
</library>`;

  const answer = (input) => {
    const count = parseInt(input.trim());
    return count === expectedCount;
  };

  const question = html`
    <div class="mb-3">
      <p>
        You're managing a library's XML database. Below is an XML file with <strong>20 books</strong>.
      </p>
      <p>
        <strong>Task:</strong> Count how many books meet BOTH criteria:
      </p>
      <ol>
        <li>Published <strong>after year ${thresholdYear}</strong></li>
        <li>Price <strong>less than $${maxPrice.toFixed(2)}</strong></li>
      </ol>
      <pre style="white-space: pre-wrap; max-height: 400px; overflow-y: auto;"><code class="language-xml">
${xmlContent}
      </code></pre>
      <p><strong>Hint:</strong> You can parse XML using Python's <code>xml.etree.ElementTree</code> or JavaScript's <code>DOMParser</code></p>
      <label for="${id}" class="form-label">
        Number of matching books:
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
