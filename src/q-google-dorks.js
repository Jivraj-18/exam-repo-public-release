import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { pick } from "./utils/random.js";

// Task factories for different Google Dork scenarios
const taskFactories = [
  (random) => {
    const years = [2020, 2021, 2022, 2023, 2024, 2025];
    const year = pick(years, random);
    const domains = ["gov.in", "nic.in"];
    const domain = pick(domains, random);
    return {
      id: `budget-${year}-${domain}`,
      description: `Find Excel files containing budget data from ${year} on Indian government websites`,
      requiredOperators: ["site:", "filetype:"],
      requiredDomain: domain,
      requiredFiletypes: ["xls", "xlsx", "csv"],
      requiredKeywords: ["budget", String(year)],
      minLength: 35,
      summary: `Excel budget files from ${year} on ${domain}`,
      hint: `Try: site:${domain} filetype:xlsx budget ${year}`,
    };
  },
  (random) => {
    const states = ["maharashtra", "karnataka", "tamil nadu", "delhi", "gujarat", "bihar", "arunachal pradesh"];
    const state = pick(states, random);
    return {
      id: `census-${state.replace(" ", "-")}`,
      description: `Find PDF census or population data reports for ${state} from Indian government sources`,
      requiredOperators: ["site:", "filetype:"],
      requiredDomain: "gov.in",
      requiredFiletypes: ["pdf"],
      requiredKeywords: ["census", state],
      minLength: 40,
      summary: `PDF census data for ${state}`,
      hint: `Try: site:gov.in filetype:pdf census "${state}"`,
    };
  },
  (random) => {
    const sectors = ["railways", "telecom", "power", "petroleum", "steel", "mining"];
    const sector = pick(sectors, random);
    return {
      id: `psu-${sector}`,
      description: `Find annual reports or financial data from Indian public sector companies in the ${sector} sector`,
      requiredOperators: ["site:", "filetype:", "intitle:"],
      requiredDomain: "gov.in",
      requiredFiletypes: ["pdf", "xlsx"],
      requiredKeywords: [sector, "annual", "report"],
      minLength: 45,
      summary: `${sector} PSU annual reports from India`,
      hint: `Try: site:gov.in intitle:"annual report" filetype:pdf ${sector}`,
    };
  },
  (random) => {
    const ministries = ["finance", "commerce", "health", "education", "agriculture"];
    const ministry = pick(ministries, random);
    return {
      id: `ministry-${ministry}`,
      description: `Find downloadable spreadsheets with statistics from the Indian Ministry of ${ministry.charAt(0).toUpperCase() + ministry.slice(1)}`,
      requiredOperators: ["site:", "filetype:", "inurl:"],
      requiredDomain: "gov.in",
      requiredFiletypes: ["xls", "xlsx", "csv"],
      requiredKeywords: [ministry, "statistics"],
      minLength: 42,
      summary: `spreadsheets from Indian Ministry of ${ministry}`,
      hint: `Try: site:gov.in inurl:${ministry} filetype:xlsx statistics`,
    };
  },
  (random) => {
    const indices = ["consumer price index", "wholesale price index", "gdp growth", "inflation rate"];
    const index = pick(indices, random);
    return {
      id: `economic-india-${index.replace(/ /g, "-")}`,
      description: `Find statistical bulletins or data files containing ${index} data from Indian statistical organizations`,
      requiredOperators: ["site:", "filetype:"],
      requiredDomain: "gov.in",
      requiredFiletypes: ["pdf", "xls", "xlsx"],
      requiredKeywords: index.split(" "),
      minLength: 45,
      summary: `${index} data from Indian sources`,
      hint: `Try: site:mospi.gov.in filetype:xlsx "${index}"`,
    };
  },

  (random) => {
    const companies = ["tesla", "apple", "microsoft", "amazon", "google", "meta", "nvidia"];
    const company = pick(companies, random);
    const years = [2022, 2023, 2024];
    const year = pick(years, random);
    return {
      id: `sec-${company}-${year}`,
      description: `Find the ${year} annual report (10-K filing) for ${company.charAt(0).toUpperCase() + company.slice(1)} from the SEC EDGAR database`,
      requiredOperators: ["site:", "filetype:"],
      requiredDomain: "sec.gov",
      requiredFiletypes: ["pdf", "htm", "html"],
      requiredKeywords: [company, "10-k"],
      minLength: 38,
      summary: `${company.toUpperCase()} 10-K annual report from SEC`,
      hint: `Try: site:sec.gov filetype:pdf ${company} 10-K ${year}`,
    };
  },
  (random) => {
    const countries = ["brazil", "germany", "japan", "australia", "canada", "france", "uk"];
    const country = pick(countries, random);
    return {
      id: `worldbank-${country}`,
      description: `Find World Bank economic indicator datasets or country reports for ${country.charAt(0).toUpperCase() + country.slice(1)}`,
      requiredOperators: ["site:", "filetype:"],
      requiredDomain: "worldbank.org",
      requiredFiletypes: ["pdf", "xlsx", "csv"],
      requiredKeywords: [country, "data"],
      minLength: 40,
      summary: `World Bank data for ${country}`,
      hint: `Try: site:worldbank.org filetype:xlsx ${country} economic data`,
    };
  },
  (random) => {
    const topics = ["climate change", "renewable energy", "carbon emissions", "biodiversity", "deforestation"];
    const topic = pick(topics, random);
    return {
      id: `un-${topic.replace(/ /g, "-")}`,
      description: `Find United Nations reports or datasets about ${topic} from official UN domains`,
      requiredOperators: ["site:", "filetype:"],
      requiredDomain: "un.org",
      requiredFiletypes: ["pdf", "xlsx"],
      requiredKeywords: topic.split(" ").concat(["report"]),
      minLength: 42,
      summary: `UN reports on ${topic}`,
      hint: `Try: site:un.org filetype:pdf "${topic}" report`,
    };
  },
  (random) => {
    const topics = ["monetary policy", "inflation", "interest rates", "financial stability", "banking"];
    const topic = pick(topics, random);
    const regions = ["europe", "asia", "global"];
    const region = pick(regions, random);
    return {
      id: `imf-${topic.replace(/ /g, "-")}`,
      description: `Find IMF working papers or data files about ${topic} with focus on ${region}`,
      requiredOperators: ["site:", "filetype:"],
      requiredDomain: "imf.org",
      requiredFiletypes: ["pdf", "xlsx"],
      requiredKeywords: [topic.split(" ")[0], region],
      minLength: 40,
      summary: `IMF ${topic} data for ${region}`,
      hint: `Try: site:imf.org filetype:pdf ${topic} ${region}`,
    };
  },
  (random) => {
    const euroCountries = ["germany", "france", "italy", "spain", "netherlands", "poland"];
    const country = pick(euroCountries, random);
    const topics = ["employment", "trade", "population", "energy", "agriculture"];
    const topic = pick(topics, random);
    return {
      id: `eurostat-${country}-${topic}`,
      description: `Find Eurostat statistical datasets about ${topic} for ${country.charAt(0).toUpperCase() + country.slice(1)}`,
      requiredOperators: ["site:", "filetype:"],
      requiredDomain: "europa.eu",
      requiredFiletypes: ["xlsx", "csv", "pdf"],
      requiredKeywords: [country, topic, "statistics"],
      minLength: 45,
      summary: `Eurostat ${topic} statistics for ${country}`,
      hint: `Try: site:ec.europa.eu filetype:xlsx ${country} ${topic} statistics`,
    };
  },
];

