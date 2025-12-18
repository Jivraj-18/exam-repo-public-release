import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "https://cdn.jsdelivr.net/npm/seedrandom@3/+esm";

export default async function ({ user, weight = 1 }) {
  const id = "q-portfolio-risk";
  const title = "Stock Portfolio Risk Analysis API";
  const rng = seedrandom(`${user.email}#${id}`);
  
  // Generate stock price data
  const stocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'];
  const tradingDays = 252; // 1 year of trading days
  const startDate = new Date(2023, 0, 1);
  
  const prices = [];
  const initialPrices = {
    'AAPL': 180,
    'GOOGL': 140,
    'MSFT': 370,
    'AMZN': 170,
    'TSLA': 240
  };
  
  // Generate price series with realistic returns
  stocks.forEach(stock => {
    let price = initialPrices[stock];
    for (let day = 0; day < tradingDays; day++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + day);
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      // Random daily return (mean ~0.05%, std ~1.5%)
      const dailyReturn = (rng() - 0.5) * 0.03 + 0.0005;
      price = price * (1 + dailyReturn);
      
      prices.push({
        date: date.toISOString().split('T')[0],
        stock: stock,
        close: parseFloat(price.toFixed(2))
      });
    }
  });
  
  const csvData = "date,stock,close\n" + 
    prices.map(p => `${p.date},${p.stock},${p.close}`).join('\n');
  
  const downloadCSV = () => {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prices.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const question = html`
    <div class="mb-3">
      <h4>💼 Stock Portfolio Risk Analysis API</h4>
      
      <div class="alert alert-info">
        <strong>Scenario:</strong> You have 1 year of daily prices for ${stocks.length} stocks (${stocks.join(', ')}).
        Calculate portfolio risk metrics to help investors understand volatility and returns.
      </div>

      <button 
        class="btn btn-sm btn-primary mb-3" 
        @click=${downloadCSV}
      >
        📥 Download prices.csv
      </button>

      <h5>Dataset Structure</h5>
      <pre><code>date,stock,close
2023-01-01,AAPL,180.50
2023-01-01,GOOGL,140.30
2023-01-01,MSFT,370.20
2023-01-02,AAPL,182.15
...</code></pre>
      <p><strong>Columns:</strong></p>
      <ul>
        <li><code>date</code> - Trading date (YYYY-MM-DD)</li>
        <li><code>stock</code> - Stock ticker symbol</li>
        <li><code>close</code> - Closing price (USD)</li>
      </ul>

      <h5>Your Tasks</h5>
      
      <div class="card mb-3">
        <div class="card-body">
          <h6>1. Understand Portfolio Metrics</h6>
          
          <p><strong>Daily Returns:</strong></p>
          <pre><code>daily_return = (price_today - price_yesterday) / price_yesterday</code></pre>
          
          <p><strong>Expected Return (Annualized):</strong></p>
          <pre><code>annual_return = mean(daily_returns) × 252</code></pre>
          
          <p><strong>Volatility (Risk, Annualized):</strong></p>
          <pre><code>annual_volatility = std_dev(daily_returns) × √252</code></pre>
          
          <p><strong>Sharpe Ratio:</strong></p>
          <pre><code>sharpe_ratio = (annual_return - risk_free_rate) / annual_volatility
risk_free_rate = 0.02 (2% assumption)</code></pre>
          
          <p><strong>Portfolio Return:</strong></p>
          <pre><code>portfolio_return = Σ (weight[i] × return[i])</code></pre>
          
          <p><strong>Portfolio Volatility:</strong></p>
          <pre><code>For each day:
  portfolio_daily_return = Σ (weight[i] × stock_return[i][day])
  
portfolio_volatility = std_dev(portfolio_daily_returns) × √252</code></pre>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-body">
          <h6>2. Calculate Individual Stock Metrics</h6>
          <p>For each stock, calculate:</p>
          <ul>
            <li>Daily returns series</li>
            <li>Annual return (mean × 252)</li>
            <li>Annual volatility (std × √252)</li>
            <li>Sharpe ratio</li>
            <li>Current price vs. start price</li>
          </ul>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-body">
          <h6>3. Build FastAPI with These Endpoints</h6>
          
          <p><strong>POST /portfolio</strong></p>
          <pre><code>Request: {
  "weights": "equal"  // or {"AAPL": 0.3, "GOOGL": 0.2, ...}
}
Response: {"status": "success", "message": "Portfolio configured"}</code></pre>
          
          <p><strong>GET /</strong> - HTML Dashboard</p>
          <p>Display:</p>
          <ul>
            <li>Portfolio metrics (return, volatility, Sharpe)</li>
            <li>Table of stocks with their metrics</li>
            <li>Weight allocation</li>
            <li>Risk/return visualization (if possible)</li>
            <li>Your email: ${user.email}</li>
          </ul>
          
          <p><strong>GET /metrics</strong> - JSON portfolio risk metrics</p>
          <pre><code>{
  "portfolio": {
    "annual_return": 0.0875,
    "volatility": 0.1842,
    "sharpe_ratio": 0.368,
    "var_95": -0.0234,
    "max_drawdown": -0.0567
  },
  "weights": {
    "AAPL": 0.2,
    "GOOGL": 0.2,
    "MSFT": 0.2,
    "AMZN": 0.2,
    "TSLA": 0.2
  },
  "num_stocks": 5,
  "trading_days": 252
}</code></pre>
          
          <p><strong>GET /stocks</strong> - All stock metrics ranked</p>
          <pre><code>{
  "stocks": [
    {
      "symbol": "AAPL",
      "annual_return": 0.095,
      "volatility": 0.21,
      "sharpe_ratio": 0.357,
      "current_price": 189.50,
      "start_price": 180.00,
      "weight": 0.2
    },
    ...
  ]
}</code></pre>
          
          <p><strong>GET /stock/{symbol}</strong> - Individual stock details</p>
          <pre><code>{
  "symbol": "AAPL",
  "current_price": 189.50,
  "start_price": 180.00,
  "price_change_pct": 0.0528,
  "annual_return": 0.095,
  "volatility": 0.21,
  "sharpe_ratio": 0.357,
  "max_drawdown": -0.125,
  "trading_days": 252
}</code></pre>
        </div>
      </div>

      <h5>Implementation Guide</h5>
      
      <p><strong>Python with Pandas:</strong></p>
      <pre><code>import pandas as pd
import numpy as np

df = pd.read_csv('prices.csv')

# Calculate returns for each stock
returns = {}
for stock in df['stock'].unique():
    stock_data = df[df['stock'] == stock].sort_values('date')
    prices = stock_data['close'].values
    daily_returns = np.diff(prices) / prices[:-1]
    returns[stock] = daily_returns

# Calculate metrics
def calculate_metrics(daily_returns, risk_free=0.02):
    annual_return = np.mean(daily_returns) * 252
    volatility = np.std(daily_returns) * np.sqrt(252)
    sharpe = (annual_return - risk_free) / volatility if volatility > 0 else 0
    
    return {
        "annual_return": round(annual_return, 4),
        "volatility": round(volatility, 4),
        "sharpe_ratio": round(sharpe, 4)
    }

# For equal weights
weights = {stock: 1/len(returns) for stock in returns}

# Portfolio returns
portfolio_returns = np.zeros(len(next(iter(returns.values()))))
for stock, weight in weights.items():
    portfolio_returns += weight * returns[stock]

portfolio_metrics = calculate_metrics(portfolio_returns)</code></pre>

      <p><strong>Value at Risk (VaR) - Optional:</strong></p>
      <pre><code># 95% VaR - maximum loss expected with 95% confidence
sorted_returns = np.sort(portfolio_returns)
var_95 = sorted_returns[int(len(sorted_returns) * 0.05)]</code></pre>

      <p><strong>Max Drawdown - Optional:</strong></p>
      <pre><code># Maximum peak-to-trough decline
cumulative = np.cumprod(1 + portfolio_returns)
running_max = np.maximum.accumulate(cumulative)
drawdown = (cumulative - running_max) / running_max
max_drawdown = np.min(drawdown)</code></pre>

      <p><strong>Tools You Can Use:</strong></p>
      <ul>
        <li><strong>Pandas:</strong> For data manipulation</li>
        <li><strong>NumPy:</strong> For numerical calculations</li>
        <li><strong>Manual:</strong> Lists and basic statistics</li>
      </ul>

      <h5>Expected Results</h5>
      <ul>
        <li><strong>Annual Returns:</strong> 5-15% for individual stocks</li>
        <li><strong>Volatility:</strong> 15-30% (higher for TSLA, lower for MSFT)</li>
        <li><strong>Sharpe Ratio:</strong> 0.2 - 0.6 (higher is better)</li>
        <li><strong>Portfolio:</strong> Lower volatility than individual stocks (diversification)</li>
      </ul>

      <h5>Deployment</h5>
      <p>Deploy to Hugging Face Spaces, Render, or Railway using FastAPI + Docker.</p>

      <h5>Validation</h5>
      <p>We will:</p>
      <ol>
        <li>POST to /portfolio with equal weights</li>
        <li>GET /metrics and verify JSON structure</li>
        <li>Check volatility field exists and is reasonable (0.10-0.40)</li>
        <li>Verify Sharpe ratio is calculated</li>
        <li>Confirm weights sum to 1.0</li>
      </ol>

      <label for="${id}" class="form-label mt-3">
        <strong>Enter your deployed API URL:</strong>
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}"
        placeholder="https://your-username-portfolio-api.hf.space" 
      />
      
      <p class="text-muted mt-2">
        <strong>Expected values:</strong><br>
        Stocks: ${stocks.join(', ')}<br>
        Portfolio volatility: 0.15-0.25 (with equal weights)<br>
        Sharpe ratio: 0.2-0.6
      </p>
    </div>
  `;

  const answer = async (response) => {
    try {
      const base = new URL(response.trim());

      // POST to portfolio
      const portfolioRes = await fetch(new URL("/portfolio", base), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weights: "equal" }),
      });
      
      if (!portfolioRes.ok) {
        console.error("POST /portfolio failed");
        return false;
      }

      // Check HTML
      const htmlRes = await fetch(base);
      if (!htmlRes.ok) {
        console.error("GET / failed");
        return false;
      }

      // Check metrics
      const metricsRes = await fetch(new URL("/metrics", base));
      if (!metricsRes.ok) {
        console.error("GET /metrics failed");
        return false;
      }

      const metrics = await metricsRes.json();
      
      // Validate structure
      const hasRequiredFields = 
        metrics.portfolio !== undefined &&
        metrics.portfolio.volatility !== undefined &&
        metrics.portfolio.annual_return !== undefined &&
        metrics.portfolio.sharpe_ratio !== undefined &&
        metrics.weights !== undefined;
      
      if (!hasRequiredFields) {
        console.error("Missing required fields");
        return false;
      }

      // Validate reasonable values
      const reasonableValues = 
        metrics.portfolio.volatility > 0.05 && metrics.portfolio.volatility < 0.5 &&
        metrics.portfolio.annual_return > -0.5 && metrics.portfolio.annual_return < 0.5 &&
        Math.abs(metrics.portfolio.sharpe_ratio) < 3;

      // Check weights sum to ~1.0
      const weightSum = Object.values(metrics.weights).reduce((sum, w) => sum + w, 0);
      const weightsValid = Math.abs(weightSum - 1.0) < 0.01;

      return hasRequiredFields && reasonableValues && weightsValid;
    } catch (e) {
      console.error("Verification error:", e);
      return false;
    }
  };

  return { id, title, weight, question, answer };
}
