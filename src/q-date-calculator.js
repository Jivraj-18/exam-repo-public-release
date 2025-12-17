import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;

const formatDate = (date) => date.toISOString().split("T")[0];

const daysBetween = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  const diff = Math.abs(date2 - date1);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return formatDate(result);
};

const getDayOfWeek = (date) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[new Date(date).getDay()];
};

const getWeekNumber = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

const generateDate = (random, yearMin = 2020, yearMax = 2025) => {
  const year = randInt(random, yearMin, yearMax);
  const month = randInt(random, 1, 12);
  const maxDay = daysInMonth(year, month);
  const day = randInt(random, 1, maxDay);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

const taskFactories = [
  (random) => {
    const date1 = generateDate(random, 2022, 2023);
    const date2 = generateDate(random, 2024, 2025);
    return {
      id: "days-between",
      operation: "days_between",
      params: { date1, date2 },
      expected: daysBetween(date1, date2),
      description: `calculate days between ${date1} and ${date2}`,
    };
  },
  (random) => {
    const date = generateDate(random);
    const days = randInt(random, 10, 100);
    return {
      id: "add-days",
      operation: "add_days",
      params: { date, days },
      expected: addDays(date, days),
      description: `add ${days} days to ${date}`,
    };
  },
  (random) => {
    const date = generateDate(random);
    return {
      id: "day-of-week",
      operation: "day_of_week",
      params: { date },
      expected: getDayOfWeek(date),
      description: `find the day of week for ${date}`,
    };
  },
  (random) => {
    const date = generateDate(random);
    return {
      id: "week-number",
      operation: "week_number",
      params: { date },
      expected: getWeekNumber(date),
      description: `find the ISO week number for ${date}`,
    };
  },
  (random) => {
    const year = randInt(random, 2000, 2100);
    return {
      id: "leap-year",
      operation: "is_leap_year",
      params: { year },
      expected: isLeapYear(year),
      description: `check if ${year} is a leap year`,
    };
  },
  (random) => {
    const year = randInt(random, 2020, 2025);
    const month = randInt(random, 1, 12);
    return {
      id: "days-in-month",
      operation: "days_in_month",
      params: { year, month },
      expected: daysInMonth(year, month),
      description: `find days in month ${month}/${year}`,
    };
  },
];

export default async function ({ user, weight = 1 }) {
  const id = "q-date-calculator";
  const title = "Date Calculator API";
  const random = seedrandom(`${user.email}#${id}`);
  const task = pick(taskFactories, random)(random);

  const question = html`
    <div class="mb-3">
      <h4>Date Calculator API</h4>
      <p>
        <strong>Scenario:</strong> Build a FastAPI endpoint that performs date calculations.
      </p>
      <ol>
        <li>Implement a FastAPI app with a <code>POST /date</code> route.</li>
        <li>Accept JSON with operation and parameters</li>
        <li>
          Supported operations: <code>days_between</code>, <code>add_days</code>, <code>day_of_week</code>,
          <code>week_number</code>, <code>is_leap_year</code>, <code>days_in_month</code>
        </li>
        <li>Respond with: <code>{ "result": ..., "email": "${user.email}" }</code></li>
        <li>Enable CORS for cross-origin requests.</li>
      </ol>
      <p>
        For grading: ${task.description}<br />
        Operation: <code>${task.operation}</code><br />
        Parameters: <code>${JSON.stringify(task.params)}</code>
      </p>
      <label for="${id}" class="form-label">Enter the base URL of your API</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("URL is required");

    const endpoint = url.replace(/\/$/, "") + "/date";
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ operation: task.operation, ...task.params }),
    });

    if (!resp.ok) throw new Error(`Endpoint returned ${resp.status}`);

    let data;
    try {
      data = await resp.json();
    } catch {
      throw new Error("Invalid JSON response");
    }

    if (data.email !== user.email) throw new Error("Email must match");

    const result = data.result;
    const expected = task.expected;

    if (typeof expected === "boolean") {
      if (result !== expected) throw new Error(`Expected ${expected}, got ${result}`);
    } else if (typeof expected === "number") {
      if (Number(result) !== expected) throw new Error(`Expected ${expected}, got ${result}`);
    } else {
      if (String(result) !== String(expected)) {
        throw new Error(`Expected "${expected}", got "${result}"`);
      }
    }

    return true;
  };

  return { id, title, weight, question, answer };
}