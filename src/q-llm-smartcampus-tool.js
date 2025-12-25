import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "llm-smartcampus-tool-calling";
  const title = "LLM Tool Calling for Smart Campus Operations";

  const random = seedrandom(`${user.email}#${id}`);

  // Randomly select one scenario
  const scenarios = [
    {
      query: "What is the temperature in Building C, Room 204?",
      tool: "get_classroom_temperature",
      args: { building: "Building C", room: "Room 204" },
    },
    {
      query: "Reserve Building A, Room 101 on 2025-03-10 at 09:00.",
      tool: "reserve_classroom",
      args: {
        building: "Building A",
        room: "Room 101",
        date: "2025-03-10",
        time: "09:00",
      },
    },
    {
      query: "Report a broken projector in Building D with high priority.",
      tool: "report_facility_issue",
      args: {
        issue_type: "broken projector",
        building: "Building D",
        priority: "high",
      },
    },
    {
      query: "When is the exam scheduled for course CS301?",
      tool: "get_exam_schedule",
      args: { course_code: "CS301" },
    },
    {
      query: "Request cleaning for the library area in Building B.",
      tool: "request_cleaning",
      args: {
        building: "Building B",
        area: "library area",
      },
    },
  ];

  const scenario = scenarios[Math.floor(random() * scenarios.length)];

  const answer = async (responseText) => {
    let response;
    try {
      response = JSON.parse(responseText);
    } catch {
      throw new Error("Response must be valid JSON");
    }

    if (!response.name) {
      throw new Error("Missing 'name' field in response");
    }

    if (response.name !== scenario.tool) {
      throw new Error(
        `Incorrect tool selected. Expected '${scenario.tool}' but got '${response.name}'`
      );
    }

    if (!response.arguments || typeof response.arguments !== "object") {
      throw new Error("Missing or invalid 'arguments' object");
    }

    for (const [key, value] of Object.entries(scenario.args)) {
      if (!(key in response.arguments)) {
        throw new Error(`Missing required argument: ${key}`);
      }
      if (response.arguments[key] !== value) {
        throw new Error(
          `Incorrect value for '${key}'. Expected '${value}'`
        );
      }
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h3>Context</h3>

<p>
  <strong>SmartCampus University</strong> is a large, multi-disciplinary institution
  with thousands of students, faculty members, classrooms, laboratories, and
  shared facilities spread across multiple buildings.
</p>

<p>
  To streamline day-to-day operations and reduce the workload on administrative
  and facilities staff, the university has deployed an
  <strong>AI-powered operations assistant</strong>. This assistant allows staff and
  faculty to interact with campus systems using simple natural-language requests,
  instead of filling out multiple forms or navigating complex dashboards.
</p>

<p>
  The assistant supports a variety of common operational tasks, such as:
</p>

<ul>
  <li>Checking real-time classroom sensor data (e.g., temperature)</li>
  <li>Reserving classrooms for lectures or meetings</li>
  <li>Reporting facility or equipment issues</li>
  <li>Querying exam schedules for academic courses</li>
  <li>Requesting cleaning services for specific campus areas</li>
</ul>

<p>
  Each request entered by a user follows a <strong>fixed, templatized structure</strong>,
  and contains one or more parameters such as building names, room numbers,
  dates, or course codes. These parameters may vary between users and requests.
</p>

<p>
  In the backend, a <strong>FastAPI application</strong> processes each request.
  Instead of directly executing the task, the API converts the request into a
  <strong>structured tool call</strong>. This tool call is then consumed by an
  LLM-enabled orchestration layer, which invokes the appropriate internal system
  with the extracted arguments.
</p>

<h3>Available Tools</h3>

<p>
  For this exercise, assume the following tools are already implemented and
  available to the AI assistant. Each tool has a strict function signature that
  must be respected.
</p>

<pre><code>
get_classroom_temperature(building: str, room: str)
reserve_classroom(building: str, room: str, date: str, time: str)
report_facility_issue(issue_type: str, building: str, priority: str)
get_exam_schedule(course_code: str)
request_cleaning(building: str, area: str)
</code></pre>

<h3>Task</h3>

<p>
  You are given the following request:
</p>

<pre><code>${scenario.query}</code></pre>

<p>
  Respond <strong>as an LLM with tool-calling enabled</strong>.
  If a tool should be called, return <strong>only JSON</strong>
  in the following format:
</p>

<pre><code class="json">{
  "name": "tool_name",
  "arguments": {
    "...": "..."
  }
}</code></pre>

<h3>Answer</h3>

<label for="${id}" class="form-label">
  Tool call JSON
</label>
<textarea
  class="form-control"
  id="${id}"
  name="${id}"
  rows="6"
  required
></textarea>

</div>
  `;

  return { id, title, weight, question, answer };
}
