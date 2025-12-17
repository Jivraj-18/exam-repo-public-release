import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

/*
  DESIGN NOTES:
  -------------
  • Large embedded dataset (≈60 points)
  • Tests rolling-window reasoning properly
  • Deterministic auto-grading
  • No external files or URLs
*/

export default async function ({ user }) {
  const id = "q-rolling-volatility";
  const title = "Rolling Volatility in Financial Time Series";

  // Extended daily closing price data (realistic movements)
  const data = [
    ["2024-01-02", 100],
    ["2024-01-03", 102],
    ["2024-01-04", 101],
    ["2024-01-05", 103],
    ["2024-01-08", 104],
    ["2024-01-09", 98],
    ["2024-01-10", 97],
    ["2024-01-11", 99],
    ["2024-01-12", 105],
    ["2024-01-15", 107],
    ["2024-01-16", 106],
    ["2024-01-17", 108],
    ["2024-01-18", 110],
    ["2024-01-19", 109],
    ["2024-01-22", 111],
    ["2024-01-23", 112],
    ["2024-01-24", 110],
    ["2024-01-25", 109],
    ["2024-01-26", 113],
    ["2024-01-29", 115],
    ["2024-01-30", 114],
    ["2024-01-31", 116],
    ["2024-02-01", 118],
    ["2024-02-02", 117],
    ["2024-02-05", 119],
    ["2024-02-06", 121],
    ["2024-02-07", 120],
    ["2024-02-08", 118],
    ["2024-02-09", 122],
    ["2024-02-12", 125],
    ["2024-02-13", 123],
    ["2024-02-14", 124],
    ["2024-02-15", 126],
    ["2024-02-16", 125],
    ["2024-02-19", 128],
    ["2024-02-20", 130],
    ["2024-02-21", 127],
    ["2024-02-22", 129],
    ["2024-02-23", 131],
    ["2024-02-26", 134],
    ["2024-02-27", 133],
    ["2024-02-28", 135],
    ["2024-02-29", 137],
    ["2024-03-01", 136],
    ["2024-03-04", 138],
    ["2024-03-05", 140],
    ["2024-03-06", 139],
    ["2024-03-07", 142],
    ["2024-03-08", 141],
    ["2024-03-11", 145],
    ["2024-03-12", 147],
    ["2024-03-13", 144],
    ["2024-03-14", 148],
    ["2024-03-15", 150],
  ];

  // ---------- GRADER LOGIC ----------
  const computeCorrectDate = () => {
    // Compute log returns
    const returns = [];
    for (let i = 1; i < data.length; i++) {
      returns.push(Math.log(data[i][1] / data[i - 1][1]));
    }

    // 7-day rolling volatility
    let maxVol = -Infinity;
    let maxIndex = -1;

    for (let i = 6; i < returns.length; i++) {
      const window = returns.slice(i - 6, i + 1);
      const mean = window.reduce((s, x) => s + x, 0) / window.length;
      const variance =
        window.reduce((s, x) => s + (x - mean) ** 2, 0) / window.length;
      const stdDev = Math.sqrt(variance);

      if (stdDev > maxVol) {
        maxVol = stdDev;
        maxIndex = i;
      }
    }

    // returns[i] corresponds to data[i + 1]
    return data[maxIndex + 1][0];
  };

  const correctDate = computeCorrectDate();

  const answer = (value) => {
    const submitted = value.trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(submitted)) {
      throw new Error("Answer must be in YYYY-MM-DD format");
    }
    if (submitted !== correctDate) {
      throw new Error(
        `Incorrect date.`,
      );
    }
    return true;
  };

  // ---------- QUESTION UI ----------
  const question = html`
    <div class="mb-3">
      <h2><strong>Monitoring Market Risk</strong></h2>

      <p>
        A quantitative trading desk monitors short-term market risk using
        volatility metrics derived from daily asset prices. With longer
        histories, rolling-window effects become critical in identifying
        genuine volatility spikes.
      </p>

      <p>
        You are given an extended dataset of daily closing prices for a
        financial instrument spanning multiple months.
      </p>

      <h3>Price Data</h3>
      <pre><code class="csv">date,close
${data.map(([d, p]) => `${d},${p}`).join("\n")}
</code></pre>

      <h3>Your Task</h3>
      <ol>
        <li>Compute <strong>daily log returns</strong>.</li>
        <li>
          Calculate a <strong>7-day rolling standard deviation</strong>
          of the log returns.
        </li>
        <li>
          Identify the date on which rolling volatility is
          <strong>maximum</strong>.
        </li>
      </ol>

      <p>
        <strong>Return only the date</strong> in
        <code>YYYY-MM-DD</code> format.
      </p>

      <label for="${id}" class="form-label">Date</label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        placeholder="YYYY-MM-DD"
        required
      />
    </div>
  `;

  return { id, title, question, answer };
}
