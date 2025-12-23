import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-join-arrays";
    const title = "Data Analysis: Retail Logistics Merge";

    const random = seedrandom(`${user.email}#${id}`);

    // Data Generation
    const names = ["Warehouse_A", "Warehouse_B", "Distribution_Center", "Outlet_North", "Outlet_South"];
    const facilities = names.map((n, i) => ({ id: i + 101, name: n }));

    const shipments = [];
    for (let i = 0; i < 15; i++) {
        shipments.push({
            facilityId: Math.floor(random() * (facilities.length + 3)) + 101, // Some IDs mismatch
            pallets: Math.floor(random() * 50) + 5
        });
    }

    // Solution
    const facMap = {};
    facilities.forEach(f => facMap[f.id] = f.name);

    const results = {};
    shipments.forEach(s => {
        if (facMap[s.facilityId]) { // Inner Join
            const name = facMap[s.facilityId];
            results[name] = (results[name] || 0) + s.pallets;
        }
    });

    const expectedList = Object.entries(results).map(([name, total]) => ({ name, total }));
    expectedList.sort((a, b) => b.total - a.total);

    const answer = (input) => {
        let userList;
        try {
            userList = JSON.parse(input);
        } catch {
            throw new Error("Input must be valid JSON.");
        }

        // Sort user input by total desc for robust comparison
        userList.sort((a, b) => b.total - a.total);

        if (JSON.stringify(userList) !== JSON.stringify(expectedList)) {
            throw new Error("Aggregation mismatch. Ensure you are performing an Inner Join and summing pallets correctly.");
        }
        return true;
    };

    const question = html`
    <div class="mb-3">
      <h2>Retail Logistics: Merging Shipments</h2>
      <h3>Context</h3>
      <p>
        <strong>LogiMove Inc.</strong> operates a network of warehouses and distribution centers. 
        The operations team has two disparate datasets: a reference list of <strong>Facilities</strong> 
        and a transactional log of <strong>Incoming Shipments</strong>. 
      </p>
      <p>
        To visualize inventory flow, they need a report showing the <strong>total number of pallets</strong> 
        received by each labeled facility. Shipments to unknown facility IDs (data errors) must be ignored.
      </p>
      <h3>Dataset</h3>
      <p><strong>Facilities Table:</strong></p>
      <pre style="background: #f8f9fa; padding: 10px;"><code>${JSON.stringify(facilities)}</code></pre>
      
      <p><strong>Shipments Log:</strong></p>
      <pre style="background: #f8f9fa; padding: 10px;"><code>${JSON.stringify(shipments)}</code></pre>

      <h3>Your Task</h3>
      <p>
        Perform an <strong>Inner Join</strong> logic on <code>id == facilityId</code>, aggregate the total 
        pallets per facility, and return a list sorted by <strong>total pallets descending</strong>.
      </p>
      <p>Expected Format: <code>[ { "name": "Warehouse_A", "total": 120 }, ... ]</code></p>
      
      <label for="${id}" class="form-label">Report JSON</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="4" required></textarea>
    </div>
  `;

    return { id, title, weight, question, answer };
}
