import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-openlibrary-book-search";
  const title = "OpenLibrary API: Book Data Aggregation";

  const random = seedrandom(`${user.email}#${id}`);

  // Subjects that have good data on OpenLibrary
  const subjects = [
    "artificial_intelligence",
    "machine_learning",
    "data_science",
    "python_programming",
    "javascript",
    "web_development",
    "database_design",
    "computer_networks",
    "operating_systems",
    "software_engineering",
    "algorithms",
    "cryptography",
    "cybersecurity",
    "cloud_computing",
    "distributed_systems",
  ];

  const subject = pick(subjects, random);
  const limit = 10 + Math.floor(random() * 11); // 10-20
  const minYear = 2000 + Math.floor(random() * 15); // 2000-2014
  const maxYear = minYear + 5 + Math.floor(random() * 6); // +5 to +10 years

  // We'll validate by making the same API call
  let expectedAnswer = null;

  const answer = async (response) => {
    if (!response) throw new Error("Please enter the count of matching books.");

    const value = parseInt(response.toString().replace(/[^\d]/g, ""), 10);
    if (isNaN(value)) throw new Error("Please enter a valid integer.");

    // Fetch from OpenLibrary to validate
    if (expectedAnswer === null) {
      try {
        const url = `/proxy/https://openlibrary.org/subjects/${subject}.json?limit=${limit}`;
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`API returned ${resp.status}`);
        const data = await resp.json();

        // Count books published in the year range
        expectedAnswer = data.works.filter((work) => {
          const year = work.first_publish_year;
          return year && year >= minYear && year <= maxYear;
        }).length;
      } catch (e) {
        throw new Error(`Could not verify answer: ${e.message}`);
      }
    }

    if (value !== expectedAnswer) {
      throw new Error(
        `Incorrect count. Make sure you're filtering for books published between ${minYear} and ${maxYear} (inclusive).`
      );
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>BookWorm Analytics: Subject Trend Analysis</h2>
      <p>
        <strong>BookWorm Analytics</strong> is a market research firm that helps publishers identify trending topics
        and predict book sales. They use the <a href="https://openlibrary.org/developers/api" target="_blank">OpenLibrary API</a>
        to analyze publication patterns across different subjects.
      </p>

      <p>
        A publishing client wants to understand how many books were published on a specific subject during a
        particular time period. This helps them decide whether a topic is saturated or has room for new titles.
      </p>

      <h3>Your Task</h3>
      <p>
        Use the OpenLibrary <strong>Subjects API</strong> to find books about <code>${subject.replace(/_/g, " ")}</code>
        and count how many were first published between <strong>${minYear}</strong> and <strong>${maxYear}</strong> (inclusive).
      </p>

      <h3>API Details</h3>
      <ul>
        <li><strong>Endpoint:</strong> <code>https://openlibrary.org/subjects/${subject}.json</code></li>
        <li><strong>Limit parameter:</strong> <code>?limit=${limit}</code> (fetch exactly ${limit} books)</li>
        <li><strong>Response field:</strong> Look at <code>works</code> array</li>
        <li><strong>Year field:</strong> Each work has <code>first_publish_year</code></li>
      </ul>

      <h3>Steps</h3>
      <ol>
        <li>Fetch data from the subjects API with limit=${limit}</li>
        <li>Parse the JSON response and extract the <code>works</code> array</li>
        <li>Filter books where <code>first_publish_year</code> is between ${minYear} and ${maxYear} (inclusive)</li>
        <li>Count the matching books</li>
      </ol>

      <p class="text-info">
        <em>Note: Some books may not have a <code>first_publish_year</code> field - exclude these from your count.</em>
      </p>

      <label for="${id}" class="form-label">
        How many books about "${subject.replace(/_/g, " ")}" (out of ${limit} fetched) were first published between ${minYear} and ${maxYear}?
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

subject = "artificial_intelligence"  # Replace with your subject
limit = 15  # Replace with your limit
min_year = 2005  # Replace with your min year
max_year = 2012  # Replace with your max year

url = f"https://openlibrary.org/subjects/{subject}.json?limit={limit}"
response = httpx.get(url)
data = response.json()

count = 0
for work in data["works"]:
    year = work.get("first_publish_year")
    if year and min_year <= year <= max_year:
        count += 1

print(f"Books published between {min_year}-{max_year}: {count}")


SOLUTION - JavaScript:

const subject = "artificial_intelligence";
const limit = 15;
const minYear = 2005;
const maxYear = 2012;

const response = await fetch(`https://openlibrary.org/subjects/${subject}.json?limit=${limit}`);
const data = await response.json();

const count = data.works.filter(work => {
  const year = work.first_publish_year;
  return year && year >= minYear && year <= maxYear;
}).length;

console.log(`Books published between ${minYear}-${maxYear}: ${count}`);
*/

