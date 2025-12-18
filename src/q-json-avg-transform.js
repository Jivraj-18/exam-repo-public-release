import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-json-avg-transform";
    const title = "JSON Data Transformation - Calculate Averages";

    const random = seedrandom(`${user.email}#${id}`);

    // Generate random test data
    const numUsers = 3;
    const users = [];
    for (let i = 0; i < numUsers; i++) {
        const name = ["Alice", "Bob", "Charlie", "Diana", "Eve"][i];
        const numScores = 3 + Math.floor(random() * 2); // 3 or 4 scores
        const scores = Array.from({ length: numScores }, () => 70 + Math.floor(random() * 30));
        users.push({ id: i + 1, name, scores });
    }

    // Calculate expected answer
    const result = {};
    users.forEach(user => {
        const avg = user.scores.reduce((a, b) => a + b, 0) / user.scores.length;
        result[user.name] = parseFloat(avg.toFixed(2));
    });

    const answer = JSON.stringify(result);

    const question = html`
    <div class="mb-3">
      <p>
        You received this JSON data from an API. Transform it to create a new structure 
        containing only names and their average scores (rounded to 2 decimal places).
      </p>
      
      <pre><code class="language-json">{
  "users": ${JSON.stringify(users, null, 2).split('\n').slice(1).join('\n')}
}</code></pre>

      <p>Expected output format: <code>{"Alice": 87.67, "Bob": 82.33, ...}</code></p>
      
      <p>Which Python code correctly transforms this data?</p>
      
      <div class="form-check">
        <input class="form-check-input" type="radio" name="${id}" id="${id}-a" value="A">
        <label class="form-check-label" for="${id}-a">
          A) <code>result = {u['name']: sum(u['scores'])/3 for u in data['users']}</code>
        </label>
      </div>
      
      <div class="form-check">
        <input class="form-check-input" type="radio" name="${id}" id="${id}-b" value="B">
        <label class="form-check-label" for="${id}-b">
          B) <code>result = {u['name']: round(sum(u['scores'])/len(u['scores']), 2) for u in data['users']}</code>
        </label>
      </div>
      
      <div class="form-check">
        <input class="form-check-input" type="radio" name="${id}" id="${id}-c" value="C">
        <label class="form-check-label" for="${id}-c">
          C) <code>result = [{'name': u['name'], 'avg': sum(u['scores'])/3} for u in data['users']]</code>
        </label>
      </div>
      
      <div class="form-check">
        <input class="form-check-input" type="radio" name="${id}" id="${id}-d" value="D">
        <label class="form-check-label" for="${id}-d">
          D) <code>result = {user.name: average(user.scores) for user in data.users}</code>
        </label>
      </div>
    </div>
  `;

    return { id, title, weight, question, answer: "B" };
}
