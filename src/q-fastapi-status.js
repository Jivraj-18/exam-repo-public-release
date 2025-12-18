import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-fastapi-secure-logic";
  const title = "API Engineering: Non-Standard Status Negotiator";
  const random = seedrandom(`${user.email}#${id}`);
  const secretKey = Math.floor(10000 + random() * 89999);

  const question = html`
    <div class="mb-3">
      <h4>Secure Handshake Protocol</h4>
      <p>
        <strong>CipherStream Analytics</strong> uses custom HTTP status codes as a "security through obscurity" layer for their internal microservices. They require a FastAPI-based "Gatekeeper" service that validates an ephemeral token before allowing data flow.
      </p>
      <h5>Technical Requirements</h5>
      <ol>
        <li><strong>Endpoint:</strong> Implement <code>POST /negotiate</code>.</li>
        <li><strong>Schema:</strong> Expects <code>{"token": ${secretKey}}</code>.</li>
        <li><strong>Status Logic:</strong> 
          <ul>
            <li>If token matches: Return <b>202 (Accepted)</b>.</li>
            <li>If token is missing/wrong: Return <b>418 (I'm a Teapot)</b>.</li>
          </ul>
        </li>
        <li><strong>CORS:</strong> Must allow all origins for the grading agent.</li>
      </ol>
      <label for="${id}" class="form-label">Enter the <b>Live Tunnel URL</b> of your FastAPI server</label>
      <input class="form-control" id="${id}" name="${id}" type="url" placeholder="https://..." />
    </div>
  `;

  const answer = async (url) => {
    const target = url.replace(/\/$/, "") + "/negotiate";
    const r1 = await fetch(target, { 
      method: "POST", headers: {"Content-Type": "application/json"}, 
      body: JSON.stringify({token: secretKey}) 
    });
    if (r1.status !== 202) throw new Error(`Incorrect status for valid token. Expected 202, got ${r1.status}`);
    
    const r2 = await fetch(target, { 
      method: "POST", headers: {"Content-Type": "application/json"}, 
      body: JSON.stringify({token: 0}) 
    });
    if (r2.status !== 418) throw new Error(`Incorrect status for invalid token. Expected 418, got ${r2.status}`);
    return true;
  };

  return { id, title, weight, question, answer };
}