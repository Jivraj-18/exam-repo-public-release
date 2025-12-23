import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-multimodal-scraping-audit";
  const title = "Advanced AI Scraping & Multimodal Analysis";
  const random = seedrandom(`${user.email}#${id}`);

  // Generate a randomized target for the scraping task
  const targetTopics = ["renewable energy trends", "global semiconductor supply", "urban architecture", "deep sea exploration"];
  const selectedTopic = targetTopics[Math.floor(random() * targetTopics.length)];
  const verificationKey = Math.random().toString(36).substring(7);

  const question = html`
    <div class="mb-3">
      <h2>Challenge: Multimodal Web Intelligence Pipeline</h2>
      <p>
        Your goal is to build a robust automated intelligence agent that scrapes web content, processes images using 
        <strong>Vision Models</strong>, and provides a structured <strong>REST API</strong> for downstream consumption.
      </p>

      <h3>Step 1: Automated AI Scraping</h3>
      <p>
        Use <strong>Playwright</strong> or <strong>LLM Website Scraping</strong> techniques to extract the top 3 
        news entries related to <strong>"${selectedTopic}"</strong> from a public source.
      </p>
      <ul>
        <li>Extract the primary image URL for each entry.</li>
        <li>Convert the images to <strong>Base64 Encoding</strong> for processing.</li>
      </ul>

      <h3>Step 2: Multimodal Sentiment & Embedding</h3>
      <p>
        For each scraped entry:
      </p>
      <ul>
        <li>Use a <strong>Vision Model</strong> (via Ollama or an API) to describe visual content.</li>
        <li>Run <strong>LLM Sentiment Analysis</strong> on the combined text and vision description.</li>
        <li>Generate a <strong>Multimodal Embedding</strong> representing the semantic "vibe" of the entry.</li>
      </ul>

      <h3>Step 3: Deployment & FastAPI</h3>
      <p>
        Expose this pipeline as a <strong>FastAPI</strong> application deployed on <strong>Vercel</strong>. 
        Your endpoint <code>GET /audit</code> must:
      </p>
      <ul>
        <li>Accept a query parameter <code>key</code> which must match <code>${verificationKey}</code>.</li>
        <li>Properly handle <strong>CORS</strong> to allow requests from any dashboard origin.</li>
        <li>Return a JSON array containing the titles, sentiment scores, and vision descriptions.</li>
      </ul>

      <div class="alert alert-info">
        <strong>Verification Target:</strong> We will query your API to ensure the <strong>Vision Model</strong> correctly 
        identified elements related to <code>${selectedTopic}</code>.
      </div>

      <label for="${id}" class="form-label">Enter your live Vercel API URL (e.g., https://my-agent.vercel.app/audit)</label>
      <input class="form-control" id="${id}" name="${id}" type="url" placeholder="https://..." required />
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("API URL is required");
    
    const joiner = url.includes("?") ? "&" : "?";
    const target = `${url}${joiner}key=${verificationKey}`;

    try {
      const resp = await fetch(target);
      if (resp.status === 403) throw new Error("Access denied. Ensure your API checks the 'key' parameter.");
      if (!resp.ok) throw new Error(`Endpoint returned status ${resp.status}`);

      const data = await resp.json();
      
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Response must be a non-empty JSON array of audit results.");
      }

      const sample = data[0];
      if (!sample.sentiment_score || !sample.vision_description) {
        throw new Error("Missing multimodal fields: 'sentiment_score' and 'vision_description' are required.");
      }

      if (!resp.headers.get("access-control-allow-origin")) {
        throw new Error("CORS is not configured. The API must be accessible from web dashboards.");
      }

      return true;
    } catch (e) {
      throw new Error(`Pipeline Validation Failed: ${e.message}`);
    }
  };

  return { id, title, weight, question, answer };
}