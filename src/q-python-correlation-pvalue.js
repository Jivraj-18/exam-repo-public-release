import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.5 }) {
  const id = "q-python-correlation-significance";
  const title = "Correlation: What's Actually Significant?";

  const question = html`
    <div class="mb-3">
      <p>
        You're analyzing card transaction data using the Pandas techniques from
        the "Data Analysis with Python" module. After loading the Parquet file
        and creating a pivot table of <code>amount</code> by <code>day_of_week</code>
        and <code>hour_of_day</code>, you compute correlations between hourly
        amounts across days.
      </p>

      <p>
        Here's your code (run in Colab):
      </p>

      <pre><code class="language-python">import pandas as pd
import scipy.stats

df = pd.read_parquet('card_transactions.parquet')
pivot = df.pivot_table(values='amount', index='hour_of_day', columns='day_of_week', aggfunc='sum')

# Correlation matrix between Monday-Sunday totals
corr_matrix = pivot.corr()

# P-values for each pair
pvals = pd.DataFrame(index=pivot.columns, columns=pivot.columns)
for day1 in pivot.columns:
    for day2 in pivot.columns:
        if day1 != day2:
            r, p = scipy.stats.pearsonr(pivot[day1].dropna(), pivot[day2].dropna())
            pvals.loc[day1, day2] = p</code></pre>

      <p>
        The heatmap shows <code>Friday</code> vs <code>Saturday</code> has
        <strong>r = 0.87</strong> (strong positive correlation) but
        <strong>p = 0.042</strong>.
      </p>

      <p>
        Your manager asks: "Friday and Saturday spending patterns look very
        similar! We should run weekend promotions both days."
      </p>

      <p>
        <strong>Based on statistical significance testing from the course</strong>,
        should you confidently tell the marketing team "Yes, the correlation is
        statistically significant" or "No, be cautious about this correlation"?
      </p>

      <label for="${id}" class="form-label">
        Decision (yes/no):
      </label>
      <input class="form-control" id="${id}" name="${id}" />

      <p class="text-muted">
        <strong>α = 0.05</strong> (standard threshold). Think about what the
        p-value actually tells you vs the correlation coefficient.
      </p>
    </div>
  `;

  const answer = (input) => {
    const normalized = String(input || "")
      .trim()
      .toLowerCase();

    if (!normalized) throw new Error("Answer cannot be empty.");

    // Correct answer: NO - p=0.042 < 0.05 IS significant!
    // But the trick: many jump to "strong r = good!" without checking p < α
    const correct = "yes";

    if (normalized !== correct) {
      throw new Error(
        "p = 0.042 &lt; 0.05 (α), so it passes the significance test. " +
        "Strong correlation AND low p-value = reliable pattern."
      );
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
