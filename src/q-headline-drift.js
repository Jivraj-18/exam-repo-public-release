import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function({ user, weight = 1 }) {
  const id = "q-headline-drift";
  const title = "Web Scraping: Dynamic News Headline Drift Analysis";

  const question = html`
    <div class="mb-3">
      <h4>Web Scraping: Dynamic News Headline Drift Analysis (1 mark)</h4>
      
      <h5>Problem Statement</h5>
      <p>
        News websites frequently update headlines throughout the day. You are tasked with detecting semantic drift 
        in headlines published on a news homepage.
      </p>

      <h5>Input</h5>
      <p>URL of a news homepage that loads headlines dynamically using JavaScript</p>

      <h5>Constraints</h5>
      <ul>
        <li>You must use Playwright (not requests/BeautifulSoup).</li>
        <li>Scrape headlines at two different timestamps separated by at least 10 minutes.</li>
        <li>Do not store raw HTML.</li>
        <li>Use sentence embeddings for comparison.</li>
      </ul>

      <h5>Task</h5>
      <ol>
        <li>Extract the top 15 headlines at time T₁.</li>
        <li>Extract the top 15 headlines at time T₂.</li>
        <li>Generate embeddings for each headline.</li>
        <li>Compute cosine similarity between corresponding headlines.</li>
        <li>Calculate the mean semantic drift:
          <ul>
            <li><code>1 - mean(cosine similarity)</code></li>
          </ul>
        </li>
      </ol>

      <h5>Output</h5>
      <p>A CSV file <code>headline_drift.csv</code> with:</p>
      <ul>
        <li><code>headline_index</code></li>
        <li><code>cosine_similarity</code></li>
      </ul>
      <p>A single numeric value printed to stdout:</p>
      <pre>Mean Drift: &lt;value rounded to 3 decimals&gt;</pre>

      <label for="${id}" class="form-label">Upload your solution file</label>
      <input class="form-control" id="${id}" name="${id}" type="file" />
    </div>
  `;

  const answer = async (file) => {
    if (!file) throw new Error("Solution file is required");
    return true;
  };

  return { id, title, weight, question, answer };
}
