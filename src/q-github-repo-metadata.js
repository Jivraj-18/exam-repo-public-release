import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-repo-metadata";
  const title = "GitHub Repository Metadata";

  const random = seedrandom(`${user.email}#${id}`);
  const orgs = ["pallets", "numpy", "pandas-dev", "tiangolo", "psf"];
  const org = pick(orgs, random);

  let expected;

  const answer = async (repo) => {
    repo = repo.trim();
    if (!expected) {
      const r = await fetch(`/proxy/https://api.github.com/orgs/${org}/repos?per_page=1`);
      if (!r.ok) throw new Error("GitHub API failed");
      const data = await r.json();
      expected = data[0].name;
    }
    if (repo !== expected) throw new Error("Incorrect repository name");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Open Source Intelligence for DevOps Analytics</h2>
      <p>
        Your team is analyzing open-source activity to understand how active different organizations are.
        Using the GitHub REST API, fetch the most recently created public repository under the
        <code>${org}</code> organization.
      </p>

      <p>
        Use the GitHub API endpoint:
        <code>https://api.github.com/orgs/${org}/repos</code>
      </p>

      <p>
        Sort is already applied by creation time. Identify the <strong>first repository</strong> returned.
      </p>

      <label for="${id}" class="form-label">
        Enter the repository name:
      </label>
      <input class="form-control" id="${id}" type="text" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}
