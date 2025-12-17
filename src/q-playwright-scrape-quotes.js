import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-playwright-scrape-quotes";
  const title = "Playwright: Scrape JavaScript-Rendered Content";

  const random = seedrandom(`${user.email}#${id}`);
  
  const pages = [
    { num: 1, url: "https://quotes.toscrape.com/js/" },
    { num: 2, url: "https://quotes.toscrape.com/js/page/2/" },
    { num: 3, url: "https://quotes.toscrape.com/js/page/3/" },
    { num: 4, url: "https://quotes.toscrape.com/js/page/4/" },
    { num: 5, url: "https://quotes.toscrape.com/js/page/5/" }
  ];
  
  const selectedPage = pages[Math.floor(random() * pages.length)];
  
  // Expected answer: count of quotes on that page (typically 10)
  const answer = 10;

  const answerFn = (response) => {
    const num = parseInt(response.trim());
    
    if (isNaN(num)) {
      throw new Error("Please enter a valid number");
    }
    
    if (num !== answer) {
      throw new Error(`Incorrect count. Make sure you scraped page ${selectedPage.num} correctly using Playwright.`);
    }
    
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Playwright: Scraping JavaScript-Rendered Pages</h2>
      <p>
        Many modern websites load content dynamically using JavaScript. The <code>requests</code> library 
        cannot execute JavaScript, so it only sees empty HTML. Playwright runs a real browser that executes 
        JavaScript before scraping, giving you the actual rendered content.
      </p>

      <h3>Your Task</h3>
      <p>
        Use Playwright to scrape <strong>page ${selectedPage.num}</strong> of Quotes to Scrape (JS version) 
        and count how many quotes are displayed.
      </p>

      <h3>Target URL</h3>
      <pre>${selectedPage.url}</pre>

      <h3>Why You Need Playwright</h3>
      <p>Try viewing the page source (Ctrl+U) - you won't see any quotes! They're loaded by JavaScript.</p>

      <h3>Setup Instructions</h3>
      <ol>
        <li><strong>Install Playwright:</strong>
          <pre>pip install playwright
# or
uv add playwright</pre>
        </li>
        <li><strong>Install browser (one-time):</strong>
          <pre>python -m playwright install chromium</pre>
        </li>
      </ol>

      <h3>Python Script Template</h3>
      <pre><code># /// script
# dependencies = ["playwright"]
# ///

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("${selectedPage.url}")
    
    # Each quote has class "quote"
    quotes = page.query_selector_all(".quote")
    
    print(f"Found {len(quotes)} quotes")
    
    browser.close()</code></pre>

      <h3>Expected Output</h3>
      <p>Your script should print something like:</p>
      <pre>Found 10 quotes</pre>

      <h3>Hints</h3>
      <ul>
        <li>Use <code>page.query_selector_all(".quote")</code> to find all quote elements</li>
        <li>Use <code>len()</code> to count the elements</li>
        <li>The site loads quotes via JavaScript, so requests won't work</li>
        <li>If you get an error, make sure you ran <code>playwright install chromium</code></li>
      </ul>

      <label for="${id}" class="form-label">
        How many quotes are on page ${selectedPage.num}?
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        type="number" 
        required 
        placeholder="Enter the count" 
      />
      <p class="text-muted">
        Run your Playwright script on ${selectedPage.url} and count the quotes.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer: answerFn };
}

/*
SOLUTION APPROACH:

1. INSTALL PLAYWRIGHT:
   pip install playwright
   python -m playwright install chromium

2. CREATE PYTHON SCRIPT (scraper.py):
   from playwright.sync_api import sync_playwright

   with sync_playwright() as p:
       browser = p.chromium.launch(headless=True)
       page = browser.new_page()
       page.goto("${selectedPage.url}")
       quotes = page.query_selector_all(".quote")
       print(f"Found {len(quotes)} quotes")
       browser.close()

3. RUN SCRIPT:
   python scraper.py
   # or
   uv run scraper.py

4. OUTPUT:
   Found 10 quotes

5. SUBMIT ANSWER:
   Enter: 10

Key Learning: Playwright executes JavaScript before scraping,
enabling access to dynamically-loaded content that requests can't reach.
*/
