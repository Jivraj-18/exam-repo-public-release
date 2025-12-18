export default function ({ user, weight = 1 }) {
  return {
    id: "q3-scraping-with-auth",
    weight,
    question: html`
      <h2>Question 3: Web Scraping with Authentication (1 mark)</h2>
      
      <h3>Scenario: Financial Data Extraction for InvestTrack</h3>
      
      <p>
        <strong>InvestTrack</strong> is a fintech startup providing portfolio analytics and investment insights to retail investors. 
        The platform aggregates data from multiple financial sources to provide comprehensive market analysis, portfolio tracking, 
        and personalized investment recommendations.
      </p>
      
      <h4>Business Challenge</h4>
      <p>
        InvestTrack partners with FinancialData Corp, which provides access to historical stock data through their web portal. 
        However, this data is only accessible to authenticated users. The data is not available through a public API, so 
        InvestTrack needs to scrape the authenticated web pages.
      </p>
      
      <p>
        The challenge involves:
      </p>
      <ul>
        <li>Authenticating with the financial portal using credentials</li>
        <li>Maintaining session state across multiple requests</li>
        <li>Scraping data from authenticated pages</li>
        <li>Extracting and aggregating financial metrics</li>
      </ul>
      
      <h4>Authentication Flow</h4>
      <p>The FinancialData portal uses form-based authentication:</p>
      <ol>
        <li>POST credentials to <code>/login</code> endpoint</li>
        <li>Server sets session cookie upon successful authentication</li>
        <li>Use session cookie for subsequent requests to protected pages</li>
      </ol>
      
      <h4>Your Task</h4>
      <p>
        You are a backend engineer at InvestTrack. Your task is to:
      </p>
      <ol>
        <li>Login to the financial portal at: <code>https://sanand0.github.io/tdsdata/auth/login</code></li>
        <li>Use credentials:
          <ul>
            <li>Username: <code>demo_user</code></li>
            <li>API Key: <code>demo_key_2025</code></li>
          </ul>
        </li>
        <li>After authentication, access the portfolio page: <code>https://sanand0.github.io/tdsdata/auth/portfolio</code></li>
        <li>The page contains a table with stock holdings and their current values</li>
        <li>Calculate the <strong>total portfolio value</strong> by summing all stock values</li>
        <li>Also find the stock with the <strong>highest value</strong></li>
        <li>Submit: <code>total_value|highest_stock_symbol</code> (e.g., "125000.50|AAPL")</li>
      </ol>
      
      <h4>Implementation Hints</h4>
      <pre><code>import requests
from bs4 import BeautifulSoup

# Create session to maintain cookies
session = requests.Session()

# Login
login_url = "https://sanand0.github.io/tdsdata/auth/login"
login_data = {
    'username': 'demo_user',
    'api_key': 'demo_key_2025'
}
response = session.post(login_url, data=login_data)

# Check if login successful
if response.status_code == 200:
    # Fetch protected page
    portfolio_url = "https://sanand0.github.io/tdsdata/auth/portfolio"
    portfolio_page = session.get(portfolio_url)
    
    # Parse HTML and extract data
    soup = BeautifulSoup(portfolio_page.content, 'html.parser')
    # ... extract table data
</code></pre>
      
      <h4>HTML Structure (Portfolio Page)</h4>
      <pre><code>&lt;table class="portfolio-table"&gt;
  &lt;tr&gt;
    &lt;th&gt;Symbol&lt;/th&gt;
    &lt;th&gt;Shares&lt;/th&gt;
    &lt;th&gt;Price&lt;/th&gt;
    &lt;th&gt;Value&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;AAPL&lt;/td&gt;
    &lt;td&gt;100&lt;/td&gt;
    &lt;td&gt;150.00&lt;/td&gt;
    &lt;td&gt;15000.00&lt;/td&gt;
  &lt;/tr&gt;
  ...
&lt;/table&gt;</code></pre>
      
      <h4>Important Notes</h4>
      <ul>
        <li>The <code>requests.Session()</code> object automatically handles cookies</li>
        <li>Check for authentication errors (status codes, redirect to login, error messages)</li>
        <li>Extract the "Value" column for each stock</li>
        <li>Round total value to 2 decimal places</li>
      </ul>
      
      <h4>Impact</h4>
      <p>
        By implementing authenticated web scraping, InvestTrack can:
      </p>
      <ul>
        <li><strong>Data Integration:</strong> Access partner data not available through APIs</li>
        <li><strong>Portfolio Sync:</strong> Keep user portfolios updated with latest valuations</li>
        <li><strong>Analytics:</strong> Provide comprehensive investment analysis</li>
        <li><strong>Competitive Edge:</strong> Offer data from exclusive sources</li>
      </ul>
      
      <div class="question-input">
        <label for="q3-answer">
          Enter: total_value|highest_stock_symbol (e.g., "125000.50|AAPL")
        </label>
        <input
          type="text"
          id="q3-answer"
          name="q3-answer"
          placeholder="125000.50|AAPL"
          pattern="[0-9]+\.[0-9]{2}\|[A-Z]+"
          required
        />
      </div>
      
      <p style="font-size: 0.9em; color: #666;">
        <strong>Note:</strong> This is a simulated scenario. In practice, always check a website's Terms of Service 
        before scraping, and prefer official APIs when available.
      </p>
    `,
    answer: async (formData) => {
      const userAnswer = formData.get("q3-answer").trim();
      const correctAnswer = "245750.00|TSLA"; // Example answer
      return {
        score: userAnswer === correctAnswer ? 1 : 0,
        feedback:
          userAnswer === correctAnswer
            ? "Correct! You successfully authenticated and scraped the portfolio data."
            : `Incorrect. Make sure you: 1) Successfully authenticated with the correct credentials, 2) Scraped the portfolio table correctly, 3) Calculated total value and identified highest stock correctly. Expected format: total_value|stock_symbol`,
      };
    },
  };
}
