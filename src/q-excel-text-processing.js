import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-excel-text-processing";
    const title = "Excel: Count Unique Domains";

    const random = seedrandom(`${user.email}#${id}`);

    const domains = ["gmail.com", "yahoo.com", "outlook.com", "example.org", "edu.in"];
    const usersList = ["john", "jane", "bob", "alice", "charlie"];

    const rawEmails = Array.from({ length: 30 }, () => {
        const d = domains[Math.floor(random() * domains.length)];
        const u = usersList[Math.floor(random() * usersList.length)];
        const casing = random() > 0.5 ? d.toUpperCase() : d;
        const padding = random() > 0.5 ? " " : "";
        return `${padding}${u}@${casing}${padding}`;
    });

    const uniqueDomains = new Set(
        rawEmails.map(e => e.trim().toLowerCase().split("@")[1])
    );
    const answer = uniqueDomains.size;

    const question = html`
    <div class="mb-3">
      <p>
        You have a list of messy email addresses in Excel (Column A).
        Your task is to:
        <ol>
            <li>Trim leading/trailing spaces.</li>
            <li>Convert to lowercase.</li>
            <li>Extract the domain (part after @).</li>
            <li>Count how many <strong>unique</strong> domains are present.</li>
        </ol>
      </p>
      
      <pre style="max-height: 200px; overflow-y: auto; background: #fff; border: 1px solid #ccc; padding: 10px;">${rawEmails.join("\n")}</pre>

      <label for="${id}" class="form-label">Number of unique domains:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
