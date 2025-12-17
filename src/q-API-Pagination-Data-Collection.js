// Question 3: API pagination handling
export async function question3({ user, weight = 1 }) {
  const id = "q-api-pagination";
  const title = "API Pagination Data Collection (1 mark)";

  const answer = "2024-11-15T08:32:45Z";

  const question = html`
    <div class="mb-3">
      <h4>GitHub Repository Analysis</h4>
      <p>
        <strong>Scenario:</strong> DevMetrics Inc. analyzes open-source contribution patterns. 
        They need you to find the most recently created repository for a specific topic.
      </p>
      <p>
        <strong>Your Task:</strong><br/>
        Using GitHub's Search API:<br/>
        1. Search for repositories with topic <code>machine-learning</code><br/>
        2. Filter repositories with more than 500 stars<br/>
        3. Sort by creation date (newest first)<br/>
        4. Extract the <code>created_at</code> timestamp of the first result
      </p>
      <p>
        <strong>API Details:</strong><br/>
        Endpoint: <code>https://api.github.com/search/repositories</code><br/>
        Parameters: <code>q=topic:machine-learning+stars:>500&sort=created&order=desc</code>
      </p>
      <label for="${id}" class="form-label">Created timestamp (ISO 8601 format):</label>
      <input type="text" class="form-control" id="${id}" name="${id}" 
             placeholder="2024-01-01T00:00:00Z" />
    </div>
  `;

  return { id, title, weight, question, answer };
}