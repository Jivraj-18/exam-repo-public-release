import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-fastapi-github-endpoint";
  const title = "FASTAPI: GitHub Repo Info Endpoint";

  const random = seedrandom(`${user.email}#${id}`);
  const repoNames = ["demo-api", "analytics", "data-pipeline"];
  const repo = repoNames[Math.floor(random() * repoNames.length)];
  const stars = Math.floor(random() * 500);
  const forks = Math.floor(random() * 100);

  const expectedResponse = { repo, stars, forks };

  const answer = async (endpointUrl) => {
    try {
      const res = await fetch(`${endpointUrl}?repo=${encodeURIComponent(repo)}`);
      const data = await res.json();
      return data.repo === repo && data.stars === stars && data.forks === forks;
    } catch {
      return false;
    }
  };

  const question = html`
    <div class="mb-3">
      <p>Create a FastAPI endpoint <code>/repo-info</code> that:</p>
      <ol>
        <li>Accepts a query parameter <code>repo</code>.</li>
        <li>Returns JSON with <code>repo</code>, <code>stars</code>, and <code>forks</code> of the repository.</li>
        <li>Your assigned repo is: <strong>${repo}</strong></li>
      </ol>
      <pre><code>${JSON.stringify(expectedResponse, null, 2)}</code></pre>
      <p>Provide the URL to your endpoint for validation.</p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
};
