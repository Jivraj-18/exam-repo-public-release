import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-text-extraction";
  const title = "LLM-Style Text Information Extraction";

  const random = seedrandom(`${user.email}#${id}`);

  const people = [
    { name: "Alice", city: "Delhi", role: "Data Scientist" },
    { name: "Bob", city: "Mumbai", role: "ML Engineer" },
    { name: "Carol", city: "Bangalore", role: "AI Researcher" },
  ];

  const person = people[Math.floor(random() * people.length)];

  const text = `
${person.name} works as a ${person.role}.
They are currently based in ${person.city}.
They actively work on machine learning projects.
  `;

  const question = html`
    <div class="mb-3">
      <h4>LLM-Style Text Information Extraction</h4>

      <p>
        You are simulating how an LLM extracts structured information from text.
      </p>

      <p><strong>Input text:</strong></p>

      <pre class="bg-light p-2">${text}</pre>

      <p>
        Extract the following fields from the text:
      </p>

      <ul>
        <li><code>name</code></li>
        <li><code>role</code></li>
        <li><code>city</code></li>
      </ul>

      <p>
        Output JSON in this format:
      </p>

      <pre class="bg-light p-2">
{
  "email": "${user.email}",
  "name": STRING,
  "role": STRING,
  "city": STRING
}
      </pre>

      <label for="${id}" class="form-label">
        Paste your output JSON here
      </label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="6"
      ></textarea>
    </div>
  `;

  const answer = async (output) => {
    let data;
    try {
      data = JSON.parse(output);
    } catch {
      throw new Error("Invalid JSON");
    }

    if (data.email !== user.email)
      throw new Error("Email does not match");

    if (data.name !== person.name)
      throw new Error("Incorrect name");

    if (data.role !== person.role)
      throw new Error("Incorrect role");

    if (data.city !== person.city)
      throw new Error("Incorrect city");

    return true;
  };

  return { id, title, weight, question, answer };
}
