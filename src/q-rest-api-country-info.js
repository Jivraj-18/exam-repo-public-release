import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-rest-api-country-info";
  const title = "REST API: Country Information";

  const random = seedrandom(`${user.email}#${id}`);

  const countries = ["India", "France", "Brazil", "Japan", "Australia", "Canada"];
  const country = countries[Math.floor(random() * countries.length)];

  let expectedCapital;

  const answer = async (value) => {
    value = value.trim().toLowerCase();

    if (!expectedCapital) {
      const response = await fetch(
        `/proxy/https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fullText=true`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch country data. Try again.");
      }
      const data = await response.json();
      expectedCapital = data[0]?.capital?.[0]?.toLowerCase();
    }

    if (!expectedCapital) throw new Error("Capital not found.");

    if (value !== expectedCapital) {
      throw new Error("Incorrect capital. Use the REST Countries API.");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Country Metadata Lookup</h2>
      <p>
        You are building a small CLI utility that fetches country metadata from
        a public REST API.
      </p>

      <p>
        Use the
        <a href="https://restcountries.com/">REST Countries API</a>
        to fetch details for the country:
        <strong>${country}</strong>.
      </p>

      <ol>
        <li>Call the REST API using <code>curl</code> or any HTTP client.</li>
        <li>Parse the JSON response.</li>
        <li>Extract the capital city.</li>
      </ol>

      <label for="${id}" class="form-label">
        What is the capital of ${country}?
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
      <p class="text-muted">
        Enter only the city name (e.g., <code>tokyo</code>).
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
