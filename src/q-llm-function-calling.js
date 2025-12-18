import { en, Faker } from "https://cdn.jsdelivr.net/npm/@faker-js/faker@9/+esm";
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-llm-function-calling";
  const title = "LLM Function Calling: Structured Data Extraction";

  const random = seedrandom(`${user.email}#${id}`);
  const faker = new Faker({ locale: [en], seed: Math.round(random() * 1000000) });

  const companyName = faker.company
    .name()
    .replace(/[^a-zA-Z\s]/g, "")
    .trim();

  // Generate event descriptions
  const events = [];
  for (let i = 0; i < 5; i++) {
    const eventDate = faker.date.future({ years: 1 });
    const attendeeCount = Math.floor(random() * 200) + 50;
    const eventTypes = ["conference", "workshop", "seminar", "webinar", "training session"];
    const eventType = eventTypes[Math.floor(random() * eventTypes.length)];
    
    const description = 
      `Join us for a ${eventType} on ${eventDate.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      })} at ${faker.location.city()}, ${faker.location.state()}. ` +
      `We're expecting around ${attendeeCount} participants. ` +
      `The venue is ${faker.company.name()} Conference Center.`;

    events.push({
      description,
      expected: {
        date: eventDate.toISOString().split('T')[0],
        location: `${faker.location.city()}, ${faker.location.state()}`,
        attendees: attendeeCount,
        type: eventType,
      },
    });
  }

  // Generate CSV content for download
  const csvContent = events.map((e, idx) => `${idx + 1},"${e.description}"`).join('\n');
  const csvBlob = new Blob([`id,description\n${csvContent}`], { type: 'text/csv' });
  const csvUrl = URL.createObjectURL(csvBlob);

  const answer = async (response) => {
    try {
      const result = JSON.parse(response);
      
      if (!Array.isArray(result)) {
        throw new Error("Response must be a JSON array");
      }

      if (result.length !== 5) {
        throw new Error(`Expected 5 events, got ${result.length}`);
      }

      // Validate each event
      for (let i = 0; i < events.length; i++) {
        const extracted = result.find(r => r.id === i + 1);
        if (!extracted) {
          throw new Error(`Missing event with id ${i + 1}`);
        }

        const expected = events[i].expected;

        // Validate date (flexible parsing)
        const extractedDate = new Date(extracted.date);
        const expectedDate = new Date(expected.date);
        if (Math.abs(extractedDate - expectedDate) > 86400000) { // 1 day tolerance
          throw new Error(
            `Event ${i + 1}: Date mismatch. Expected around ${expected.date}, got ${extracted.date}`
          );
        }

        // Validate attendees (±10 tolerance)
        if (Math.abs(extracted.attendees - expected.attendees) > 10) {
          throw new Error(
            `Event ${i + 1}: Attendees mismatch. Expected around ${expected.attendees}, got ${extracted.attendees}`
          );
        }

        // Validate type
        if (!extracted.type || !expected.type.toLowerCase().includes(extracted.type.toLowerCase())) {
          throw new Error(
            `Event ${i + 1}: Type mismatch. Expected "${expected.type}", got "${extracted.type}"`
          );
        }

        // Location is validated by presence (city name should appear)
        if (!extracted.location || extracted.location.length < 3) {
          throw new Error(`Event ${i + 1}: Location must be provided`);
        }
      }

      return true;
    } catch (e) {
      if (e instanceof SyntaxError) {
        throw new Error("Invalid JSON format");
      }
      throw e;
    }
  };

  const question = html`
    <h2>${companyName} Event Management System</h2>

    <p>
      <strong>${companyName}</strong> organizes multiple events throughout the year and receives event
      descriptions in natural language format. Your task is to build a system that uses
      <strong>LLM function calling</strong> to extract structured information from these descriptions.
    </p>

    <ol>
      <li>
        <a href="${csvUrl}" download="events.csv">Download the events.csv file</a> containing 5 event
        descriptions
      </li>
      <li>
        Use any LLM API that supports function calling (OpenAI, Anthropic Claude, Google Gemini, local
        Ollama with supported models, etc.)
      </li>
      <li>
        Define a function/tool schema to extract:
        <ul>
          <li><code>id</code>: Event ID (from CSV)</li>
          <li><code>date</code>: Event date in YYYY-MM-DD format</li>
          <li><code>location</code>: City and state</li>
          <li><code>attendees</code>: Expected number of participants (integer)</li>
          <li><code>type</code>: Type of event (conference, workshop, seminar, etc.)</li>
        </ul>
      </li>
      <li>Process all 5 events and extract the structured data using function calling</li>
      <li>
        Return the results as a JSON array with all 5 events, each containing the fields listed above
      </li>
    </ol>

    <p>
      <label>
        Paste your JSON array result (5 events with id, date, location, attendees, type):
        <textarea name="result" rows="15" style="width: 100%; font-family: monospace;"></textarea>
      </label>
    </p>

    <p class="text-muted">
      <small>
        Hint: Function calling allows LLMs to return structured data by defining a schema. The LLM will
        extract information and format it according to your function parameters. Check your LLM
        provider's documentation for function calling examples.
      </small>
    </p>
  `;

  return { id, title, weight, question, answer };
}
