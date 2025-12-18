/**
 * Question 4: Deploy a Static HTML Dashboard with Netlify
 * Topic: Static Site Deployment
 * Marks: 0.8
 * GA: GA2 (Deployment Tools)
 */

import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 0.8 }) {
  const id = "q-deploy-static-html-netlify";
  const title = "Deploy a Static HTML Dashboard with Netlify";
  const email = `${user.studentId}@ds.study.iitm.ac.in`;

  const question = html`
    <div class="mb-3">
      <p>
        <strong>Case Study:</strong> DataMetrics is a data analytics startup that generates daily performance reports 
        as static HTML dashboards. They need to deploy these dashboards to allow stakeholders access via a public URL.
      </p>
      <p>
        Create a simple HTML dashboard and deploy it to Netlify with the following requirements:
      </p>
      <ol>
        <li>Create an HTML file named <code>index.html</code> with:
          <ul>
            <li>A header containing your email: <code>${email}</code></li>
            <li>A table with at least 3 columns showing sample data</li>
            <li>Basic CSS styling (inline or in a <code>&lt;style&gt;</code> tag)</li>
          </ul>
        </li>
        <li>Create a <code>netlify.toml</code> configuration file with build command and publish directory</li>
        <li>Deploy the site to Netlify (via Git integration or drag-and-drop)</li>
      </ol>
      <p>
        <strong>Example structure:</strong>
      </p>
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;DataMetrics Dashboard&lt;/title&gt;
    &lt;style&gt;
        table { border-collapse: collapse; }
        th, td { border: 1px solid black; padding: 8px; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Dashboard by ${email}&lt;/h1&gt;
    &lt;table&gt;
        &lt;!-- Your data here --&gt;
    &lt;/table&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
      <label for="${id}" class="form-label">Your Netlify Deployment URL:</label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        type="url"
        placeholder="https://your-site-name.netlify.app/"
        required
      />
    </div>
  `;

  // Validation function to check if the deployment URL contains the student's email
  const validate = async (submittedUrl) => {
    try {
      const response = await fetch(submittedUrl);
      if (!response.ok) {
        return { valid: false, message: "Unable to fetch the deployment URL" };
      }
      const html = await response.text();
      if (html.includes(email)) {
        return { valid: true, message: "Deployment verified successfully" };
      }
      return { valid: false, message: `Deployment found but does not contain required email: ${email}` };
    } catch (error) {
      return { valid: false, message: "Failed to fetch deployment URL. Please check the URL and try again." };
    }
  };

  const answer = email;

  return { id, title, weight, question, answer, validate };
}
