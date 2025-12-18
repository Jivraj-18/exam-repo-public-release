/**
 * Question 5: Implement llms.txt for a Student Portfolio API
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
        placeholder=${`# Student Portfolio API - ${studentId} (start your llms.txt here)`}
        required
      ></textarea>
    </div>
  `;

  // Validation function to check if the llms.txt content has all required sections
  const validate = async (submittedText) => {
    const required = {
      title: `# Student Portfolio API - ${studentId}`,
      overview: ['## Overview', 'overview'],
      endpoints: ['## Endpoints', '/api/profile', '/api/projects', '/api/contact'],
      authentication: ['## Authentication', 'authentication'],
      responseFormats: ['## Response', 'response format', 'response formats', email, studentId],
      rateLimits: ['## Rate', 'limit', 'usage', 'policy', 'policies'],
      contact: ['## Contact', email],
      lastUpdated: ['last updated', 'date', '202']
    };

    const errors = [];

    // Check title
    if (!submittedText.includes(required.title)) {
      errors.push(`Missing or incorrect title. Expected: "${required.title}"`);
    }

    // Check overview section
    if (!required.overview.some(keyword => submittedText.toLowerCase().includes(keyword.toLowerCase()))) {
      errors.push('Missing Overview section');
    }

    // Check endpoints section
    const endpointsHeader = required.endpoints[0];
    const endpointPaths = required.endpoints.slice(1);

    const missingEndpoints = [];

    // Header check: case-insensitive
    if (!submittedText.toLowerCase().includes(endpointsHeader.toLowerCase())) {
      missingEndpoints.push(endpointsHeader);
    }

    // Endpoint path checks: case-sensitive
    const missingPaths = endpointPaths.filter(ep => !submittedText.includes(ep));
    missingEndpoints.push(...missingPaths);
    if (missingEndpoints.length > 0) {
      errors.push(`Missing endpoints documentation: ${missingEndpoints.join(', ')}`);
    }

    // Check authentication section
    if (!required.authentication.some(keyword => submittedText.toLowerCase().includes(keyword.toLowerCase()))) {
      errors.push('Missing Authentication section');
    }

    // Check response formats
    const lines = submittedText.split('\n');
    const codeBlocks = [];
    let inCodeBlock = false;
    let currentBlock = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('```')) {
        if (!inCodeBlock) {
          // Start of a new code block
          inCodeBlock = true;
          currentBlock = [];
        } else {
          // End of the current code block
          inCodeBlock = false;
          codeBlocks.push(currentBlock.join('\n'));
          currentBlock = [];
        }
        continue;
      }

      if (inCodeBlock) {
        currentBlock.push(line);
      }
    }

    let responseText = '';
    if (inCodeBlock) {
      // Malformed code block: missing closing fence
      errors.push('Malformed code block: missing closing ```');
    } else if (codeBlocks.length > 0) {
      responseText = codeBlocks.join('\n');
    } else {
      errors.push('Missing code block with example response format');
    }
    const missingResponseElements = required.responseFormats.filter(elem => !responseText.includes(elem));
    if (missingResponseElements.length > 0) {
      errors.push(`Missing response format elements: ${missingResponseElements.join(', ')}`);
    }

    // Check rate limits
    if (!required.rateLimits.some(keyword => submittedText.toLowerCase().includes(keyword.toLowerCase()))) {
      errors.push('Missing Rate Limits/Usage Policies section');
    }

    // Check contact information
    if (!required.contact.every(elem => submittedText.includes(elem))) {
      errors.push(`Missing Contact section with email: ${email}`);
    }

    // Check last updated date
    if (!required.lastUpdated.some(keyword => submittedText.toLowerCase().includes(keyword.toLowerCase()))) {
      errors.push('Missing Last Updated date');
    }

    if (errors.length > 0) {
      throw new Error(`Validation failed:\n${errors.join('\n')}`);
    }

    return true;
  };

  return { id, title, weight, question, answer: validate };
}
