export async function question3({ user, weight = 1.25 }) {
  const id = "q-sql-activation-lift";
  const title = "SQL Window Function Activation Lift";
  const answer = "0.42";
  const question = html`
    <div class="mb-3">
      <p>
        NovaSuite tracks daily platform activations across four regions. Using
        SQL window functions, compute a <strong>7-day trailing average</strong>
        of activations per region and identify the <strong>maximum positive lift</strong>
        (current day vs. trailing average) for the EMEA region.
      </p>
      <label for="${id}" class="form-label">Maximum Lift (decimal or %):</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. 0.42 or 42%" />
      <small class="form-text text-muted">
        Tip: Use AVG(activations) OVER (PARTITION BY region ORDER BY date ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING)
      </small>
    </div>
  `;
  return { id, title, weight, question, answer };
}