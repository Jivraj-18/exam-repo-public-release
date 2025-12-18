import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-csv-to-tree";
    const title = "Data Wrangling: E-Commerce Taxonomy Migration";

    const random = seedrandom(`${user.email}#${id}`);

    // Data Generation
    const cats = ["Electronics", "HomeAndGarden", "Fashion"];
    const subs = ["Laptops", "Smartphones", "Furniture", "Decor", "MensWear", "WomensWear"];
    const items = ["ModelX", "ModelY", "Gen1", "Gen2", "Classic", "Modern"];

    const csvLines = ["Category,SubCategory,ProductModel"];
    const expectedTree = {};

    const numRows = 12;
    for (let i = 0; i < numRows; i++) {
        const c = cats[Math.floor(random() * cats.length)];
        const s = subs[Math.floor(random() * subs.length)];
        const it = items[Math.floor(random() * items.length)] + "-" + Math.floor(random() * 100);

        csvLines.push(`${c},${s},${it}`);

        if (!expectedTree[c]) expectedTree[c] = {};
        if (!expectedTree[c][s]) expectedTree[c][s] = [];
        if (!expectedTree[c][s].includes(it)) expectedTree[c][s].push(it);
    }

    // Answer Validation
    const answer = (input) => {
        let userJson;
        try {
            userJson = JSON.parse(input);
        } catch {
            throw new Error("Input must be valid JSON.");
        }

        // Deep sort for comparison
        const sortObj = (obj) => {
            if (Array.isArray(obj)) return obj.sort();
            if (typeof obj === 'object' && obj !== null) {
                const sorted = {};
                Object.keys(obj).sort().forEach(key => {
                    sorted[key] = sortObj(obj[key]);
                });
                return sorted;
            }
            return obj;
        };

        const sortedExpected = sortObj(expectedTree);
        const sortedUser = sortObj(userJson);

        if (JSON.stringify(sortedUser) !== JSON.stringify(sortedExpected)) {
            throw new Error("The hierarchical structure or data contents do not match the expected result.");
        }
        return true;
    };

    const question = html`
    <div class="mb-3">
      <h2>E-Commerce Taxonomy Migration</h2>
      <h3>Context</h3>
      <p>
        <strong>ShopGlobal Inc.</strong> is migrating its legacy product database to a new NoSQL-based catalog system.
        The legacy system exports data in flat CSV files, but the new API requires a nested JSON hierarchy to 
        properly display navigation menus.
      </p>
      <p>
        As a Data Engineer, you have been tasked with writing a transformation script to convert these flat 
        CSV exports into structured JSON trees.
      </p>
      <h3>Your Task</h3>
      <p>
        Convert the provided CSV data (Category, SubCategory, ProductModel) into a nested JSON object 
        following this structure:
      </p>
      <pre><code>{
  "CategoryName": {
    "SubCategoryName": [ "ProductModel1", "ProductModel2" ]
  }
}</code></pre>
      <h3>Input Data (CSV)</h3>
      <pre style="background: #f8f9fa; padding: 15px; border-radius: 5px;">${csvLines.join("\n")}</pre>
      
      <label for="${id}" class="form-label">
        Paste the resulting JSON structure:
      </label>
      <textarea class="form-control" id="${id}" name="${id}" rows="6" required></textarea>
    </div>
  `;

    return { id, title, weight, question, answer };
}
