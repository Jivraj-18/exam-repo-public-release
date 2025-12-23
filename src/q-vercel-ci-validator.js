import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1.0 }) {
  const id = "q-vercel-ci-validator";
  const title = "CI/CD & Serverless: Automated Deployment Validation";

  const random = seedrandom(`${user.email}#${id}`);
  
  // Generate a unique token that the user must use in their CI/CD headers
  const deploymentToken = Math.random().toString(36).substring(2, 15);
  const requiredPath = `/api/validate-${Math.floor(random() * 1000)}`;

  const question = html`
    <div class="mb-3">
      <h2>Scenario: The Bulletproof Pipeline</h2>
      <p>
        Your organization is moving to a "Full Automation" model. You must demonstrate a complete 
        <strong>CI/CD pipeline</strong> using <strong>GitHub Actions</strong> that deploys a 
        <strong>Serverless Function</strong> to <strong>Vercel</strong>.
      </p>

      <h3>Phase 1: The Serverless API</h3>
      <p>
        Create a Vercel-compatible API (Python or Node.js) that listens at <code>${requiredPath}</code>. 
        The endpoint must:
      </p>
      <ul>
        <li>Handle <strong>CORS</strong> correctly (allow GET from all origins).</li>
        <li>Check for a custom HTTP header <code>X-Deployment-Token</code>.</li>
        <li>If the token matches <code>${deploymentToken}</code>, return: 
            <code>{"status": "verified", "email": "${user.email}"}</code>.</li>
      </ul>

      <h3>Phase 2: The CI/CD Pipeline</h3>
      <p>
        Configure a <strong>GitHub Action</strong> that triggers on every push to your <code>main</code> branch. 
        The action must automatically deploy the code to Vercel. 
        <strong>Crucial:</strong> The deployment must be "production" ready (not a preview URL).
      </p>

      <h3>Phase 3: Verification</h3>
      <ol>
        <li>Ensure your repository is public.</li>
        <li>Deploy your changes via your GitHub Action.</li>
        <li>Paste the <strong>Production URL</strong> of your Vercel deployment below.</li>
      </ol>

      <label for="${id}" class="form-label">Vercel Production URL (e.g., https://my-app.vercel.app)</label>
      <input class="form-control" id="${id}" name="${id}" type="url" placeholder="https://..." required />
      
      <div class="mt-3 alert alert-info">
        <strong>Validation Check:</strong> We will send a GET request to <code>YOUR_URL${requiredPath}</code> 
        with the <code>X-Deployment-Token</code>. If it returns your email and the verified status, the task is complete.
      </div>
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");
    
    // Clean trailing slash
    const baseUrl = url.replace(/\/$/, "");
    const target = `${baseUrl}${requiredPath}`;

    try {
      const resp = await fetch(target, {
        method: 'GET',
        headers: {
          'X-Deployment-Token': deploymentToken
        }
      });

      if (resp.status === 405) throw new Error("Method not allowed. Ensure your endpoint supports GET.");
      if (!resp.ok) throw new Error(`Endpoint returned status ${resp.status}`);

      const data = await resp.json();
      
      if (data.status !== "verified") {
        throw new Error("Invalid response status. Expected 'verified'.");
      }
      if (data.email !== user.email) {
        throw new Error("Email mismatch. The API must return the email associated with this account.");
      }

      return true;
    } catch (e) {
      throw new Error(`Connection failed: ${e.message}. Ensure CORS is enabled and the URL is public.`);
    }
  };

  return { id, title, weight, question, answer };
}