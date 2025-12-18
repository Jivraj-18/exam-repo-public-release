import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "https://cdn.jsdelivr.net/npm/seedrandom/+esm";

export default async function({ user, weight = 1 }) {
  const id = "q-seaborn-linear-forecast";
  const title = "Seaborn — Linear forecast of next month revenue";

  const rand = seedrandom(`${user.email}#${id}`);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const n = 12;
  const base = 20000 + Math.floor(rand()*8000); // base revenue
  const slope = 200 + Math.floor(rand()*400); // upward trend per month
  const noiseSeed = Math.floor(rand()*10000);

  // generate revenues
  const revenues = [];
  for (let i=0;i<n;i++){
    const noise = (seedrandom(`${noiseSeed}-${i}`)()-0.5)*2000;
    revenues.push(Math.round(base + slope*i + noise));
  }

  // compute linear regression (least squares) for months 1..12 -> predict month 13
  const xs = Array.from({length:n}, (_,i)=>i+1);
  const ys = revenues;
  const xMean = xs.reduce((a,b)=>a+b,0)/n;
  const yMean = ys.reduce((a,b)=>a+b,0)/n;
  const num = xs.reduce((s, x, i) => s + (x - xMean)*(ys[i] - yMean), 0);
  const den = xs.reduce((s, x) => s + (x - xMean)*(x - xMean), 0);
  const beta = num/den;
  const alpha = yMean - beta*xMean;
  const nextX = n+1;
  const forecast = Math.round(alpha + beta*nextX);

  const answer = forecast;

  const snippet = `# revenues (monthly): ${revenues.join(", ")}`;

  const question = html`
    <div class="mb-3">
      <h3>Forecast next month revenue (linear fit)</h3>
      <p>
        A script generated monthly revenue for 12 months (shown below). Fit a simple linear regression (month index → revenue)
        and forecast revenue for month 13. Provide the forecast as a whole-number USD amount.
      </p>

      <pre><code class="language-text">${snippet}</code></pre>

      <label for="${id}" class="form-label">Forecast revenue for month 13 (USD, integer)</label>
      <input class="form-control" id="${id}" name="${id}" />
      <p class="text-muted">Use ordinary least squares (linear). The data is deterministic for your seed.</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
