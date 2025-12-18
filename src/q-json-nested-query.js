import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-json-nested-query";
  const title = "JSON Nested Query";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  // Generate complex nested JSON data
  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance"];
  const statuses = ["active", "inactive", "pending"];
  const cities = ["New York", "San Francisco", "London", "Tokyo", "Berlin"];
  
  const employees = [];
  const numEmployees = randInt(5, 10);
  
  for (let i = 0; i < numEmployees; i++) {
    const numSkills = randInt(2, 5);
    const skills = Array.from({ length: numSkills }, () => 
      pick(["Python", "JavaScript", "SQL", "Docker", "AWS", "React", "Node.js", "Java", "Go", "Kubernetes"])
    );
    
    employees.push({
      id: `EMP${String(randInt(1000, 9999))}`,
      name: `${pick(["Alice", "Bob", "Carol", "David", "Eve", "Frank", "Grace", "Henry"])} ${pick(["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller"])}`,
      department: pick(departments),
      status: pick(statuses),
      salary: randInt(50000, 150000),
      location: {
        city: pick(cities),
        remote: random() > 0.5
      },
      skills: [...new Set(skills)], // Remove duplicates
      performance: {
        rating: Math.round(random() * 4 + 1), // 1-5
        lastReview: `2024-${String(randInt(1, 12)).padStart(2, "0")}-${String(randInt(1, 28)).padStart(2, "0")}`
      }
    });
  }

  const data = {
    company: "TechCorp",
    employees: employees,
    metadata: {
      lastUpdated: "2024-12-15T10:30:00Z",
      version: "2.1"
    }
  };

  const jsonString = JSON.stringify(data, null, 2);

  // Generate different query tasks
  const activeDept = pick(departments);
  const activeEmployees = employees.filter(e => e.status === "active");
  const deptEmployees = employees.filter(e => e.department === activeDept);
  const remoteCount = employees.filter(e => e.location.remote).length;
  const avgSalary = Math.round(employees.reduce((sum, e) => sum + e.salary, 0) / employees.length);
  const maxRating = Math.max(...employees.map(e => e.performance.rating));
  const topPerformers = employees.filter(e => e.performance.rating === maxRating);

  const questions = [
    { 
      ask: "number of employees with status 'active'", 
      answer: activeEmployees.length,
      jqHint: ".employees | map(select(.status == \"active\")) | length"
    },
    { 
      ask: `number of employees in the ${activeDept} department`, 
      answer: deptEmployees.length,
      jqHint: `.employees | map(select(.department == "${activeDept}")) | length`
    },
    { 
      ask: "number of remote employees", 
      answer: remoteCount,
      jqHint: ".employees | map(select(.location.remote == true)) | length"
    },
    { 
      ask: "average salary (rounded to nearest integer)", 
      answer: avgSalary,
      jqHint: "[.employees[].salary] | add / length"
    },
    { 
      ask: "highest performance rating", 
      answer: maxRating,
      jqHint: "[.employees[].performance.rating] | max"
    },
  ];

  const targetQuestion = pick(questions);
  const expectedAnswer = targetQuestion.answer;

  const answer = (input) => {
    const num = parseInt(String(input).trim(), 10);
    if (num !== expectedAnswer) {
      throw new Error(`Expected ${expectedAnswer}`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>JSON Data Query</h2>
      <p>
        <strong>Scenario:</strong> You're working with a company's employee 
        database exported as JSON. You need to extract specific information 
        using tools like <code>jq</code>, Python, or JavaScript.
      </p>
      
      <p>Here is the JSON data:</p>
      
      <pre style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px; font-family: monospace; font-size: 11px; max-height: 400px; overflow-y: auto;">${jsonString}</pre>
      
      <h3>Your Task</h3>
      <p>Query the JSON to find the <strong>${targetQuestion.ask}</strong>.</p>
      
      <p class="text-muted">
        <strong>Hint:</strong> Using jq: <code>${targetQuestion.jqHint}</code><br>
        Or use Python's <code>json</code> module with list comprehension.
      </p>

      <label for="${id}" class="form-label">
        What is the ${targetQuestion.ask}?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}
