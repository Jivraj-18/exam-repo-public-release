import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

// Count the number of items in each category
//
// Students are provided with a random list of inventory items. Each item has a category and a
// product name. They must count how many items appear in each category and return the result
// as an array of objects sorted by category name. This encourages students to practice basic
// aggregation and sorting operations on JSON data structures.

export default async function ({ user, weight = 1 }) {
  const id = "q-category-count";
  const title = "Count items per category";

  // deterministic RNG
  const random = seedrandom(`${user.email}#${id}`);
  const categories = ["Furniture", "Groceries", "Stationery", "Electronics", "Clothing"];
  const productPrefixes = ["Premium", "Basic", "Eco", "Luxury", "Value", "Compact"];
  const productItems = ["Chair", "Table", "Pen", "Notebook", "Laptop", "Phone", "Shirt", "Pants"];

  // generate 80 items with random category and name
  const items = Array.from({ length: 80 }, () => {
    const category = categories[Math.floor(random() * categories.length)];
    const name = `${productPrefixes[Math.floor(random() * productPrefixes.length)]} ${productItems[Math.floor(random() * productItems.length)]}`;
    return { category, name };
  });

  // compute expected counts per category
  const counts = {};
  for (const item of items) {
    counts[item.category] = (counts[item.category] || 0) + 1;
  }
  const expected = Object.keys(counts)
    .sort((a, b) => a.localeCompare(b))
    .map((cat) => ({ category: cat, count: counts[cat] }));

  const answer = (input) => {
    let arr;
    try {
      arr = JSON.parse(input);
    } catch (err) {
      throw new Error("Input must be valid JSON array");
    }
    if (!Array.isArray(arr)) throw new Error("Return value must be an array");
    if (arr.length !== expected.length) throw new Error("Array length mismatch");
    // verify each object has category and count and matches expected order
    for (let i = 0; i < expected.length; i++) {
      const provided = arr[i];
      const exp = expected[i];
      if (provided.category !== exp.category || provided.count !== exp.count) {
        throw new Error("Mismatch in category counts");
      }
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        You’ve received an inventory list as a JSON array of objects. Each item has a
        <code>category</code> and a <code>name</code>. Count the number of items in each category and
        return your result as a JSON array of objects sorted by the <code>category</code> name (A→Z).
        Each object in the result should have exactly two properties: <code>category</code> and
        <code>count</code>.
      </p>
      <pre style="white-space: pre-wrap"><code class="language-json">${JSON.stringify(items, null, 2)}</code></pre>
      <label for="${id}" class="form-label">Category counts (JSON array):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