// Validation helpers
const containsOperator = (query, operator) => {
  return query.toLowerCase().includes(operator.toLowerCase());
};

const containsFiletype = (query, filetypes) => {
  const lower = query.toLowerCase();
  return filetypes.some(ft => 
    lower.includes(`filetype:${ft}`) || 
    lower.includes(`ext:${ft}`)
  );
};

const containsKeyword = (query, keywords) => {
  const lower = query.toLowerCase();
  return keywords.every(kw => lower.includes(kw.toLowerCase()));
};

const containsDomain = (query, domain) => {
  const lower = query.toLowerCase();
  // Match site:domain, site:.domain, site:*.domain, or site:subdomain.domain
  const patterns = [
    `site:${domain}`,
    `site:.${domain}`,
    `site:*.${domain}`,
  ];
  return patterns.some(p => lower.includes(p)) || 
         new RegExp(`site:[a-z0-9.-]*\\.?${domain.replace(".", "\\.")}`, "i").test(query);
};

export default async function ({ user, weight = 1 }) {
  const id = "q-google-dorks";
  const title = "Data Sourcing with Google Dorks";
  const random = seedrandom(`${user.email}#${id}`);
  
  const taskFactory = pick(taskFactories, random);
  const task = taskFactory(random);

const question = html`
  <div class="mb-3">
    <h2>Data Sourcing with Google Dorks for OpenData Insights</h2>

    <p>
      <strong>OpenData Insights</strong> is a research organization that specializes in discovering, aggregating,
      and analyzing publicly available datasets from government portals, academic institutions, and official repositories.
      These datasets are critical for economic analysis, policy evaluation, and data-driven journalism.
    </p>

    <p>
      A major challenge faced by OpenData Insights is that valuable datasets are often buried deep within websites and
      are not easily discoverable through standard search queries. Many important files—such as budgets, reports,
      and statistics—exist as downloadable documents (PDFs, Excel files, CSVs) and require more precise search techniques.
    </p>

    <p>
      To solve this problem, the team relies on <strong>Google Dorks</strong> (advanced search operators) to systematically
      uncover relevant datasets from Indian government and institutional domains.
    </p>

    <p><strong>Common Google Dork Operators:</strong></p>
    <ul>
      <li><code>site:</code> – Restrict results to a specific domain (e.g., <code>site:gov.in</code>)</li>
      <li><code>filetype:</code> or <code>ext:</code> – Locate specific file types (e.g., <code>filetype:xlsx</code>)</li>
      <li><code>intitle:</code> – Search for keywords in page titles</li>
      <li><code>inurl:</code> – Search for keywords in URLs</li>
      <li><code>intext:</code> – Search for keywords in page content</li>
      <li><code>"quoted phrase"</code> – Exact phrase matching</li>
    </ul>

    <p>
      OpenData Insights has asked you to construct a Google Dork query that will reliably surface
      high-value datasets relevant to their research needs.
    </p>

    <h2>Your Task</h2>
    <p>
      Construct a <strong>single Google Dork query</strong> that fulfills the following requirements:
    </p>

    <ol>
      <li>
        <strong>Domain Targeting:</strong> Limit results to relevant Indian domains (such as
        <code>gov.in</code>, <code>nic.in</code>, or <code>ac.in</code>).
      </li>
      <li>
        <strong>File Discovery:</strong> Target specific downloadable dataset formats
        (e.g., Excel, PDF, or CSV).
      </li>
      <li>
        <strong>Keyword Precision:</strong> Use title, URL, or content operators to narrow results
        to datasets related to <strong>${task.summary}</strong>.
      </li>
    </ol>

    <p class="text-info">
      <em>
        Your query must be at least ${task.minLength} characters long and use multiple Google Dork operators
        to ensure precision.
      </em>
    </p>

    <label for="${id}" class="form-label">
      What Google Dork query would you use to find relevant datasets for
      <strong>${task.summary}</strong>?
    </label>

    <input
      class="form-control font-monospace"
      id="${id}"
      name="${id}"
      placeholder="e.g., site:gov.in filetype:xlsx intitle:budget 2024"
      style="font-size: 0.9rem;"
      required
    />

    <p class="text-muted mt-2">
      <small>
        Your answer will be validated to ensure it uses appropriate operators, targets Indian domains,
        specifies relevant file types, and includes necessary keywords.
      </small>
    </p>
  </div>
`;


  const answer = async (input) => {
    if (!input || typeof input !== "string") {
      throw new Error("Answer is required. Please enter a Google Dork query.");
    }

    const trimmed = input.trim();

    // Check minimum length
    if (trimmed.length < task.minLength) {
      throw new Error(
        `Query is too short (${trimmed.length} chars). Please make it more specific with at least ${task.minLength} characters. ` +
        `Hint: Use multiple operators and keywords.`
      );
    }

    // Check for required operators
    for (const operator of task.requiredOperators) {
      if (!containsOperator(trimmed, operator)) {
        throw new Error(
          `Query must use the '${operator}' operator. ` +
          `For example: ${operator}example`
        );
      }
    }

    // Check for Indian domain targeting
    if (!containsDomain(trimmed, task.requiredDomain)) {
      throw new Error(
        `Query must target Indian websites using 'site:${task.requiredDomain}' or similar. ` +
        `This ensures you're searching within Indian government/institutional domains.`
      );
    }

    // Check for required file types
    if (!containsFiletype(trimmed, task.requiredFiletypes)) {
      throw new Error(
        `Query must specify a relevant file type using 'filetype:' operator. ` +
        `Expected one of: ${task.requiredFiletypes.join(", ")}. ` +
        `For example: filetype:${task.requiredFiletypes[0]}`
      );
    }

    // Check for required keywords
    if (!containsKeyword(trimmed, task.requiredKeywords)) {
      throw new Error(
        `Query must include relevant keywords: ${task.requiredKeywords.join(", ")}. ` +
        `These help narrow down the search to the specific data requested.`
      );
    }

    // Additional validation: check the query doesn't have obvious issues
    const lower = trimmed.toLowerCase();
    
    // Check for at least 2 different operators (to ensure complexity)
    const operatorCount = ["site:", "filetype:", "ext:", "intitle:", "inurl:", "intext:"]
      .filter(op => lower.includes(op)).length;
    
    if (operatorCount < 2) {
      throw new Error(
        `Query should use at least 2 different search operators for more precise results. ` +
        `Currently using only ${operatorCount}. Try adding intitle:, inurl:, or quoted phrases.`
      );
    }

    return true;
  };

  return { id, title, weight, question, answer };
}

