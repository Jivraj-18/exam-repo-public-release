import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 0.5 }) {
  const id = "q-api-pagination-backoff";
  const title = "Data Sourcing: Pagination & Rate Limits";
  const random = seedrandom(`${user.email}#${id}`);

  // Generate 5 pages of transactions
  const totalAmount = Math.floor(random() * 50000) + 10000;
  const pages = [];
  let currentSum = 0;

  for (let i = 0; i < 4; i++) {
    const pageSum = Math.floor(totalAmount / 5);
    currentSum += pageSum;
    pages.push({
      data: Array(5).fill(0).map(() => ({ amount: pageSum / 5, id: Math.random().toString(36).substring(7) })),
      next_cursor: `page_${i + 1}`
    });
  }
  // Last page
  pages.push({
    data: Array(5).fill(0).map(() => ({ amount: (totalAmount - currentSum) / 5, id: Math.random().toString(36).substring(7) })),
    next_cursor: null
  });

  // Global scope mock function for the user to call in console
  window.mockFinancialApi = async (cursor = null) => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 100));

    // Simulate Rate Limit (429) randomly
    if (Math.random() > 0.7) {
      throw new Error("429 Too Many Requests");
    }

    if (!cursor) return pages[0];
    const pageIndex = parseInt(cursor.split('_')[1]);
    if (pageIndex < pages.length) return pages[pageIndex];
    return { data: [], next_cursor: null };
  };

  const answer = async (response) => {
    const val = parseInt(response.replace(/[^0-9]/g, ""));
    if (val !== totalAmount) throw new Error("Incorrect total amount. Did you handle all pages and retries?");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Case Study: FinTech Aggregator Data Sync</h2>
      <p>
        Your team is building a connector for a legacy banking API. The API is cursor-paginated and notoriously unstable, frequently returning <code>429 Too Many Requests</code> errors.
      </p>
      <p>
        I have exposed a function <code>window.mockFinancialApi(cursor)</code> in your browser console right now.
      </p>
      <h3>API Specification</h3>
      <ul>
        <li><strong>Input:</strong> <code>cursor</code> (string, optional). Pass <code>null</code> or omit for the first page.</li>
        <li><strong>Output:</strong> A Promise resolving to <code>{ data: [{ amount: 100, ... }], next_cursor: "..." }</code>.</li>
        <li><strong>Error:</strong> The promise rejects with "429 Too Many Requests" randomly.</li>
      </ul>
      <h3>Your Task</h3>
      <ol>
        <li>Open your Browser Developer Tools (F12) -> Console.</li>
        <li>Write a JavaScript script to fetch <strong>all pages</strong> of data.</li>
        <li>Implement <strong>exponential backoff</strong> or simple retries to handle the 429 errors.</li>
        <li>Sum the <code>amount</code> field of every transaction across all pages.</li>
      </ol>

      <label for="${id}" class="form-label">Total Sum of Amounts</label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}



/* Solution

(async () => {
  let cursor = null;
  let totalSum = 0;
  let hasMore = true;

  console.log("Starting data fetch...");

  while (hasMore) {
    try {
      // Call the mock API exposed by the question
      const response = await window.mockFinancialApi(cursor);

      // Sum up the amounts on this page
      if (response.data) {
        response.data.forEach(txn => {
          totalSum += txn.amount;
        });
        console.log(`Fetched page. Current total: ${Math.round(totalSum)}`);
      }

      // Check if there is a next page
      if (response.next_cursor) {
        cursor = response.next_cursor;
      } else {
        hasMore = false;
      }

    } catch (error) {
      // Handle Rate Limiting (429)
      if (error.message.includes("429")) {
        console.warn("Rate limited (429). Retrying in 1 second...");
        await new Promise(r => setTimeout(r, 1000)); // Wait 1s before retrying
        // Do NOT update cursor; the loop will retry the current cursor
      } else {
        console.error("Unexpected error:", error);
        break;
      }
    }
  }

  console.log("%c FINAL ANSWER: " + Math.round(totalSum), "background: #222; color: #bada55; font-size: 20px");
})();
*/