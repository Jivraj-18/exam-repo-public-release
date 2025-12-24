/**
 * Deploy a Static HTML Dashboard with Netlify
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
      // Validate that the submitted URL is a proper Netlify deployment URL
      let parsedUrl;
      try {
        parsedUrl = new URL(submittedUrl);
      } catch (e) {
        throw new Error("Invalid URL format. Please provide a valid Netlify deployment URL.");
      }

      const protocol = parsedUrl.protocol.toLowerCase();
      if (protocol !== "https:" && protocol !== "http:") {
        throw new Error("URL must use http or https.");
      }

      const hostname = parsedUrl.hostname.toLowerCase();
      if (hostname !== "netlify.app" && !hostname.endsWith(".netlify.app")) {
        throw new Error("URL must point to a Netlify deployment ending with '.netlify.app'.");
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      try {
        const response = await fetch(parsedUrl.toString(), { signal: controller.signal });
        if (!response.ok) {
          throw new Error("Unable to fetch the deployment URL");
        }
        const html = await response.text();
        if (html.includes(email)) {
          return true;
        }
        throw new Error(`Deployment found but does not contain required email: ${email}`);
      } finally {
        clearTimeout(timeoutId);
      }
    } catch (error) {
      // Preserve specific validation errors and only wrap unexpected/network errors
      if (error instanceof Error) {
        const knownPrefixes = [
          "Invalid URL format.",
          "URL must use http or https.",
          "URL must point to a Netlify deployment ending with '.netlify.app'.",
          "Unable to fetch the deployment URL",
          "Deployment found but does not contain required email:"
        ];

        if (knownPrefixes.some((prefix) => error.message.startsWith(prefix))) {
          throw error;
        }
      }
      throw new Error("Failed to fetch deployment URL. Please check the URL and try again.");
    }
  };

  return { id, title, weight, question, answer: validate };
}
