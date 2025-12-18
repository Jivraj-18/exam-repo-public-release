import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-docker-port-mapping";
    const title = "Docker Port Mapping";

    const random = seedrandom(`${user.email}#${id}`);
    const hostPort = Math.floor(random() * 1000) + 8000;
    const containerPort = Math.floor(random() * 1000) + 3000;
    const answer = `-p ${hostPort}:${containerPort}`;

    const question = html`
    <div class="mb-3">
      <p>In the <code>docker run</code> command, which flag maps the host port <strong>${hostPort}</strong> to the container port <strong>${containerPort}</strong>?</p>
      
      <label for="${id}" class="form-label">Answer</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="-p host:container" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
