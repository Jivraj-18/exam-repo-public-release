import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-docker-run-port";
    const title = "Identify Docker Port Mappings";

    const random = seedrandom(`${user.email}#${id}`);
    const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;

    // Generate 3 random port mappings
    const mappings = [];
    for (let i = 0; i < 3; i++) {
        const hostPort = randInt(1000, 9000);
        const containerPort = randInt(1000, 9000);
        mappings.push({ host: hostPort, container: containerPort });
    }

    // Pick one to ask about
    const target = mappings[Math.floor(random() * mappings.length)];

    // Construct command
    const portArgs = mappings.map(m => `-p ${m.host}:${m.container}`).join(" ");
    const command = `docker run -d ${portArgs} my-web-server`;

    const question = html`
    <div class="mb-3">
      <p>
        You are continuously running multiple containers. You ran the following command:
      </p>
      <pre><code>${command}</code></pre>
      <p>
        Which <strong>host port</strong> is mapped to the container port <code>${target.container}</code>?
      </p>
      <label for="${id}" class="form-label">Host Port:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    const answer = (input) => {
        if (parseInt(input) !== target.host) {
            throw new Error(`Incorrect. Expected ${target.host}`);
        }
        return true;
    };

    return { id, title, weight, question, answer };
}
