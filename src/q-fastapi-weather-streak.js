import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js"; 
import seedrandom from "seedrandom";
import _ from "https://cdn.jsdelivr.net/npm/lodash@4/+esm";

export default async function({ user, weight = 1 }) {
  const id = "q-fastapi-weather-streak";
  const title = "FASTAPI: Advanced Weather Sequence Analysis";

  // Generate deterministic daily temperatures for 10 days
  const random = seedrandom(`${user.email}#${id}`);
  const temps = Array.from({ length: 10 }, () => Math.floor(random() * 15) + 20); // 20–34 °C

  const heatThreshold = 28; // temp >= 28 considered "heatwave day"
  const coldThreshold = 22; // temp <= 22 considered "cold day"

  // Helper: count heatwave sequences (3+ consecutive days >= threshold)
  function countHeatwaveSequences(arr) {
    let count = 0, streak = 0;
    for (const t of arr) {
      if (t >= heatThreshold) streak++;
      else streak = 0;
      if (streak === 3) count++;
    }
    return count;
  }

  // Helper: longest cold streak
  function longestColdStreak(arr) {
    let maxStreak = 0, streak = 0;
    for (const t of arr) {
      if (t <= coldThreshold) streak++;
      else streak = 0;
      if (streak > maxStreak) maxStreak = streak;
    }
    return maxStreak;
  }

  const answer = {
    average: _.round(_.sum(temps) / temps.length, 2),
    heatwaveSequences: countHeatwaveSequences(temps),
    longestColdStreak: longestColdStreak(temps)
  };

  const question = html`
    <div class="mb-3">
      <p>Create a <strong>FastAPI</strong> endpoint <code>/weather_analysis</code> that:</p>
      <ol>
        <li>Accepts query parameters <code>d1–d10</code> representing daily temperatures.</li>
        <li>Returns a JSON object with:</li>
        <ul>
          <li><code>average</code>: average temperature</li>
          <li><code>heatwaveSequences</code>: number of 3+ day heatwave sequences (&ge; ${heatThreshold}°C)</li>
          <li><code>longestColdStreak</code>: longest streak of days ≤ ${coldThreshold}°C</li>
        </ul>
      </ol>
      <p>Example request:</p>
      <pre><code>/weather_analysis?d1=22&d2=30&d3=29&d4=31&d5=21&d6=23&d7=24&d8=29&d9=30&d10=22</code></pre>
      <p>The response should look like:</p>
      <pre><code>{
  "average": 26.1,
  "heatwaveSequences": 2,
  "longestColdStreak": 2
}</code></pre>

      <label class="form-label">Provide the URL to your endpoint for validation:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  const validate = async (endpointUrl) => {
    try {
      const query = temps.map((t, i) => `d${i+1}=${t}`).join("&");
      const res = await fetch(`${endpointUrl}?${query}`);
      const data = await res.json();
      return (
        data.average === answer.average &&
        data.heatwaveSequences === answer.heatwaveSequences &&
        data.longestColdStreak === answer.longestColdStreak
      );
    } catch {
      return false;
    }
  };

  return { id, title, weight, question, answer: validate };
};
