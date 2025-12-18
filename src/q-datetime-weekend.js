import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-datetime-weekend";
  const title = "Date Handling: Weekend Checker Endpoint";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate random dates for testing
  const generateTestDate = (isWeekend) => {
    const year = 2024 + Math.floor(random() * 2);
    const month = Math.floor(random() * 12);
    let day;

    // Find a date that matches the weekend requirement
    const baseDate = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let d = 1; d <= daysInMonth; d++) {
      const testDate = new Date(year, month, d);
      const dayOfWeek = testDate.getDay();
      const isWeekendDay = dayOfWeek === 0 || dayOfWeek === 6;

      if (isWeekend === isWeekendDay) {
        day = d;
        break;
      }
    }

    const dateObj = new Date(year, month, day);
    const formatted = dateObj.toISOString().split("T")[0];
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dateObj.getDay()];
    return { date: formatted, dayName, isWeekend };
  };

  // Generate test cases - mix of weekends and weekdays
  const testCases = [
    generateTestDate(true), // Saturday or Sunday
    generateTestDate(false), // Weekday
    generateTestDate(true), // Another weekend
    generateTestDate(false), // Another weekday
    { date: "2024-12-25", dayName: "Wednesday", isWeekend: false }, // Christmas 2024 (Wednesday)
    { date: "2024-12-28", dayName: "Saturday", isWeekend: true }, // Saturday
  ];

  const answer = async (url) => {
    url = url.trim();
    if (!url) throw new Error("Please provide the URL of your /check-weekend endpoint");

    const baseUrl = url.replace(/\/$/, "");
    const endpoint = `${baseUrl}/check-weekend`;

    for (const testCase of testCases) {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: testCase.date }),
      });

      if (!response.ok) {
        throw new Error(`Endpoint returned ${response.status} for date: ${testCase.date}`);
      }

      const result = await response.json();

      if (typeof result.is_weekend !== "boolean") {
        throw new Error(`Response must contain 'is_weekend' as a boolean for date: ${testCase.date}`);
      }

      if (result.is_weekend !== testCase.isWeekend) {
        throw new Error(
          `Failed for ${testCase.date} (${testCase.dayName}): ` +
            `Expected is_weekend=${testCase.isWeekend}, got ${result.is_weekend}`
        );
      }
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Weekend Date Checker API</h2>
      <p>
        <strong>WorkFlow Pro</strong> is a project management tool that needs to identify weekends for scheduling
        purposes. Your task is to create an API endpoint that checks if a given date falls on a weekend.
      </p>

      <h3>Requirements</h3>
      <ol>
        <li>
          Create a <strong>POST</strong> endpoint at <code>/check-weekend</code>
        </li>
        <li>
          Accept JSON body: <code>{"date": "YYYY-MM-DD"}</code>
        </li>
        <li>
          Return <code>{"is_weekend": true}</code> if the date is a Saturday (day 6) or Sunday (day 0)
        </li>
        <li>Return <code>{"is_weekend": false}</code> for Monday through Friday</li>
      </ol>

      <h3>Test Cases</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Day</th>
            <th>Expected is_weekend</th>
          </tr>
        </thead>
        <tbody>
          ${testCases.map(
            (tc) => html`
              <tr>
                <td><code>${tc.date}</code></td>
                <td>${tc.dayName}</td>
                <td><code>${tc.isWeekend}</code></td>
              </tr>
            `
          )}
        </tbody>
      </table>

      <h3>Implementation Hint</h3>
      <p>In Python, you can use:</p>
      <pre><code class="language-python">from datetime import datetime
date_obj = datetime.strptime(date_string, "%Y-%m-%d")
is_weekend = date_obj.weekday() >= 5  # 5=Saturday, 6=Sunday</code></pre>

      <label for="${id}" class="form-label">Enter your API base URL (e.g., https://your-server.com):</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="https://your-api-url.com" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
