import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-data-filtering";
  const title = "HR Headhunting: Top Candidates (Data Analysis)";

  /* Prodcution Mode: Seed based on user email */
  const random = seedrandom(`${user.email}#${id}`);
  const depts = ["Engineering", "Sales", "Marketing", "HR"];
  const firstNames = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy"];
  const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"];
  
  // Generate 100 employees for scale
  const employees = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1001,
    name: `${firstNames[Math.floor(random() * firstNames.length)]} ${lastNames[Math.floor(random() * lastNames.length)]}`,
    dept: depts[Math.floor(random() * depts.length)],
    salary: Math.floor(random() * 90000) + 60000, 
    score: Math.floor(random() * 101), // 0-100
    experience: Math.floor(random() * 21) // 0-20 years
  }));

  // Select a random target department
  const targetDept = depts[Math.floor(random() * depts.length)];
  
  // Scoring Weights per Dept
  const weights = {
    "Engineering": { tech: 1.0, exp: 2.0 },
    "Sales":       { tech: 0.5, exp: 5.0 },
    "Marketing":   { tech: 0.8, exp: 3.0 },
    "HR":          { tech: 0.5, exp: 4.0 }
  };

  const w = weights[targetDept];

  const expected = employees
    .filter(e => e.dept === targetDept)
    .map(e => ({
      ...e,
      fitness: (e.score * w.tech) + (e.experience * w.exp)
    }))
    .sort((a, b) => b.fitness - a.fitness || b.score - a.score)
    .slice(0, 5)
    .map(e => e.id);

  const blob = new Blob([JSON.stringify(employees, null, 2)], { type: "application/json" });

  const answer = (input) => {
    try {
      let userAns = JSON.parse(input);
      if (!Array.isArray(userAns) && typeof userAns === 'object' && userAns !== null) {
        const arrays = Object.values(userAns).filter(Array.isArray);
        if (arrays.length === 1) userAns = arrays[0];
      }

      if(!Array.isArray(userAns)) return false;
      return JSON.stringify(userAns) === JSON.stringify(expected);
    } catch(e) { return false; }
  };

  const question = html`
    <div class="mb-3">
      <h4>Case Study: Algorithmic Hiring (Weighted Scoring)</h4>
      <p>
        You are the <strong>HR Data Scientist</strong> at <em>TechCorp</em>. 
        Raw technical scores aren't enough—you need to calculate a **Fitness Score** for candidates based on department needs.
      </p>
      
      <div class="card mb-3">
        <div class="card-header"><strong>Department Fitness Formulas</strong></div>
        <ul class="list-group list-group-flush">
          ${Object.entries(weights).map(([dept, w]) => html`
            <li class="list-group-item">
              <strong>${dept}:</strong> <code>(Score x ${w.tech}) + (Experience x ${w.exp})</code>
            </li>
          `)}
        </ul>
      </div>

      <h3>Task</h3>
      <ol>
        <li>Download the employee database below.</li>
        <li>Filter candidates by <code>dept = '${targetDept}'</code>.</li>
        <li>Calculate the <strong>Fitness Score</strong> using the formula above.</li>
        <li>Select the <strong>Top 5</strong> candidates with the highest Fitness Score.</li>
        <li>Return their IDs as a JSON array.</li>
      </ol>

      <p><strong>Sample Record:</strong></p>
      <pre style="background:#222; padding:10px; border-radius:5px;">${JSON.stringify(employees[0], null, 2)}</pre>

      <p>
        Download database:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.json`)}>
          ${id}.json
        </button>
      </p>

      <label for="${id}" class="form-label">Top 5 IDs (JSON Array {"ids": [ 1234, 1214, ... ]}):</label>
      <input type="text" class="form-control" name="${id}" id="${id}">
      <p class="text-muted">
        Use <code>jq</code> features such as <code>jq functions</code>.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/*
  Solution using jq (Week 5/6 Skill):
  
  # Logic: Filter -> Transform (Calc Fitness) -> Sort -> Slice -> Map
  
  # COPY the command matching your assigned Department:
  
  # Engineering (Weights: Tech 1.0, Exp 2.0)
  # jq '[.[] | select(.dept == "Engineering")] | map(. + {fitness: ((.score * 1.0) + (.experience * 2.0))}) | sort_by(-.fitness, -.score) | .[0:5] | map(.id)' q-data-filtering.json

  # Sales (Weights: Tech 0.5, Exp 5.0)
  # jq '[.[] | select(.dept == "Sales")] | map(. + {fitness: ((.score * 0.5) + (.experience * 5.0))}) | sort_by(-.fitness, -.score) | .[0:5] | map(.id)' q-data-filtering.json

  # Marketing (Weights: Tech 0.8, Exp 3.0)
  # jq '[.[] | select(.dept == "Marketing")] | map(. + {fitness: ((.score * 0.8) + (.experience * 3.0))}) | sort_by(-.fitness, -.score) | .[0:5] | map(.id)' q-data-filtering.json

  # HR (Weights: Tech 0.5, Exp 4.0)
  # jq '[.[] | select(.dept == "HR")] | map(. + {fitness: ((.score * 0.5) + (.experience * 4.0))}) | sort_by(-.fitness, -.score) | .[0:5] | map(.id)' q-data-filtering.json
*/
