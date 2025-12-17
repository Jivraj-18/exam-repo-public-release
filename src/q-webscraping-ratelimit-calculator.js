import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-webscraping-ratelimit-calculator";
  const title = "Web Scraping Rate Limit Calculator";

  const random = seedrandom(`${user.email}#${id}`);
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;
  const randFloat = (min, max) => random() * (max - min) + min;

  // Randomized parameters
  const crawlDelaySeconds = randFloat(1.0, 5.0).toFixed(1); // robots.txt Crawl-delay: 1.0-5.0 seconds
  const totalPages = randInt(500, 2000); // Number of pages to scrape
  const requestTimeoutSeconds = randFloat(2.0, 6.0).toFixed(1); // Average response time per request
  const retryAttempts = randInt(1, 3); // Number of retries for failed requests
  const failureRate = randFloat(0.05, 0.15).toFixed(2); // 5-15% of requests fail initially

  // Calculate total time
  const delayPerPage = parseFloat(crawlDelaySeconds);
  const requestTime = parseFloat(requestTimeoutSeconds);
  const failRate = parseFloat(failureRate);

  // Successful requests: (1 - failureRate) * totalPages
  const successfulFirstAttempt = Math.floor(totalPages * (1 - failRate));
  const failedRequests = totalPages - successfulFirstAttempt;

  // Time calculation:
  // - Each successful request: requestTime + delayPerPage
  // - Each failed request needs retry: (requestTime + delayPerPage) * (1 + retryAttempts)
  const timeForSuccessful = successfulFirstAttempt * (requestTime + delayPerPage);
  const timeForFailed = failedRequests * (requestTime + delayPerPage) * (1 + retryAttempts);
  const totalTimeSeconds = timeForSuccessful + timeForFailed;

  // Convert to minutes and round to nearest integer
  const expectedMinutes = Math.round(totalTimeSeconds / 60);

  const answer = (input) => {
    const value = parseInt(String(input).trim(), 10);
    if (isNaN(value)) throw new Error("Answer must be a valid integer");
    // Allow small rounding differences (within 2 minutes)
    if (Math.abs(value - expectedMinutes) > 2) {
      throw new Error(`Expected approximately ${expectedMinutes} minutes, got ${value} minutes`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h4>Case Study: Ethical Web Scraping for MarketIntel Analytics</h4>
      <p>
        <strong>MarketIntel Analytics</strong> scrapes competitor pricing data while respecting website rate limits
        specified in <code>robots.txt</code>. The engineering team needs to estimate scraping job duration to schedule
        data pipeline updates.
      </p>

      <h5>Target Website robots.txt</h5>
      <pre><code>User-agent: *
Crawl-delay: ${crawlDelaySeconds}
Disallow: /admin/
Disallow: /private/</code></pre>

      <h5>Scraping Job Parameters</h5>
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Pages to Scrape</td>
            <td>${totalPages.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Crawl Delay (from robots.txt)</td>
            <td>${crawlDelaySeconds} seconds</td>
          </tr>
          <tr>
            <td>Average Request Response Time</td>
            <td>${requestTimeoutSeconds} seconds</td>
          </tr>
          <tr>
            <td>Initial Failure Rate</td>
            <td>${(failureRate * 100).toFixed(0)}%</td>
          </tr>
          <tr>
            <td>Retry Attempts for Failed Requests</td>
            <td>${retryAttempts}</td>
          </tr>
        </tbody>
      </table>

      <h5>Time Calculation Logic</h5>
      <p>For each page request:</p>
      <ol>
        <li><strong>Successful Request:</strong> Request Time + Crawl Delay</li>
        <li>
          <strong>Failed Request:</strong> (Request Time + Crawl Delay) × (1 + Retry Attempts)
          <br />
          <em>Example: If retry = 2, total = original attempt + 2 retries = 3× the time</em>
        </li>
      </ol>
      <p>Expected successful requests: ${totalPages} × (1 - ${failureRate}) = ${successfulFirstAttempt}</p>
      <p>Expected failed requests: ${totalPages} - ${successfulFirstAttempt} = ${failedRequests}</p>

      <p>
        <strong>Question:</strong> How many minutes will this scraping job take to complete?
      </p>
      <p class="text-muted">
        <strong>Hint:</strong> Calculate time for successful requests and failed requests (with retries) separately,
        sum them, then convert to minutes. Round to nearest integer.
      </p>

      <label for="${id}" class="form-label">Total scraping time (in minutes):</label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}

/*
Python solution sketch: calculate_scraping_time.py

# /// script
# requires-python = ">=3.12"
# ///

def calculate_scraping_duration(
    total_pages: int,
    crawl_delay_seconds: float,
    request_timeout_seconds: float,
    failure_rate: float,
    retry_attempts: int
) -> int:
    """
    Calculate total web scraping job duration respecting rate limits.
    
    Args:
        total_pages: Number of pages to scrape
        crawl_delay_seconds: Delay between requests (from robots.txt)
        request_timeout_seconds: Average time for each HTTP request
        failure_rate: Percentage of requests that fail (0.0 to 1.0)
        retry_attempts: Number of retries for failed requests
    
    Returns:
        Total duration in minutes (rounded)
    """
    # Calculate successful vs failed requests
    successful_requests = int(total_pages * (1 - failure_rate))
    failed_requests = total_pages - successful_requests
    
    # Time per request
    time_per_request = request_timeout_seconds + crawl_delay_seconds
    
    # Successful requests: one attempt each
    time_successful = successful_requests * time_per_request
    
    # Failed requests: original attempt + retries
    time_failed = failed_requests * time_per_request * (1 + retry_attempts)
    
    # Total time in seconds
    total_seconds = time_successful + time_failed
    
    # Convert to minutes and round
    total_minutes = round(total_seconds / 60)
    
    return total_minutes


if __name__ == "__main__":
    # Example calculation
    duration = calculate_scraping_duration(
        total_pages=1000,
        crawl_delay_seconds=2.5,
        request_timeout_seconds=3.0,
        failure_rate=0.10,
        retry_attempts=2
    )
    
    print(f"Estimated scraping duration: {duration} minutes")
*/