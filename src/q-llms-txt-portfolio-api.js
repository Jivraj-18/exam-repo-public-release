/**
 * Question 9: Implement llms.txt for a Student Portfolio API
 * Topic: AI Coding Context Engineering - llms.txt
 * Marks: 1.0
 * GA: GA3 (AI Coding)
 */

import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.0 }) {
  const id = "q-llms-txt-portfolio-api";
  const title = "Implement llms.txt for a Student Portfolio API";
  const email = `${user.studentId}@ds.study.iitm.ac.in`;
  const studentId = user.studentId;

  const question = html`
    <div class="mb-3">
      <p>
        <strong>Case Study:</strong> StudentHub is building a platform where students can create portfolio APIs. 
        Each API needs an llms.txt file that helps AI assistants understand and use the API effectively.
      </p>
      <p>
        Create a complete llms.txt file for your student portfolio API with the following endpoints:
      </p>
      <ul>
        <li><code>GET /api/profile</code> - Returns student profile information</li>
        <li><code>GET /api/projects</code> - Returns list of projects</li>
        <li><code>POST /api/contact</code> - Submit contact form</li>
      </ul>
      <p>
        <strong>Sample response format:</strong>
      </p>
      <pre><code>{
  "name": "Student Name",
  "email": "${email}",
  "roll": "${studentId}",
  "bio": "Data Science student at IIT Madras"
}</code></pre>
      <p>
        Your llms.txt must include:
      </p>
      <ol>
        <li>Title: <code># Student Portfolio API - ${studentId}</code></li>
        <li>Overview section explaining the API purpose</li>
        <li>Endpoints section with all three endpoints documented</li>
        <li>Authentication section (if any)</li>
        <li>Response formats with examples</li>
        <li>Rate limits and usage policies</li>
        <li>Contact information with your email</li>
        <li>Last updated date</li>
      </ol>
      <label for="${id}" class="form-label">Paste your complete llms.txt content:</label>
      <textarea 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        rows="15"
        placeholder="# Student Portfolio API - ${studentId}&#10;&#10;## Overview&#10;..."
        required
      ></textarea>
    </div>
  `;

  const answer = `${studentId},${email}`;

  return { id, title, weight, question, answer };
}
