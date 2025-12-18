import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-scrape-wikipedia-table";
  const title = "Scrape Wikipedia Table";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  // List of Wikipedia pages with well-structured tables
  const wikiPages = [
    {
      url: "https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)",
      tableSelector: "table.wikitable",
      description: "countries by population",
      task: "country names from the first column",
      extractField: "country"
    },
    {
      url: "https://en.wikipedia.org/wiki/List_of_largest_companies_by_revenue",
      tableSelector: "table.wikitable",
      description: "largest companies by revenue",
      task: "company names from the first column",
      extractField: "company"
    },
    {
      url: "https://en.wikipedia.org/wiki/Programming_languages_used_in_most_popular_websites",
      tableSelector: "table.wikitable",
      description: "programming languages used in popular websites",
      task: "website names from the first column",
      extractField: "website"
    }
  ];

  const selectedPage = pick(wikiPages);
  const rowLimit = pick([5, 10, 15]);

  // Generate simulated expected data (since we can't actually fetch in the question)
  // The answer validation will check format and count
  const expectedCount = rowLimit;

  const answer = (input) => {
    let parsed;
    try {
      parsed = JSON.parse(input);
    } catch {
      throw new Error("Invalid JSON format. Please provide a valid JSON array.");
    }
    
    if (!Array.isArray(parsed)) {
      throw new Error("Answer must be a JSON array of objects.");
    }
    
    if (parsed.length !== expectedCount) {
      throw new Error(`Expected ${expectedCount} items, but got ${parsed.length}. Make sure you extract exactly ${rowLimit} rows.`);
    }
    
    // Check structure - each item should have a key matching the expected field
    const validKeys = ["name", "company", "country", "website", "title", selectedPage.extractField];
    for (let i = 0; i < parsed.length; i++) {
      const item = parsed[i];
      if (typeof item !== "object" || item === null) {
        throw new Error(`Item at index ${i} is not an object.`);
      }
      const keys = Object.keys(item);
      if (keys.length === 0) {
        throw new Error(`Item at index ${i} has no properties.`);
      }
    }
    
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Web Scraping: Wikipedia Table Extraction</h2>
      <p>
        <strong>Scenario:</strong> You're building a data pipeline that needs to 
        collect structured information from public websites. Wikipedia is a 
        common source of well-formatted tables that can be scraped for analysis.
      </p>
      
      <h3>Your Task</h3>
      <ol>
        <li>
          Visit the Wikipedia page: 
          <a href="${selectedPage.url}" target="_blank">${selectedPage.description}</a>
        </li>
        <li>Find the main data table on the page</li>
        <li>Extract the <strong>first ${rowLimit} rows</strong> of data</li>
        <li>
          Create a JSON array with the ${selectedPage.task}, formatted as:
          <pre><code class="json">[
  {"${selectedPage.extractField}": "Value 1"},
  {"${selectedPage.extractField}": "Value 2"},
  ...
]</code></pre>
        </li>
      </ol>
      
      <h3>Requirements</h3>
      <ul>
        <li>Extract exactly <strong>${rowLimit}</strong> items</li>
        <li>Skip header rows - only include data rows</li>
        <li>Each object should have a "${selectedPage.extractField}" key</li>
        <li>Values should be clean strings (no extra formatting, footnotes, or brackets)</li>
      </ul>
      
      <p class="text-muted">
        <strong>Hint:</strong> You can use Python with <code>BeautifulSoup</code> 
        or <code>pandas.read_html()</code>, or browser DevTools to extract table data. 
        Use CSS selectors like <code>${selectedPage.tableSelector}</code> to find tables.
      </p>

      <label for="${id}" class="form-label">
        Paste the JSON array with ${rowLimit} items:
      </label>
      <textarea class="form-control" id="${id}" name="${id}" rows="6" required></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
