import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-playwright-scrape-js";
  const title = "Playwright: Scrape a JS-rendered site";

  const random = seedrandom(`${user.email}#${id}`);
  const minItems = Math.floor(random() * 6) + 10; // 10-15 items
  const requiredFields = ["id", "title", "price"];

  const answer = async (codeText) => {
    try {
      if (!codeText || typeof codeText !== "string") {
        throw new Error("Please paste your Playwright scraper code");
      }

      const codeLower = codeText.toLowerCase();
      
      // Check Playwright usage
      const usesPlaywright =
        codeLower.includes("playwright") || 
        codeLower.includes("@playwright") || 
        codeLower.includes("chromium") ||
        codeLower.includes("firefox") ||
        codeLower.includes("webkit");
      if (!usesPlaywright) {
        throw new Error("Code must import/use Playwright (chromium/firefox/webkit)");
      }

      // Check JS-rendering handling
      const handlesJs = 
        codeLower.includes("waitforloadstate") || 
        codeLower.includes("waitForLoadState") ||
        codeLower.includes("page.goto") ||
        codeLower.includes("locator(") || 
        codeLower.includes("evaluate(") ||
        codeLower.includes("page.");
      if (!handlesJs) {
        throw new Error("Code must handle JS-rendered content (waitForLoadState/locator/page methods)");
      }

      // Check for pagination or scroll handling
      const handlesPagination = 
        codeLower.includes("while") || 
        codeLower.includes("for") ||
        codeLower.includes("loop") ||
        codeLower.includes("pagination") ||
        codeLower.includes("scroll");

      // Check for JSON output
      const outputsJson = 
        codeLower.includes("json") ||
        codeLower.includes(".stringify") ||
        codeLower.includes("writefile");
      if (!outputsJson) {
        throw new Error("Code must output JSON (use JSON.stringify or write to file)");
      }

      // Check for data extraction
      const extractsData = 
        codeLower.includes("push") || 
        codeLower.includes("append") ||
        codeLower.includes("array") ||
        codeLower.includes(".map") ||
        codeLower.includes(".select");
      if (!extractsData) {
        throw new Error("Code must extract data into a collection (array/list)");
      }

      return true;
    } catch (error) {
      throw new Error(`Code validation failed: ${error.message}`);
    }
  };

  const question = html`
    <div class="mb-3">
      <h2>Scrape a dynamic e-commerce page with Playwright</h2>
      <p>
        Use <strong>Playwright</strong> to scrape a JavaScript-rendered e-commerce/product listing page. Handle
        pagination or infinite scroll, wait for network idleness, and extract a clean JSON dataset.
      </p>
      <h3>What to submit</h3>
      <p>Paste your complete Playwright scraper code (JavaScript) in the text area below.</p>

      <h3>Steps to solve</h3>
      <ol>
        <li>Write a Playwright script in JavaScript (Node.js).</li>
        <li>Pick any product/listing page that requires JavaScript to render items.</li>
        <li>Use Playwright (chromium/firefox/webkit) with <code>page.goto</code> and <code>await page.waitForLoadState('networkidle')</code>.</li>
        <li>Handle pagination or infinite scroll in a loop until no new items load.</li>
        <li>Extract for each item: <code>id</code> (slug or href), <code>title</code>, <code>price</code>. Collect into an array.</li>
        <li>Ensure you output or collect at least <strong>${minItems}</strong> items.</li>
        <li>Paste your complete code below (no need to run it; we validate the structure).</li>
      </ol>

      <h3>Code checklist</h3>
      <ul>
        <li>✓ Imports Playwright (chromium/firefox/webkit)</li>
        <li>✓ Uses <code>page.goto</code> and <code>page.waitForLoadState</code></li>
        <li>✓ Handles pagination/scroll in a loop</li>
        <li>✓ Extracts <code>id</code>, <code>title</code>, <code>price</code> per item</li>
        <li>✓ Outputs or collects data to JSON</li>
        <li>✓ ≥${minItems} items extracted</li>
      </ul>

      <label for="${id}" class="form-label"> Paste your Playwright scraper code </label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="15"
        required
        placeholder="Paste your code here"
      ></textarea>
      <p class="text-muted">
        We will validate that your code uses Playwright, handles JS-rendered content, and extracts data.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
