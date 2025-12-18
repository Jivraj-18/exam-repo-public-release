import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "https://cdn.jsdelivr.net/npm/seedrandom/+esm";

export default async function({ user, weight = 1 }) {
  const id = "q-network-betweenness";
  const title = "Network — highest betweenness centrality (Brandes)";

  const rand = seedrandom(`${user.email}#${id}`);
  const rint = (a,b) => Math.floor(rand()*(b-a+1))+a;

  // build small undirected graph of 12 nodes named N1..N12
  const N = 12;
  const nodes = Array.from({length:N}, (_,i)=>`N${i+1}`);
  const edges = new Set();
  // create a core (1-5) dense, plus peripheral connections
  const addEdge = (a,b) => {
    const key = a < b ? `${a}|${b}` : `${b}|${a}`;
    edges.add(key);
  };
  // dense core among 1..5
  for (let i=1;i<=5;i++) for (let j=i+1;j<=5;j++) if (rand() < 0.9) addEdge(`N${i}`, `N${j}`);
  // connect core to mid nodes 6..9
  for (let i=6;i<=9;i++) addEdge(`N${rint(1,5)}`, `N${i}`);
  // chain 9..12 with occasional cross links
  addEdge("N9","N10"); addEdge("N10","N11"); addEdge("N11","N12");
  if (rand() < 0.6) addEdge("N8","N11");
  if (rand() < 0.6) addEdge("N5","N10");
  if (rand() < 0.4) addEdge("N3","N12");

  const edgeList = Array.from(edges).map(k => k.split("|"));

  // Implement Brandes algorithm to compute betweenness centrality (unweighted)
  const adj = {};
  for (const n of nodes) adj[n] = [];
  for (const [a,b] of edgeList) {
    adj[a].push(b);
    adj[b].push(a);
  }

  // Brandes
  const bc = {};
  for (const n of nodes) bc[n] = 0;
  for (const s of nodes) {
    const S = [];
    const P = {};
    const sigma = {};
    const dist = {};
    for (const v of nodes) { P[v]=[]; sigma[v]=0; dist[v]=-1; }
    sigma[s]=1; dist[s]=0;
    const Q = [s];
    while (Q.length) {
      const v = Q.shift();
      S.push(v);
      for (const w of adj[v]) {
        if (dist[w] < 0) {
          dist[w] = dist[v] + 1;
          Q.push(w);
        }
        if (dist[w] === dist[v] + 1) {
          sigma[w] += sigma[v];
          P[w].push(v);
        }
      }
    }
    const delta = {};
    for (const v of nodes) delta[v]=0;
    while (S.length) {
      const w = S.pop();
      for (const v of P[w]) {
        delta[v] += (sigma[v]/sigma[w]) * (1 + delta[w]);
      }
      if (w !== s) bc[w] += delta[w];
    }
  }

  // find node with highest bc
  let best = null;
  let bestVal = -Infinity;
  for (const n of nodes) {
    if (bc[n] > bestVal) { bestVal = bc[n]; best = n; }
  }

  const answer = best;

  const question = html`
    <div class="mb-3">
      <h3>Network betweenness centrality</h3>
      <p>
        A deterministic graph (nodes N1..N12) is constructed. Compute betweenness centrality (Brandes algorithm, unweighted)
        and report the node with the highest betweenness centrality (format like <code>N6</code>).
      </p>
      <pre><code>${edgeList.map(e=>e.join(" - ")).join("\n")}</code></pre>

      <label for="${id}" class="form-label">Node with highest betweenness centrality</label>
      <input class="form-control" id="${id}" name="${id}" />
      <p class="text-muted">Answer should be the node name exactly, e.g., <code>N6</code>.</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
