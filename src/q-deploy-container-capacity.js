import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;

export default async function({ user, weight = 1 }) {
  const id = "q-deploy-container-capacity";
  const title = "Container Capacity Planning";
  const random = seedrandom(`${user.email}#${id}`);

  const nodeCpu = 2000; // millicores
  const nodeMem = 4096; // MiB

  const serviceNames = ["api", "worker", "ingest", "frontend", "scheduler", "vector-store"];
  const services = Array.from({ length: 4 }, () => ({
    name: serviceNames.splice(randInt(random, 0, serviceNames.length - 1), 1)[0],
    cpu: randInt(random, 180, 520), // millicores per pod
    mem: randInt(random, 320, 960), // MiB per pod
    replicas: randInt(random, 1, 3),
  }));

  const totalCpu = services.reduce((sum, s) => sum + s.cpu * s.replicas, 0);
  const totalMem = services.reduce((sum, s) => sum + s.mem * s.replicas, 0);
  const expectedNodes = Math.max(Math.ceil(totalCpu / nodeCpu), Math.ceil(totalMem / nodeMem));

  const question = html`
    <div class="mb-3">
      <h4>Deployment: Right-size your cluster</h4>
      <p>
        Assume each Kubernetes node has <strong>${nodeCpu} millicores</strong> CPU and
        <strong>${nodeMem} MiB</strong> memory available for pods. Ignore DaemonSets/overhead.
        With perfect bin-packing and requests = limits, how many nodes are required to schedule all replicas below?
      </p>
      <table class="table table-sm">
        <thead>
          <tr>
            <th>Service</th><th>CPU (m)</th><th>Mem (MiB)</th><th>Replicas</th>
          </tr>
        </thead>
        <tbody>
          ${services.map((s) => html`<tr><td>${s.name}</td><td>${s.cpu}</td><td>${s.mem}</td><td>${s.replicas}</td></tr>`)}
        </tbody>
      </table>
      <p class="mb-2">Enter the minimum whole number of nodes needed.</p>
      <input class="form-control" id="${id}" name="${id}" inputmode="numeric" />
    </div>
  `;

  const answer = (input) => {
    const value = Number.parseInt(String(input || "").trim(), 10);
    if (Number.isNaN(value)) throw new Error("Enter a whole number");
    return value === expectedNodes;
  };

  return { id, title, weight, question, answer };
}
