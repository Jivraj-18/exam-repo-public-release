import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "https://cdn.jsdelivr.net/npm/seedrandom/+esm";

export default async function({ user, weight = 1 }) {
  const id = "q-rolling-anomaly";
  const title = "SQL — Rolling activation spike (7-day trailing lift)";

  const rand = seedrandom(`${user.email}#${id}`);

  // helper: random int
  const rint = (a,b) => Math.floor(rand()*(b-a+1))+a;

  // make 90 days of activations for 4 regions
  const regions = ["North","South","East","West"];
  const days = 90;
  const start = new Date("2024-09-01T00:00:00Z");
  const rows = [];

  for (let d=0; d<days; d++) {
    const dt = new Date(start.getTime() + d*24*3600*1000);
    for (const region of regions) {
      // base + some periodic + noise
      const base = 20 + (regions.indexOf(region)+1)*5;
      const seasonal = Math.round(10 * Math.sin((d/14)*Math.PI*2));
      const noise = rint(-5,10);
      // occasional surge
      const surge = (rand() < 0.02) ? rint(50,120) : 0;
      const activations = Math.max(0, base + seasonal + noise + surge);
      rows.push({ date: dt.toISOString().slice(0,10), region, activations });
    }
  }

  // pick a region deterministically
  const regionIdx = Math.floor(rand()*regions.length);
  const regionToCheck = regions[regionIdx];

  // compute 7-day trailing average excluding current day, then lift = (activations - trailing_avg)/trailing_avg
  // for each day starting at index >=7 compute trailing avg
  const byDate = {};
  for (const r of rows) {
    byDate[r.date] = byDate[r.date] || {};
    byDate[r.date][r.region] = r.activations;
  }
  const dates = Object.keys(byDate).sort();
  const activs = dates.map(d => ({ date:d, val: byDate[d][regionToCheck] }));

  const lifts = [];
  for (let i=7; i<activs.length; i++) {
    const trailing = activs.slice(i-7, i).map(x=>x.val);
    const trailingAvg = trailing.reduce((a,b)=>a+b,0)/trailing.length;
    const cur = activs[i].val;
    if (trailingAvg > 0) {
      lifts.push({ date: activs[i].date, lift: (cur - trailingAvg)/trailingAvg });
    }
  }
  const maxLift = lifts.reduce((m, x) => x.lift > m ? x.lift : m, -Infinity);

  // answer: percentage or decimal allowed — we provide decimal rounded to 3 dp
  const answer = Number(maxLift.toFixed(3));

  const question = html`
    <div class="mb-3">
      <h3>Detect a trailing activation spike</h3>
      <p>
        Given a daily activations table (date, region, activations), compute the maximum positive lift
        for <strong>${regionToCheck}</strong> compared to the 7-day trailing average (exclude the current day when you compute the trailing average).
        The lift is defined as <code>(activations_today - trailing_avg) / trailing_avg</code>.
      </p>
      <p>
        Data is deterministic per user. No external fetch required. Provide the maximum positive lift as a decimal (e.g. <code>0.45</code>).
      </p>

      <label for="${id}" class="form-label">Maximum 7-day trailing lift (decimal)</label>
      <input class="form-control" id="${id}" name="${id}" />
      <p class="text-muted">Region checked: <strong>${regionToCheck}</strong>. Round/enter as a decimal to three decimal places.</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
