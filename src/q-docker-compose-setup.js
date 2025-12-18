import { en, Faker } from "https://cdn.jsdelivr.net/npm/@faker-js/faker@9/+esm";
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-docker-compose-setup";
  const title = "Docker Compose: Multi-Container Application Deployment";

  const random = seedrandom(`${user.email}#${id}`);
  const faker = new Faker({ locale: [en], seed: Math.round(random() * 1000000) });

  const companyName = faker.company
    .name()
    .replace(/[^a-zA-Z\s]/g, "")
    .trim();

  const appPort = 3000 + Math.floor(random() * 1000);
  const dbName = faker.word.noun().toLowerCase().replace(/[^a-z]/g, '');
  const dbUser = faker.internet.username().toLowerCase().replace(/[^a-z0-9]/g, '');
  const redisPort = 6379 + Math.floor(random() * 100);

  const answer = async (response) => {
    try {
      const url = new URL(response);
      if (!url.hostname.includes("raw.githubusercontent.com")) {
        throw new Error("URL should be from raw.githubusercontent.com");
      }

      // Fetch the docker-compose.yml file
      const composeResponse = await fetch(response);
      if (!composeResponse.ok) {
        throw new Error("Could not fetch docker-compose.yml from the provided URL");
      }

      const composeContent = await composeResponse.text();

      // Basic validation checks
      if (!composeContent.includes("version:") && !composeContent.includes("services:")) {
        throw new Error("Invalid docker-compose.yml format");
      }

      // Check for required services
      if (!composeContent.includes("web") && !composeContent.includes("app")) {
        throw new Error("Missing web/app service in docker-compose.yml");
      }

      if (!composeContent.includes("postgres") && !composeContent.includes("db")) {
        throw new Error("Missing PostgreSQL database service");
      }

      if (!composeContent.includes("redis")) {
        throw new Error("Missing Redis cache service");
      }

      // Check for port mappings
      const portRegex = new RegExp(`${appPort}:\\d+`);
      if (!portRegex.test(composeContent)) {
        throw new Error(`Missing port mapping for ${appPort} in web service`);
      }

      // Check for environment variables or database configuration
      if (!composeContent.includes("POSTGRES_DB") && !composeContent.includes("MYSQL_DATABASE")) {
        throw new Error("Missing database environment configuration");
      }

      // Check for volumes or data persistence
      if (!composeContent.includes("volumes")) {
        throw new Error(
          "Missing volumes configuration for data persistence (recommended for database)"
        );
      }

      // Extract repo info to check for README
      const urlParts = response.split("/");
      const username = urlParts[3];
      const repo = urlParts[4];
      const branch = urlParts[5];
      const folderPath = urlParts.slice(6, -1).join("/");

      const baseUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${
        folderPath ? folderPath + "/" : ""
      }`;

      // Check README.md for email and deployment evidence
      const readmeResponse = await fetch(`${baseUrl}README.md`);
      if (!readmeResponse.ok) {
        throw new Error("README.md not found in repository");
      }

      const readmeText = await readmeResponse.text();
      if (!readmeText.includes(user.email)) {
        throw new Error("README.md does not contain your email address");
      }

      // Check for evidence of running containers (screenshot or container IDs mentioned)
      const hasEvidence = readmeText.toLowerCase().includes("docker ps") ||
        readmeText.toLowerCase().includes("container") ||
        readmeText.toLowerCase().includes("running");

      if (!hasEvidence) {
        throw new Error(
          "README.md should include evidence of running containers (docker ps output or screenshot)"
        );
      }

      return true;
    } catch (e) {
      if (e.message.includes("Invalid URL")) {
        throw new Error("Please provide a valid GitHub raw URL to docker-compose.yml");
      }
      throw e;
    }
  };

  const question = html`
    <h2>${companyName} Application Deployment with Docker Compose</h2>

    <p>
      <strong>${companyName}</strong> needs to deploy a multi-container application stack. Your task is
      to create a <code>docker-compose.yml</code> file that orchestrates three services: a web
      application, a PostgreSQL database, and a Redis cache layer.
    </p>

    <ol>
      <li>
        Create a <code>docker-compose.yml</code> file with three services:
        <ul>
          <li>
            <strong>web/app</strong>: A simple web application (you can use nginx, node, python, or any
            web server)
          </li>
          <li><strong>db</strong>: PostgreSQL database service</li>
          <li><strong>redis</strong>: Redis cache service</li>
        </ul>
      </li>
      <li>
        Configure the web service to:
        <ul>
          <li>Expose port <strong>${appPort}</strong> to the host</li>
          <li>Depend on both the database and redis services</li>
          <li>Connect to the database using environment variables</li>
        </ul>
      </li>
      <li>
        Configure the database service with:
        <ul>
          <li>Database name: <code>${dbName}</code></li>
          <li>Database user: <code>${dbUser}</code></li>
          <li>Persistent volume for data storage</li>
          <li>Environment variables for credentials</li>
        </ul>
      </li>
      <li>
        Configure Redis service:
        <ul>
          <li>Use standard Redis image</li>
          <li>Optional: Custom port ${redisPort} (or default 6379)</li>
        </ul>
      </li>
      <li>
        Deploy the stack using <code>docker-compose up -d</code> and verify all containers are running
      </li>
      <li>
        Create a GitHub repository with:
        <ul>
          <li><code>docker-compose.yml</code> file</li>
          <li>
            <code>README.md</code> containing your email (<strong>${user.email}</strong>) and evidence
            of running containers (output of <code>docker ps</code> or screenshot)
          </li>
        </ul>
      </li>
      <li>
        Submit the raw GitHub URL to your <code>docker-compose.yml</code> file (e.g.,
        <code>https://raw.githubusercontent.com/username/repo/main/docker-compose.yml</code>)
      </li>
    </ol>

    <p>
      <label>
        GitHub raw URL to your docker-compose.yml:
        <input
          type="url"
          name="github_url"
          placeholder="https://raw.githubusercontent.com/..."
          style="width: 100%;"
        />
      </label>
    </p>

    <p class="text-muted">
      <small>
        Hint: Use <code>docker-compose --version</code> to check if Docker Compose is installed. The
        docker-compose.yml file should define services, networks, and volumes. Use environment variables
        for configuration and ensure services can communicate with each other. You can use simple images
        like nginx, postgres:latest, and redis:latest for testing.
      </small>
    </p>
  `;

  return { id, title, weight, question, answer };
}
