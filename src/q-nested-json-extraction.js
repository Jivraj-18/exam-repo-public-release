import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-nested-json-extraction";
  const title = "JSON: Extract Nested API Data";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate nested JSON structure simulating an API response
  const cities = ["New York", "London", "Tokyo", "Paris", "Sydney"];
  const targetCity = cities[Math.floor(random() * cities.length)];

  const apiResponse = {
    status: "success",
    timestamp: "2024-12-16T10:30:00Z",
    data: {
      regions: [],
    },
  };

  let targetPopulation = 0;

  // Generate region data
  for (let i = 0; i < 5; i++) {
    const region = {
      region_id: i + 1,
      name: cities[i],
      country: ["USA", "UK", "Japan", "France", "Australia"][i],
      metrics: {
        population: Math.floor(random() * 15000000) + 5000000,
        area_km2: Math.floor(random() * 5000) + 500,
        gdp_billions: Math.floor(random() * 500) + 100,
      },
      districts: [],
    };

    // Add districts for each region
    for (let j = 0; j < 3; j++) {
      region.districts.push({
        district_id: `${region.region_id}-${j + 1}`,
        name: `District ${j + 1}`,
        population: Math.floor(random() * 500000) + 100000,
      });
    }

    if (cities[i] === targetCity) {
      targetPopulation = region.metrics.population;
    }

    apiResponse.data.regions.push(region);
  }

  const jsonString = JSON.stringify(apiResponse, null, 2);

  const answer = (input) => {
    const value = parseInt(input.trim().replace(/,/g, ""));
    if (Number.isNaN(value)) {
      throw new Error("Please enter a valid integer population.");
    }
    if (value !== targetPopulation) {
      throw new Error(
        `Incorrect population. Navigate to data.regions, find the region with name="${targetCity}", and extract metrics.population.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>API Data Extraction: Nested JSON Navigation</h2>
      <p>
        You're building a dashboard that consumes city demographics from a REST API. The API returns nested JSON with
        multiple levels. You need to extract specific data points.
      </p>

      <h3>JSON Structure</h3>
      <pre><code>
{
  "status": "success",
  "data": {
    "regions": [
      {
        "name": "City Name",
        "metrics": {
          "population": 1234567,
          ...
        },
        "districts": [...]
      },
      ...
    ]
  }
}
      </code></pre>

      <h3>Task</h3>
      <ol>
        <li>Parse the JSON response below.</li>
        <li>Navigate to the <code>data.regions</code> array.</li>
        <li>Find the region where <code>name</code> is <strong>"${targetCity}"</strong>.</li>
        <li>Extract the <code>metrics.population</code> value.</li>
        <li>Enter the population below (as an integer, no commas).</li>
      </ol>

      <pre
        style="white-space: pre-wrap; max-height: 400px; overflow-y: auto; background: #f5f5f5; padding: 10px;"
      ><code class="language-json">
${jsonString}
      </code></pre>

      <label for="${id}" class="form-label">
        What is the population of ${targetCity}?
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. 8500000" required />
      <p class="text-muted">
        Use Python's <code>json.load()</code> or JavaScript to parse and navigate the nested structure.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Recommended approach (Python):

import json

json_data = '''PASTE_JSON_HERE'''
data = json.loads(json_data)

for region in data['data']['regions']:
    if region['name'] == 'TARGET_CITY':
        print(region['metrics']['population'])
        break

# Or using JavaScript:
# const data = JSON.parse(jsonString);
# const region = data.data.regions.find(r => r.name === 'TARGET_CITY');
# console.log(region.metrics.population);

*/
