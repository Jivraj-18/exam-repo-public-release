import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-wikipedia-company-scraper";
  const title = "Wikipedia Data Mining: Tech Company Market Intelligence";

  const random = seedrandom(`${user.email}#${id}`);

  // Tech companies with Wikipedia pages
  const companies = [
    { name: "Microsoft", wiki: "Microsoft" },
    { name: "Apple Inc.", wiki: "Apple_Inc." },
    { name: "Google", wiki: "Google" },
    { name: "Amazon", wiki: "Amazon_(company)" },
    { name: "Meta Platforms", wiki: "Meta_Platforms" },
    { name: "Tesla", wiki: "Tesla,_Inc." },
    { name: "Netflix", wiki: "Netflix" },
    { name: "Adobe Inc.", wiki: "Adobe_Inc." },
    { name: "Salesforce", wiki: "Salesforce" },
    { name: "Oracle Corporation", wiki: "Oracle_Corporation" },
    { name: "IBM", wiki: "IBM" },
    { name: "Intel", wiki: "Intel" },
    { name: "Cisco Systems", wiki: "Cisco" },
    { name: "Nvidia", wiki: "Nvidia" },
    { name: "PayPal", wiki: "PayPal" }
  ];

  // Select a random company for this student
  const selectedCompany = companies[Math.floor(random() * companies.length)];

  let cachedFoundingYear = null;

  const answer = async (response) => {
    if (!response) {
      throw new Error("Please enter the founding year of the company.");
    }

    // Clean input
    const cleaned = response.trim().replace(/[^\d]/g, '');
    const yearInput = parseInt(cleaned);

    if (isNaN(yearInput) || yearInput < 1800 || yearInput > 2025) {
      throw new Error("Please enter a valid year (e.g., 1975).");
    }

    // Fetch Wikipedia page to verify
    if (cachedFoundingYear === null) {
      try {
        const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/html/${selectedCompany.wiki}`;
        const response = await fetch(`/proxy/${wikiUrl}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch Wikipedia page: ${response.status}`);
        }

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Look for founding year in infobox
        const infoboxRows = doc.querySelectorAll('tr');
        let foundingYear = null;

        for (const row of infoboxRows) {
          const header = row.querySelector('th');
          if (header && header.textContent.toLowerCase().includes('founded')) {
            const data = row.querySelector('td');
            if (data) {
              // Extract year from text (looks for 4-digit numbers)
              const yearMatch = data.textContent.match(/\b(1[89]\d{2}|20[0-2]\d)\b/);
              if (yearMatch) {
                foundingYear = parseInt(yearMatch[0]);
                break;
              }
            }
          }
        }

        if (foundingYear) {
          cachedFoundingYear = foundingYear;
        } else {
          throw new Error("Could not extract founding year from Wikipedia. Please try again.");
        }
      } catch (error) {
        throw new Error(`Wikipedia scraping failed: ${error.message}`);
      }
    }

    // Check if answer matches
    if (yearInput === cachedFoundingYear) {
      return true;
    } else {
      const diff = Math.abs(yearInput - cachedFoundingYear);
      if (diff <= 2) {
        throw new Error(
          `Very close! You're off by ${diff} year(s). Double-check the Wikipedia infobox for the exact founding year.`
        );
      } else {
        throw new Error(
          `Incorrect. The founding year is different. Make sure you're extracting the year from the "Founded" field in the Wikipedia infobox, not the incorporation date or other dates.`
        );
      }
    }
  };

  const question = html`
    <div class="mb-3">
      <h2>MarketIQ Research: Automated Company Intelligence</h2>
      
      <div class="alert alert-info">
        <strong><i class="bi bi-building"></i> Company Background:</strong><br>
        You work for <strong>MarketIQ Research</strong>, a competitive intelligence firm that provides market analysis 
        to investment banks, private equity firms, and corporate strategy teams. Your clients need quick access to 
        foundational company data for due diligence, competitive analysis, and market research reports.
      </div>

      <h3>Business Challenge</h3>
      <p>
        Manual research of company histories is time-consuming and expensive. Your team spends hundreds of hours 
        each month compiling basic facts about companies - founding dates, headquarters locations, key executives, 
        and revenue figures. This information is freely available on Wikipedia but requires tedious copy-paste work.
      </p>
      <p>
        The VP of Research has tasked you with building an <strong>automated data extraction pipeline</strong> that 
        scrapes Wikipedia company pages to extract structured information. This will reduce research time from hours 
        to seconds and free up analysts for higher-value work.
      </p>

      <h3>Your Assignment</h3>
      <p>
        As a proof of concept, scrape the Wikipedia page for <strong>${selectedCompany.name}</strong> and extract 
        the company's <strong>founding year</strong> from the infobox.
      </p>

      <h3>What is a Wikipedia Infobox?</h3>
      <div class="card mb-3">
        <div class="card-body">
          <p>
            An <strong>infobox</strong> is the structured data table that appears on the right side of Wikipedia articles. 
            For companies, it typically contains:
          </p>
          <ul class="mb-0">
            <li><strong>Founded:</strong> Founding date/year</li>
            <li><strong>Founder(s):</strong> Names of founders</li>
            <li><strong>Headquarters:</strong> Location</li>
            <li><strong>Key people:</strong> CEO, executives</li>
            <li><strong>Revenue:</strong> Annual revenue</li>
            <li><strong>Employees:</strong> Number of employees</li>
          </ul>
        </div>
      </div>

      <h3>Technical Approach</h3>
      <ol>
        <li>Access the Wikipedia page: 
          <a href="https://en.wikipedia.org/wiki/${selectedCompany.wiki}" target="_blank">
            https://en.wikipedia.org/wiki/${selectedCompany.wiki}
          </a>
        </li>
        <li>Use web scraping techniques to extract the HTML</li>
        <li>Parse the infobox structure (usually a <code>&lt;table&gt;</code> with class "infobox")</li>
        <li>Find the row where the header contains "Founded"</li>
        <li>Extract the year (4-digit number) from that row</li>
        <li>Handle edge cases (multiple dates, text formatting, etc.)</li>
      </ol>

      <h3>Recommended Tools & Methods</h3>
      
      <div class="row mb-3">
        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-header bg-primary text-white">
              <strong>Python Approach</strong>
            </div>
            <div class="card-body">
              <h6>Using BeautifulSoup:</h6>
              <pre class="mb-0"><code class="language-python">import requests
from bs4 import BeautifulSoup

url = "https://en.wikipedia.org/wiki/${selectedCompany.wiki}"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Find infobox
infobox = soup.find('table', class_='infobox')

# Find 'Founded' row
for row in infobox.find_all('tr'):
    header = row.find('th')
    if header and 'founded' in header.text.lower():
        data = row.find('td')
        # Extract year using regex
        import re
        year = re.search(r'\\b(1[89]\\d{2}|20[0-2]\\d)\\b', data.text)
        if year:
            print(year.group(0))
            break</code></pre>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card h-100">
            <div class="card-header bg-success text-white">
              <strong>JavaScript Approach</strong>
            </div>
            <div class="card-body">
              <h6>Using Puppeteer/Playwright:</h6>
              <pre class="mb-0"><code class="language-javascript">const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://en.wikipedia.org/wiki/${selectedCompany.wiki}');
  
  const year = await page.evaluate(() => {
    const rows = document.querySelectorAll('.infobox tr');
    for (const row of rows) {
      const th = row.querySelector('th');
      if (th && th.textContent.toLowerCase().includes('founded')) {
        const td = row.querySelector('td');
        const match = td.textContent.match(/\\b(1[89]\\d{2}|20[0-2]\\d)\\b/);
        return match ? match[0] : null;
      }
    }
  });
  
  console.log(year);
  await browser.close();
})();</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="alert alert-warning">
        <strong><i class="bi bi-exclamation-triangle"></i> Important Considerations:</strong>
        <ul class="mb-0">
          <li><strong>Rate Limiting:</strong> Wikipedia allows scraping but implement delays between requests</li>
          <li><strong>User-Agent:</strong> Set a descriptive User-Agent header identifying your bot</li>
          <li><strong>API Alternative:</strong> Wikipedia offers an API (<code>en.wikipedia.org/api/</code>) that's preferred over scraping</li>
          <li><strong>Robots.txt:</strong> Always check <code>wikipedia.org/robots.txt</code> for scraping rules</li>
          <li><strong>Data Quality:</strong> Wikipedia content can change - implement validation</li>
        </ul>
      </div>

      <h3>🎥 Learning Resources</h3>
      <div class="row mb-3">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">🎥 Web Scraping with Python BeautifulSoup</h6>
              <p class="card-text small">Complete tutorial on scraping Wikipedia</p>
              <a href="https://www.youtube.com/watch?v=XVv6mJpFOb0" target="_blank" class="btn btn-sm btn-danger">
                <i class="bi bi-youtube"></i> Watch Tutorial
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">🎥 Wikipedia API Tutorial</h6>
              <p class="card-text small">Using Wikipedia's official API</p>
              <a href="https://www.youtube.com/watch?v=3UlyxJY76Ec" target="_blank" class="btn btn-sm btn-danger">
                <i class="bi bi-youtube"></i> Watch Tutorial
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">🎥 Ethical Web Scraping Best Practices</h6>
              <p class="card-text small">Legal and ethical considerations</p>
              <a href="https://www.youtube.com/watch?v=fg4Y2S9CvqM" target="_blank" class="btn btn-sm btn-danger">
                <i class="bi bi-youtube"></i> Watch Tutorial
              </a>
            </div>
          </div>
        </div>
      </div>

      <h3>Alternative Data Sources</h3>
      <p>For production systems, consider using structured APIs instead of scraping:</p>
      <ul>
        <li><strong>Wikipedia API:</strong> <a href="https://www.mediawiki.org/wiki/API:Main_page" target="_blank">mediawiki.org/wiki/API</a></li>
        <li><strong>Wikidata:</strong> <a href="https://www.wikidata.org/" target="_blank">wikidata.org</a> (structured company data)</li>
        <li><strong>Crunchbase API:</strong> Comprehensive company database (paid)</li>
        <li><strong>SEC EDGAR:</strong> Public company financial data</li>
      </ul>

      <h3>Step-by-Step Instructions</h3>
      <ol>
        <li>Visit the Wikipedia page for ${selectedCompany.name}</li>
        <li>Inspect the infobox (right-click → Inspect Element)</li>
        <li>Identify the HTML structure of the "Founded" row</li>
        <li>Write code to extract and parse the founding year</li>
        <li>Extract only the 4-digit year (ignore month/day if present)</li>
        <li>Submit the year below</li>
      </ol>

      <div class="alert alert-success">
        <strong><i class="bi bi-lightbulb"></i> Pro Tips:</strong>
        <ul class="mb-0">
          <li>Use browser DevTools to inspect the infobox HTML structure first</li>
          <li>Look for patterns: the "Founded" field is usually in a <code>&lt;th&gt;</code> tag</li>
          <li>Use regex to extract just the year: <code>\\b(1[89]\\d{2}|20[0-2]\\d)\\b</code></li>
          <li>Some companies have multiple dates (founded vs incorporated) - choose the earliest</li>
          <li>Test your code on multiple company pages to ensure it works generally</li>
        </ul>
      </div>

      <h3>Submit Your Answer</h3>
      <label for="${id}" class="form-label">
        <strong>What year was ${selectedCompany.name} founded?</strong>
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="text"
        placeholder="e.g., 1975"
        required
      />
      <div class="form-text">
        Enter the 4-digit founding year extracted from the Wikipedia infobox (e.g., 1998).
        Make sure to get the "Founded" date, not the incorporation or other dates.
      </div>
    </div>
  `;

  return { id, title, weight, question, answer };
}
