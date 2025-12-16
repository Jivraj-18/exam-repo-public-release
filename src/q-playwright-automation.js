import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1.5 }) {
  const id = "q-playwright-automation";
  const title = "Playwright Web Automation Testing";

  const random = seedrandom(`${user.email}#${id}`);

  const websites = [
    { name: "Wikipedia", url: "https://en.wikipedia.org", selector: "input[name='search']", search: "Python programming" },
    { name: "GitHub", url: "https://github.com", selector: "input[placeholder*='Search']", search: "machine learning" },
    { name: "Stack Overflow", url: "https://stackoverflow.com", selector: "input[name='q']", search: "javascript promises" },
  ];

  const selectedSite = websites[Math.floor(random() * websites.length)];
  const waitTime = Math.floor(random() * 3) + 2;

  const answer = (input) => {
    const code = input.toLowerCase();

    const requiredElements = [
      "playwright",
      "browser",
      "page",
      selectedSite.url.toLowerCase(),
      "click",
      "fill",
      "screenshot",
    ];

    for (const element of requiredElements) {
      if (!code.includes(element)) {
        throw new Error(`Code must include: ${element}`);
      }
    }

    if (!code.includes(selectedSite.search.toLowerCase().split(" ")[0])) {
      throw new Error(`Must search for: ${selectedSite.search}`);
    }

    if (!code.includes("waitfor") && !code.includes("wait_for")) {
      throw new Error("Must include wait condition");
    }

    if (code.split("screenshot").length < 2) {
      throw new Error("Must take at least one screenshot");
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>TestAutomation: Cross-Browser Testing Pipeline</h2>
      <p>
        <strong>TestAutomation Inc.</strong> provides automated testing services for web applications. They need to
        verify search functionality across different websites using Playwright.
      </p>

      <h3>Scenario</h3>
      <p>Test search functionality on: <strong>${selectedSite.name}</strong></p>
      <ul>
        <li><strong>URL:</strong> ${selectedSite.url}</li>
        <li><strong>Search term:</strong> "${selectedSite.search}"</li>
        <li><strong>Wait time:</strong> ${waitTime} seconds for results</li>
      </ul>

      <h3>Task</h3>
      <p>Write a Playwright automation script (Python or JavaScript) that:</p>
      <ol>
        <li>Launches a browser (Chromium/Firefox/WebKit)</li>
        <li>Navigates to <code>${selectedSite.url}</code></li>
        <li>Finds the search input field</li>
        <li>Types "${selectedSite.search}" and submits</li>
        <li>Waits ${waitTime} seconds for search results to load</li>
        <li>Takes a screenshot of the results page</li>
        <li>Closes the browser</li>
      </ol>

      <p class="text-muted">
        Install: <code>pip install playwright && playwright install</code> (Python)<br />
        or <code>npm install playwright</code> (JavaScript)<br />
        Include error handling and headless mode configuration.
      </p>

      <label for="${id}" class="form-label">Paste your Playwright automation code:</label>
      <textarea class="form-control font-monospace" id="${id}" name="${id}" rows="15" required></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
