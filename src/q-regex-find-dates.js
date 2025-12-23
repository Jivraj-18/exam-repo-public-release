import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-regex-find-dates";
    const title = "Extract Dates with Regex";

    const random = seedrandom(`${user.email}#${id}`);

    // Generate text with hidden dates
    const textParts = [
        "Meeting on 2023-10-15.",
        "Project starts 2024-01-20.",
        "Invalid date 202-01-01.",
        "Another date: 2025-12-31.",
        "No date here."
    ];
    // Shuffle or Pick
    const dates = ["2023-10-15", "2024-01-20", "2025-12-31"];

    const question = html`
    <div class="mb-3">
      <h4>Regex Date Extraction</h4>
      <p>
        Extract all dates in format <code>YYYY-MM-DD</code> from the following text:
      </p>
      <blockquote class="blockquote" style="font-size: 1rem; background: #f0f0f0; padding: 10px;">
        ${textParts.join(" ")}
      </blockquote>
      <p>
        Provide the extracted dates as a JSON list of strings (e.g. <code>["2023-01-01", "2024-02-02"]</code>).
      </p>
      <label for="${id}" class="form-label">Extracted Dates (JSON)</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    const answer = (input) => {
        let userList;
        try {
            userList = JSON.parse(input);
        } catch {
            throw new Error("Invalid JSON");
        }
        if (!Array.isArray(userList)) throw new Error("Must be an array");

        // Check if simple match
        // Allow any order? Usually yes.
        userList.sort();
        dates.sort();

        if (JSON.stringify(userList) !== JSON.stringify(dates)) {
            throw new Error(`Expected ${JSON.stringify(dates)}, got ${JSON.stringify(userList)}`);
        }
        return true;
    };

    return { id, title, weight, question, answer };
}
