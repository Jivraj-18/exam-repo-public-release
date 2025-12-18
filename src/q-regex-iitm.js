import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-regex-iitm";
  const title = "Regex Validation: IITM Email Verification";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  // Generate random test usernames
  const firstNames = ["rahul", "priya", "amit", "neha", "vikram", "ananya", "rohan", "kavya", "arjun", "divya"];
  const randomUsername = pick(firstNames) + Math.floor(random() * 1000);

  // Test cases
  const testCases = [
    {
      email: `${randomUsername}@ds.study.iitm.ac.in`,
      expected: true,
      description: "Valid IITM DS email",
    },
    {
      email: `${randomUsername}@gmail.com`,
      expected: false,
      description: "Generic Gmail address",
    },
    {
      email: `${randomUsername}@study.iitm.ac.in`,
      expected: false,
      description: "Missing 'ds.' subdomain",
    },
    {
      email: `${randomUsername}@ds.iitm.ac.in`,
      expected: false,
      description: "Missing 'study.' subdomain",
    },
    {
      email: `${randomUsername}@ds.study.iitm.ac`,
      expected: false,
      description: "Missing '.in' TLD",
    },
  ];

  const answer = async (url) => {
    url = url.trim();
    if (!url) throw new Error("Please provide the URL of your /validate-email endpoint");

    const baseUrl = url.replace(/\/$/, "");

    for (const testCase of testCases) {
      const endpoint = `${baseUrl}/validate-email?email=${encodeURIComponent(testCase.email)}`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Endpoint returned ${response.status} for email: ${testCase.email}`);
      }

      const result = await response.json();

      // Check if is_iitm field exists and has correct value
      if (typeof result.is_iitm !== "boolean") {
        throw new Error(`Response must contain 'is_iitm' as a boolean for email: ${testCase.email}`);
      }

      if (result.is_iitm !== testCase.expected) {
        throw new Error(
          `Failed for ${testCase.description}: "${testCase.email}" - ` +
            `Expected is_iitm=${testCase.expected}, got ${result.is_iitm}`
        );
      }
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>IITM Data Science Email Validator</h2>
      <p>
        <strong>IIT Madras Online Degree Program</strong> needs an API endpoint to validate if an email belongs to the
        official Data Science program domain. Only emails ending with <code>@ds.study.iitm.ac.in</code> should be
        considered valid IITM DS emails.
      </p>

      <h3>Requirements</h3>
      <ol>
        <li>
          Create a <strong>GET</strong> endpoint at <code>/validate-email</code>
        </li>
        <li>
          Accept a query parameter: <code>email</code>
        </li>
        <li>
          Return JSON: <code>{"is_iitm": true}</code> ONLY if the email ends with exactly
          <code>@ds.study.iitm.ac.in</code>
        </li>
        <li>Return <code>{"is_iitm": false}</code> for all other emails</li>
      </ol>

      <h3>Test Cases</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Email</th>
            <th>Expected Result</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          ${testCases.map(
            (tc) => html`
              <tr>
                <td><code>${tc.email}</code></td>
                <td><code>${tc.expected}</code></td>
                <td>${tc.description}</td>
              </tr>
            `
          )}
        </tbody>
      </table>

      <h3>Hint</h3>
      <p>Use a regex pattern like <code>/^[^@]+@ds\\.study\\.iitm\\.ac\\.in$/</code> to validate the email format.</p>

      <label for="${id}" class="form-label">Enter your API base URL (e.g., https://your-server.com):</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="https://your-api-url.com" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
