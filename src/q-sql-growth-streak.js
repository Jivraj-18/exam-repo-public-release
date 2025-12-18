import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "https://cdn.jsdelivr.net/npm/seedrandom/+esm";

export default async function({ user, weight = 1 }) {
  const id = "q-sql-growth-streak";
  const title = "SQL — Longest Consecutive Growth Streak";

  const rand = seedrandom(`${user.email}#${id}`);
  const rint = (a,b)=>Math.floor(rand()*(b-a+1))+a;

  const regions = ["North","South","East","West"];
  const days = 75;

  // generate daily revenue
  const data = [];
  const start = new Date("2024-07-01T00:00:00Z");

  for (let d=0; d<days; d++) {
    const date = new Date(start.getTime()+d*86400000).toISOString().slice(0,10);
    for (const r of regions) {
      const base = 10000 + regions.indexOf(r)*2000;
      const noise = rint(-1500, 2000);
      data.push({ date, region: r, revenue: base + d*80 + noise });
    }
  }

  // compute longest streak of day-over-day growth per region
  const streaks = {};
  for (const r of regions) streaks[r] = 0;

  for (const r of regions) {
    const rows = data.filter(x=>x.region===r);
    let cur = 0, max = 0;
    for (let i=1;i<rows.length;i++) {
      if (rows[i].revenue > rows[i-1].revenue) {
        cur++;
        max = Math.max(max, cur);
      } else {
        cur = 0;
      }
    }
    streaks[r] = max;
  }

  let bestRegion = null;
  let bestStreak = -1;
  for (const r of regions) {
    if (streaks[r] > bestStreak) {
      bestStreak = streaks[r];
      bestRegion = r;
    }
  }

  const answer = bestRegion;

  const question = html`
    <div class="mb-3">
      <h3>Revenue momentum analysis</h3>
      <p>
        A table <code>daily_revenue(date, region, revenue)</code> tracks revenue per region.
      </p>
      <p>
        A <em>growth streak</em> is defined as consecutive days where revenue strictly increases
        day-over-day for the same region.
      </p>
      <p>
        Using SQL window functions (<code>LAG</code>, grouping logic), determine which region has
        the <strong>longest consecutive growth streak</strong>.
      </p>

      <label for="${id}" class="form-label">Region name</label>
      <input class="form-control" id="${id}" name="${id}" />
      <p class="text-muted">
        Hint: Use a flag for growth days, then group by cumulative resets.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
