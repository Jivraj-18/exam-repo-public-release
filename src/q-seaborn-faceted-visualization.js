import { en, Faker } from "https://cdn.jsdelivr.net/npm/@faker-js/faker@9/+esm";
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-seaborn-faceted-visualization";
  const title = "Seaborn: Faceted statistical visualization";

  const random = seedrandom(`${user.email}#${id}`);
  const faker = new Faker({ locale: [en], seed: Math.round(random() * 1000000) });
  const companyName = faker.company.name().replace(/[^a-zA-Z\s]/g, "").trim();

  const answer = async (response) => {
    try {
      const url = new URL(response);
      if (!url.hostname.includes("raw.githubusercontent.com")) {
        throw new Error("URL should be from raw.githubusercontent.com");
      }

      const readmeRes = await fetch(response);
      if (!readmeRes.ok) throw new Error("Could not fetch README.md from the provided URL");
      const readmeText = await readmeRes.text();
      if (!readmeText.includes(user.email)) throw new Error("README.md does not contain your email address");

      const parts = response.split("/");
      const baseUrl = `https://raw.githubusercontent.com/${parts[3]}/${parts[4]}/${parts[5]}/${parts.slice(6, -1).join("/")}`;

      // Fetch chart.py
      const pyRes = await fetch(`${baseUrl}/chart.py`);
      if (!pyRes.ok) throw new Error("Could not fetch chart.py file");
      const pyText = await pyRes.text();
      const lower = pyText.toLowerCase();
      const usesSeaborn = lower.includes("seaborn") || lower.includes("import sns");
      const usesFacet = lower.includes("facetgrid") || lower.includes("relplot(") || lower.includes("col=");
      if (!usesSeaborn) throw new Error("Python script must use seaborn");
      if (!usesFacet) throw new Error("Script must create a faceted visualization (FacetGrid/relplot with col=")
;

      // Validate image
      const imgRes = await fetch(`${baseUrl}/chart.png`);
      if (!imgRes.ok) throw new Error("Could not fetch chart.png file");
      const blob = await imgRes.blob();
      if (blob.size === 0) throw new Error("Chart image file is empty");

      // Check dimensions
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          if (img.width !== 512 || img.height !== 512) reject(new Error("Chart image must be 512x512 pixels"));
          else resolve(true);
        };
        img.onerror = () => reject(new Error("Invalid image file"));
        img.src = URL.createObjectURL(blob);
      });

      return true;
    } catch (error) {
      throw new Error(`Repository validation failed: ${error.message}`);
    }
  };

  const question = html`
    <div class="mb-3">
      <h2>Faceted Seaborn visualization for category trends</h2>
      <p>
        Create a professional, publication-ready <strong>faceted</strong> visualization using Seaborn to compare
        trends across categories. Use either <code>FacetGrid</code> or <code>sns.relplot(..., col=...)</code>.
      </p>
      <h3>What to submit</h3>
      <p>GitHub folder with <code>README.md</code> (contains your email), <code>chart.py</code>, and <code>chart.png</code> (512x512). Paste the raw <code>README.md</code> URL.</p>

      <h3>Steps to solve</h3>
      <ol>
        <li>Synthesize a DataFrame with columns like <code>category</code>, <code>x</code> (time/metric), <code>y</code>, optionally <code>hue</code>.</li>
        <li>Use Seaborn <code>FacetGrid</code> or <code>sns.relplot(..., col='category')</code> to create facets.</li>
        <li>Add statistical layer: regression or CI (e.g., <code>sns.lmplot</code> or <code>ci="sd"</code> on relplot).</li>
        <li>Style: <code>sns.set_style</code>, titles, axis labels, readable fonts.</li>
        <li>Export with exact size: <code>plt.savefig('chart.png', dpi=64, bbox_inches='tight')</code> → 512x512 px.</li>
      </ol>

      <h3>Repository Structure</h3>
      <ul>
        <li><code>README.md</code> - contains your email</li>
        <li><code>chart.py</code> - generates faceted Seaborn chart</li>
        <li><code>chart.png</code> - 512x512 output image</li>
      </ul>

      <label for="${id}" class="form-label"> Enter the raw GitHub URL of your README.md </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        required
        placeholder="https://raw.githubusercontent.com/[username]/[repo]/[branch]/[folder]/README.md"
      />
      <p class="text-muted">We will validate Seaborn usage, faceting, and image dimensions.</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