/*
Solution Guide:

This question tests understanding of Google Dorks for data sourcing.
Each student gets a seeded task requiring them to construct a specific query.

Example solutions for different task types:

1. Budget data (gov.in/nic.in):
   site:gov.in filetype:xlsx intitle:budget 2025 expenditure
   site:finance.gov.in filetype:xls budget estimates 2023-24

2. Census data (state-specific):
   site:gov.in filetype:pdf census "tamil nadu" population 2021
   site:censusindia.gov.in filetype:pdf "maharashtra" demographic data

3. PSU annual reports:
   site:gov.in intitle:"annual report" filetype:pdf railways 2023
   site:coal.gov.in filetype:pdf annual report mining financial

4. Ministry data:
   site:gov.in inurl:commerce filetype:xlsx statistics export 2024
   site:agriculture.gov.in filetype:xls statistics crop production

5. Economic indices:
   site:mospi.gov.in filetype:xlsx "consumer price index" monthly
   site:gov.in filetype:pdf wholesale price index bulletin 2024

6. SEC company filings (US):
   site:sec.gov filetype:pdf tesla 10-K annual report 2023
   site:sec.gov filetype:htm apple 10-K filing 2024

7. World Bank country data:
   site:worldbank.org filetype:xlsx brazil economic data indicators
   site:worldbank.org filetype:csv germany development data

8. UN reports:
   site:un.org filetype:pdf "climate change" report 2024 global
   site:un.org filetype:xlsx renewable energy statistics report

9. IMF working papers:
   site:imf.org filetype:pdf monetary policy europe analysis
   site:imf.org filetype:xlsx inflation asia data statistics

10. Eurostat statistics:
    site:ec.europa.eu filetype:xlsx germany employment statistics
    site:europa.eu filetype:csv france trade statistics eurostat

Tips for students:
- Always start with site: to limit to relevant domains
- Use filetype: to find downloadable data files
- Add intitle: or inurl: for more precision
- Use quotes for exact phrase matching
- Combine multiple keywords to narrow results
- For international sources, know the key domains:
  * SEC filings: sec.gov
  * World Bank: worldbank.org
  * United Nations: un.org
  * IMF: imf.org
  * EU statistics: europa.eu, ec.europa.eu
*/
