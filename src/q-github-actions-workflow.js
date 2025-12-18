import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-github-pages-deploy";
  const title = "GitHub Pages Deployment";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  // Generate a unique requirement for the page
  const secretWords = ["quantum", "phoenix", "nebula", "cascade", "stellar", "aurora", "cosmic", "zenith"];
  const secretWord = pick(secretWords);
  const secretNumber = randInt(1000, 9999);
  const requiredContent = `${secretWord}-${secretNumber}`;

  // Email hash for personalization
  const emailHash = user.email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");
    
    const trimmedUrl = url.trim();
    
    // Validate URL format
    if (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://")) {
      throw new Error("URL must start with http:// or https://");
    }

    // Check if it's a GitHub Pages URL
    if (!trimmedUrl.includes("github.io") && !trimmedUrl.includes("github.com")) {
      throw new Error("Please provide a GitHub Pages URL (*.github.io)");
    }

    try {
      const response = await fetch(`/proxy/${trimmedUrl}`);
      if (!response.ok) {
        throw new Error(`Could not fetch page: ${response.status} ${response.statusText}`);
      }
      
      const text = await response.text();
      
      // Check for required content
      if (!text.includes(requiredContent)) {
        throw new Error(`Page must contain the text: ${requiredContent}`);
      }

      // Check for user's email somewhere on page
      if (!text.includes(user.email)) {
        throw new Error(`Page must contain your email: ${user.email}`);
      }

      return true;
    } catch (e) {
      if (e.message.includes("Page must")) throw e;
      throw new Error(`Could not verify page: ${e.message}`);
    }
  };

  const question = html`
    <div class="mb-3">
      <h2>Deploy to GitHub Pages</h2>
      <p>
        <strong>Scenario:</strong> You need to create a simple static website and 
        deploy it using GitHub Pages with GitHub Actions for CI/CD.
      </p>
      
      <h3>Requirements</h3>
      <ol>
        <li>
          Create a new GitHub repository (or use an existing one)
        </li>
        <li>
          Create an <code>index.html</code> file that contains:
          <ul>
            <li>Your email: <code>${user.email}</code></li>
            <li>This unique code: <code>${requiredContent}</code></li>
          </ul>
        </li>
        <li>
          Set up GitHub Pages to deploy your site:
          <ul>
            <li>Go to repository Settings → Pages</li>
            <li>Under "Source", select "GitHub Actions" or "Deploy from a branch"</li>
            <li>If using Actions, create a workflow file in <code>.github/workflows/</code></li>
          </ul>
        </li>
        <li>
          Wait for deployment to complete and submit your GitHub Pages URL
        </li>
      </ol>

      <h3>Example Workflow File</h3>
      <pre style="background: #1e1e1e; color: #d4d4d4; padding: 10px; border-radius: 5px; font-size: 11px;"><code># .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - uses: actions/deploy-pages@v4</code></pre>
      
      <p class="text-muted">
        <strong>Expected URL format:</strong> <code>https://yourusername.github.io/reponame/</code>
      </p>

      <label for="${id}" class="form-label">
        Enter your GitHub Pages URL:
      </label>
      <input class="form-control" id="${id}" name="${id}" type="url" placeholder="https://username.github.io/repo/" required />
      
      <p class="text-muted mt-2">
        We'll verify that your page contains: <code>${requiredContent}</code> and <code>${user.email}</code>
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
