import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 2.0 }) {
  const id = "q-docker-compose-app";
  const title = "Docker: Microservices with Reverse Proxy & Healthchecks";

  const random = seedrandom(`${user.email}#${id}`);
  
  const answer = (input) => {
    const yaml = input.toLowerCase().trim();
    
    const required = [
      { term: "nginx", error: "Must include an Nginx reverse proxy service" },
      { term: "healthcheck:", error: "Must define 'healthcheck:' for services" },
      { term: "interval:", error: "Healthcheck must specify interval" },
      { term: "retries:", error: "Healthcheck must specify retries" },
      { term: "condition: service_healthy", error: "Depends_on must wait for 'service_healthy'" },
      { term: "networks:", error: "Must define custom networks (e.g., frontend, backend)" },
    ];
    
    for (const { term, error } of required) {
      if (!yaml.includes(term)) {
        throw new Error(error);
      }
    }
    
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Case Study: Production-Ready Microservices Stack</h2>
      <p>
        You are architecting a production deployment for a microservices application. 
        A simple <code>docker-compose</code> file is no longer sufficient. You need to ensure 
        reliability, security, and proper startup order.
      </p>
      
      <h3>Architecture</h3>
      <ul>
        <li><strong>Frontend:</strong> React App (Nginx serving static files)</li>
        <li><strong>Backend:</strong> Python FastAPI API</li>
        <li><strong>Database:</strong> PostgreSQL</li>
        <li><strong>Reverse Proxy:</strong> Nginx (Entry point, handles SSL termination and routing)</li>
      </ul>
      
      <h3>Requirements</h3>
      <ol>
        <li><strong>Network Segmentation:</strong> The Database should NOT be accessible from the Reverse Proxy directly. 
            Create separate networks (e.g., <code>public</code>, <code>app-tier</code>, <code>db-tier</code>).</li>
        <li><strong>Healthchecks:</strong> Define <code>healthcheck</code> blocks for the Database and Backend. 
            The Database check should verify it's ready to accept connections.</li>
        <li><strong>Startup Order:</strong> The Backend must wait until the Database is <strong>healthy</strong> (not just started). 
            The Reverse Proxy must wait until the Backend is healthy.</li>
        <li><strong>Reverse Proxy Config:</strong> The Nginx proxy service should map port 80/443 to the host.</li>
      </ol>
      
      <h3>Task</h3>
      <p>
        Write the <code>docker-compose.yml</code> file implementing these advanced patterns.
      </p>
      
      <label for="${id}" class="form-label">
        Enter your advanced docker-compose.yml:
      </label>
      <textarea 
        class="form-control font-monospace" 
        id="${id}" 
        name="${id}" 
        rows="20"
        placeholder="version: '3.8'&#x0a;services:&#x0a;  proxy:&#x0a;    ..."
        required
        style="font-size: 0.9em;"
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
