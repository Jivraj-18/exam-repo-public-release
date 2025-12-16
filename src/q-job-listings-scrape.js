import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { compareJSON } from "./utils/compare.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-job-listings-scrape";
  const title = "Scrape job listings from HTML";

  const random = seedrandom(`${user.email}#${id}`);

  const companies = ["Acme Corp", "Beacon Labs", "Delta Systems", "Nova Solutions"];
  const titles = ["Data Engineer", "Frontend Engineer", "Product Analyst", "Site Reliability Engineer"];
  const locations = ["London", "New York", "Berlin", "Remote"];

  const items = [];
  for (let i = 0; i < 6; i++) {
    const job = {
      title: titles[Math.floor(random() * titles.length)],
      company: companies[Math.floor(random() * companies.length)],
      location: locations[Math.floor(random() * locations.length)],
      id: `job-${Math.floor(random() * 9000 + 1000)}`,
    };
    items.push(job);
  }

  // Build a simple HTML block for students to scrape
  const htmlBlock = `
  <div class="jobs">
    ${items
      .map(
        (it) => `
    <article class="job-card" data-id="${it.id}">
      <h3 class="job-title">${it.title}</h3>
      <p class="job-company">${it.company}</p>
      <p class="job-location">${it.location}</p>
    </article>`,
      )
      .join("")}
  </div>`;

  const question = html`
    <div class="mb-3">
      <p><strong>Case Study: Job listing aggregator</strong></p>
      <p>
        Build a scraper that extracts job details from HTML and returns a JSON array of objects with keys
        <code>id</code>, <code>title</code>, <code>company</code>, and <code>location</code>. Use the HTML snippet below as
        the source and return the JSON in the text box.
      </p>
      <pre class="p-3 bg-light"><code>${htmlBlock}</code></pre>
      <label for="${id}" class="form-label">Paste JSON array of job objects</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="6" required></textarea>
    </div>
  `;

  const answer = async (jsonText) => {
    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch (e) {
      throw new Error(`Invalid JSON: ${e.message}`);
    }

    const expected = items.map(({ id, title, company, location }) => ({ id, title, company, location }));
    compareJSON(expected, parsed, { verbose: true });
    return true;
  };

  return { id, title, weight, question, answer };
}
