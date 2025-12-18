import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-arxiv-paper-search";
  const title = "arXiv API: Research Paper Analysis";

  const random = seedrandom(`${user.email}#${id}`);

  // arXiv categories with good paper volume
  const categories = [
    { code: "cs.AI", name: "Artificial Intelligence" },
    { code: "cs.LG", name: "Machine Learning" },
    { code: "cs.CL", name: "Computation and Language" },
    { code: "cs.CV", name: "Computer Vision" },
    { code: "cs.DB", name: "Databases" },
    { code: "cs.SE", name: "Software Engineering" },
    { code: "cs.NE", name: "Neural and Evolutionary Computing" },
    { code: "cs.IR", name: "Information Retrieval" },
    { code: "stat.ML", name: "Machine Learning (Statistics)" },
    { code: "cs.CR", name: "Cryptography and Security" },
  ];

  const category = pick(categories, random);
  const maxResults = 30 + Math.floor(random() * 21); // 30-50

  // Generate a search term from common ML/AI keywords
  const searchTerms = [
    "neural network",
    "deep learning",
    "transformer",
    "attention",
    "classification",
    "regression",
    "optimization",
    "reinforcement",
    "generative",
    "embedding",
  ];
  const searchTerm = pick(searchTerms, random);

  let expectedAnswer = null;

  const answer = async (response) => {
    if (!response) throw new Error("Please enter the count of papers with the search term in abstract.");

    const value = parseInt(response.toString().replace(/[^\d]/g, ""), 10);
    if (isNaN(value)) throw new Error("Please enter a valid integer.");

    // Fetch from arXiv to validate
    if (expectedAnswer === null) {
      try {
        const searchQuery = encodeURIComponent(`cat:${category.code}`);
        const url = `/proxy/https://export.arxiv.org/api/query?search_query=${searchQuery}&start=0&max_results=${maxResults}&sortBy=submittedDate&sortOrder=descending`;

        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`arXiv API returned ${resp.status}`);
        const text = await resp.text();

        // Parse XML
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/xml");

        // Find all entries and count those with search term in abstract
        const entries = doc.getElementsByTagName("entry");
        let count = 0;

        for (const entry of entries) {
          const summary = entry.getElementsByTagName("summary")[0]?.textContent || "";
          if (summary.toLowerCase().includes(searchTerm.toLowerCase())) {
            count++;
          }
        }

        expectedAnswer = count;
      } catch (e) {
        throw new Error(`Could not verify answer: ${e.message}`);
      }
    }

    if (value !== expectedAnswer) {
      throw new Error(
        `Incorrect count. Make sure you're searching for "${searchTerm}" (case-insensitive) in the abstract/summary field.`
      );
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>ResearchRadar: Academic Trend Monitoring</h2>
      <p>
        <strong>ResearchRadar</strong> is an academic intelligence platform that helps R&D teams stay ahead of
        cutting-edge research. They monitor <a href="https://arxiv.org/" target="_blank">arXiv</a>, the world's
        largest open-access repository of scientific papers, to identify emerging trends and key research directions.
      </p>

      <p>
        A tech company wants to understand how prevalent a specific concept is in recent research papers within a
        particular field. This helps them prioritize their R&D investments and identify collaboration opportunities.
      </p>

      <h3>Your Task</h3>
      <p>
        Use the <a href="https://info.arxiv.org/help/api/basics.html" target="_blank">arXiv API</a> to fetch the
        <strong>${maxResults} most recent papers</strong> in the category <code>${category.code}</code>
        (${category.name}), then count how many have the term "<strong>${searchTerm}</strong>" in their abstract.
      </p>

      <h3>API Details</h3>
      <ul>
        <li>
          <strong>Base URL:</strong>
          <code>https://export.arxiv.org/api/query</code>
        </li>
        <li><strong>Category filter:</strong> <code>search_query=cat:${category.code}</code></li>
        <li><strong>Results limit:</strong> <code>max_results=${maxResults}</code></li>
        <li><strong>Sort by:</strong> <code>sortBy=submittedDate&sortOrder=descending</code></li>
      </ul>

      <h3>Steps</h3>
      <ol>
        <li>
          Construct the API URL:
          <code class="d-block my-2" style="word-break: break-all">
            https://export.arxiv.org/api/query?search_query=cat:${category.code}&start=0&max_results=${maxResults}&sortBy=submittedDate&sortOrder=descending
          </code>
        </li>
        <li>Fetch the response (it's XML/Atom format, not JSON!)</li>
        <li>Parse the XML and find all <code>&lt;entry&gt;</code> elements</li>
        <li>For each entry, check if the <code>&lt;summary&gt;</code> (abstract) contains "${searchTerm}" (case-insensitive)</li>
        <li>Count matching papers</li>
      </ol>

      <p class="text-warning">
        <em>⚠️ Important: The arXiv API returns <strong>XML (Atom feed)</strong>, not JSON! You'll need to parse XML.</em>
      </p>

      <label for="${id}" class="form-label">
        How many of the ${maxResults} most recent ${category.name} papers mention "${searchTerm}" in their abstract?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" min="0" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}

/*
SOLUTION - Python:

# /// script
# requires-python = ">=3.12"
# dependencies = ["httpx"]
# ///

import httpx
import xml.etree.ElementTree as ET

category = "cs.AI"  # Replace with your category
max_results = 40  # Replace with your max_results
search_term = "neural network"  # Replace with your search term

url = f"https://export.arxiv.org/api/query?search_query=cat:{category}&start=0&max_results={max_results}&sortBy=submittedDate&sortOrder=descending"

response = httpx.get(url)
root = ET.fromstring(response.text)

# arXiv uses Atom namespace
ns = {"atom": "http://www.w3.org/2005/Atom"}

count = 0
for entry in root.findall("atom:entry", ns):
    summary = entry.find("atom:summary", ns)
    if summary is not None and search_term.lower() in summary.text.lower():
        count += 1

print(f"Papers mentioning '{search_term}': {count}")


SOLUTION - JavaScript (Node.js):

// Using built-in fetch and DOMParser (or xmldom for Node)
const category = "cs.AI";
const maxResults = 40;
const searchTerm = "neural network";

const url = `https://export.arxiv.org/api/query?search_query=cat:${category}&start=0&max_results=${maxResults}&sortBy=submittedDate&sortOrder=descending`;

const response = await fetch(url);
const text = await response.text();

// In browser:
const parser = new DOMParser();
const doc = parser.parseFromString(text, "text/xml");
const entries = doc.getElementsByTagName("entry");

let count = 0;
for (const entry of entries) {
  const summary = entry.getElementsByTagName("summary")[0]?.textContent || "";
  if (summary.toLowerCase().includes(searchTerm.toLowerCase())) {
    count++;
  }
}

console.log(`Papers mentioning '${searchTerm}': ${count}`);
*/

